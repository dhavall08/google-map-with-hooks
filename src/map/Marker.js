import React, { useEffect } from 'react';

import useGoogleMapMarker from './useGoogleMapMarker';

const activeIcon = 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png';
const inactiveIcon = 'http://maps.gstatic.com/mapfiles/markers2/marker.png';

function Marker(props) {
  const marker = useGoogleMapMarker(props);

  useEffect(() => {
    if (marker) {
      if (props.active && props.active.value) {
        props.active.zoom && props.map.setZoom(12);
        marker.setZIndex(200);
        marker.setIcon(activeIcon);
      } else {
        marker.setZIndex(80);
        marker.setIcon(inactiveIcon);
      }
    }
  }, [marker, props.active, props.map]);

  return null;
}

export default React.memo(Marker);
