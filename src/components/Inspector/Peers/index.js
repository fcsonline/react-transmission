import React from 'react';

import PeerGroup from './PeerGroup';

function Peers({ info }) {
  return (
    <div>
      {info.peers.map(({ name, peers }, index) => (
        <div key={index}>
          {info.peers.length > 1 && <p>{name}</p>}
          <PeerGroup peers={peers} />
        </div>
      ))}
    </div>
  );
}

export default Peers;
