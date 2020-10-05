import GoogleMapsApiLoader from 'google-maps-api-loader';
import { useEffect, useState, useRef } from 'react';

const apiKey = process.env.REACT_APP_MAP_KEY;

const eventsMapping = {
  onCenterChanged: ['center_changed', (map) => map.getCenter()],
  onBoundsChanged: ['bounds_changed', (map) => map.getBounds()],
};

export default function useGoogleMap({ zoom, center, events, bounds }) {
  const [mapState, setMapState] = useState({ loading: true });
  const mapRef = useRef();

  useEffect(() => {
    GoogleMapsApiLoader({ apiKey }).then((google) => {
      const map = new google.maps.Map(mapRef.current, { zoom, center });
      events &&
        Object.keys(events).forEach((eventName) =>
          map.addListener(eventsMapping[eventName][0], () =>
            events[eventName](eventsMapping[eventName][1](map))
          )
        );
      bounds.current = new google.maps.LatLngBounds();
      setMapState({ maps: google.maps, map, loading: false });
    });
  }, []);

  return { mapRef, ...mapState };
}
