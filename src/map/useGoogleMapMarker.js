import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

const eventMapping = {
  onClick: 'click',
  onDoubleClick: 'dblclick',
};

export default function useGoogleMapMarker({
  position,
  type,
  bounds,
  maps,
  map,
  events,
  infoWindow = null,
  title,
  uniqueId = null,
}) {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (bounds.current && marker && map) {
      bounds.current.extend(marker.position);
      map.fitBounds(bounds.current);
    }
  }, [bounds, marker, map]);

  useEffect(() => {
    // const styles = markerStyle(type);
    const icon = {
      url: 'http://maps.gstatic.com/mapfiles/markers2/marker.png',
    };
    const marker = new maps.Marker({ position, map, title, icon });

    events &&
      Object.keys(events).forEach((eventName) =>
        marker.addListener(eventMapping[eventName], (e) =>
          events[eventName]({ e, uniqueId: uniqueId })
        )
      );

    if (infoWindow) {
      const info = new maps.InfoWindow({
        content: ReactDOMServer.renderToStaticMarkup(infoWindow.content),
        maxWidth: 240,
      });
      marker.addListener('click', () => infoWindow.onClick(map, marker, info));
    }

    setMarker(marker);

    return () => marker.setMap(null); // to remove markers when unmounts
  }, []);

  return marker;
}
