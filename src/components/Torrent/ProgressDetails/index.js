import React from 'react';

import Magnet from './Magnet';
import Done from './Done';
import Pending from './Pending';

export default function({ torrent }) {
  if (torrent.needsMetaData) {
    return <Magnet torrent={torrent} />;
  }

  // TODO: Append ETA
  if (torrent.isDone || torrent.isSeeding) {
    return <Done torrent={torrent} />;
  }

  return <Pending torrent={torrent} />;
}
