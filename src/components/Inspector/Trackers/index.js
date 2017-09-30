import React from 'react';

import TrackerGroup from './TrackerGroup';

function Trackers({ info }) {
  return (
    <div>
      {info.trackers.map(({ name, trackers }, index) => (
        <div key={index}>
          {info.trackers.length > 1 && <p>{name}</p>}
          <TrackerGroup trackers={trackers} />
        </div>
      ))}
    </div>
  );
}

export default Trackers;
