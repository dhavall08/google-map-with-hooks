import React, { useCallback, useState } from 'react';
import data from '../data';
import LocationMap from './LocationMap';

const initialData = {
  active: {
    mainId: null,
    internalId: null,
  },
  center: { lat: 0, lng: 0 },
};

function App() {
  const [selected, setSelected] = useState(initialData);

  const setSelectedCenter = useCallback(
    (obj, noCenter = false, zoomIn = true) => {
      if (noCenter) {
        obj.uniqueId &&
          setSelected((prev) => ({
            ...prev,
            active: {
              internalId: parseInt(obj.uniqueId.split('_')[1]),
              mainId: obj.uniqueId.split('_')[0] || null,
              zoomIn, // to zoom in when selected from list
            },
          }));
        return;
      }
      setSelected({
        active: {
          internalId: obj ? obj.monuments[0].id : null,
          mainId: (obj && obj.id) || null,
          zoomIn,
        },
        center: (obj && obj.monuments[0].position) || { lat: 0, lng: 0 },
      });
    },
    []
  );

  const selectToMap = useCallback((obj, v) => {
    setSelected({
      active: {
        internalId: v ? v.id : null,
        mainId: (obj && obj.id) || null,
        zoomIn: true,
      },
      center: (v && v.position) || {
        lat: 0,
        lng: 0,
      },
    });
  }, []);

  return (
    <div className="App">
      <div style={{ float: 'left' }}>
        <button
          disabled={!selected.active.mainId}
          onClick={() => setSelected(initialData)}
        >
          Deselect all
        </button>
        {data.map((item, i) => (
          <div key={item.id}>
            <h3>{item.city}</h3>
            {item.id === selected.active.mainId && (
              <p>(Selected with green marker)</p>
            )}
            {item.monuments.map((val, i) => (
              <button
                key={val.id}
                onClick={() => selectToMap(item, val)}
                disabled={
                  val.id === selected.active.internalId &&
                  item.id === selected.active.mainId
                }
              >
                <h4>{val.name}</h4> (Click to Select)
              </button>
            ))}
            <br />
            <br />
          </div>
        ))}
      </div>
      <div>
        <LocationMap
          data={data} // pass data from api
          center={selected.center}
          active={selected.active}
          selectHandler={setSelectedCenter}
        />
      </div>
    </div>
  );
}

export default App;
