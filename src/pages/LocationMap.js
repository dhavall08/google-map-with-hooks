import React, { useEffect, useRef } from 'react';
import Map from '../map/Map';
import Marker from '../map/Marker';

const mapStyles = {
  height: 'calc(100vh - 110px)',
  borderRadius: '0.3rem',
  width: 'min(100%, 1024px)',
};

// change this file according to data
function LocationMap({ data, center, active, selectHandler }) {
  const bounds = useRef();
  const infoWin = useRef();

  useEffect(() => {
    if (data && window.google && window.google.maps) {
      bounds.current = new window.google.maps.LatLngBounds();
    }
  }, [data]);

  useEffect(() => {
    if (infoWin.current) {
      infoWin.current.close();
    }
  }, [center]);

  function openInfoWindow(map, marker, infoWindow) {
    if (infoWin.current) {
      infoWin.current.close();
    }
    infoWindow.open(map, marker);
    infoWin.current = infoWindow;
  }

  return (
    <div>
      <Map style={mapStyles} zoom={10} center={center || {}} bounds={bounds}>
        {data.map((m) =>
          m.monuments && m.monuments.length > 0
            ? m.monuments.map((monument) => (
                <Marker
                  key={`${m.id}_${monument.id}`}
                  uniqueId={`${m.id}_${monument.id}`}
                  active={{
                    value: active.mainId === m.id,
                    zoom: active.zoomIn,
                  }}
                  title={monument.name}
                  position={{
                    lat: monument.position.lat,
                    lng: monument.position.lng,
                  }}
                  events={{
                    onClick: (obj) => selectHandler(obj, true, false),
                  }}
                  infoWindow={{
                    onClick: openInfoWindow,
                    content: (
                      <div>
                        <h3>{monument.name}</h3>
                        {/* Add design to infowindow here */}
                      </div>
                    ),
                  }}
                />
              ))
            : null
        )}
      </Map>
    </div>
  );
}

export default React.memo(LocationMap);
