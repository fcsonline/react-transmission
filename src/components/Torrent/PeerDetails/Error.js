import React from 'react';
import { FormattedMessage } from 'react-intl';

import Torrent from 'stores/torrent';

const {
  ERR_TRACKER_WARNING,
  ERR_TRACKER_ERROR,
  ERR_LOCAL_ERROR,
} = Torrent;

function TrackerWarning({ torrent }) {
  const { errorDescription } = torrent;

  return (
    <FormattedMessage
      id='torrent.error.trackerwarning'
      defaultMessage={`Tracker returned a warning: {errorDescription}`}
      values={{errorDescription}}
    />
  );
}

function TrackerError({ torrent }) {
  const { errorDescription } = torrent;

  return (
    <FormattedMessage
      id='torrent.error.trackererror'
      defaultMessage={`Tracker returned an error: {errorDescription}`}
      values={{errorDescription}}
    />
  );
}

function LocalError({ torrent }) {
  const { errorDescription } = torrent;

  return (
    <FormattedMessage
      id='torrent.error.localerror'
      defaultMessage={`Error: {errorDescription}`}
      values={{errorDescription}}
    />
  );
}

export default function({ torrent }) {
  switch (torrent.error) {
    case ERR_TRACKER_WARNING:
      return <TrackerWarning torrent={torrent} />
    case ERR_TRACKER_ERROR:
      return <TrackerError torrent={torrent} />
    case ERR_LOCAL_ERROR:
      return <LocalError torrent={torrent} />
    default:
      return null;
  }
}
