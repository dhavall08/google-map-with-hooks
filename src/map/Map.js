import React, { useEffect } from 'react';

import useGoogleMap from './useGoogleMap';

function Map({ center, zoom, children, events, style, bounds }) {
  const { maps, map, mapRef, loading } = useGoogleMap({
    zoom,
    center,
    events,
    bounds,
  });

  useEffect(() => {
    if (center.lat && center.lng) {
      map && map.panTo(center);
    }
  }, [center, map]);

  return (
    <div className="map-container">
      <div ref={mapRef} className="map-ref" style={style} />
      {!loading &&
        React.Children.map(children, (child) => {
          return React.cloneElement(child, { map, maps, bounds });
        })}
    </div>
  );
}

export default React.memo(Map);
