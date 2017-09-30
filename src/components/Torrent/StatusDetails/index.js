import React from 'react';

import Seeding from './Seeding';
import Checking from './Checking';
import Downloading from './Downloading';
import Error from './Error';
import Status from './Status';

function StatusDetails({ torrent }) {
  if (torrent.hasErrors) {
    return <Error torrent={torrent} />;
  }

  if (torrent.isDownloading) {
    return <Downloading torrent={torrent} />;
  }

  if (torrent.isSeeding) {
    return <Seeding torrent={torrent} />;
  }

  if (torrent.isChecking) {
    return <Checking torrent={torrent} />;
  }

  return <Status torrent={torrent} />;
}

export default StatusDetails;
