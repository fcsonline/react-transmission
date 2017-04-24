import React from 'react';
import { FormattedMessage } from 'react-intl';

import Torrent from 'stores/torrent';

const {
  STATUS_STOPPED,
  STATUS_CHECK_WAIT,
  STATUS_CHECK,
  STATUS_DOWNLOAD_WAIT,
  STATUS_DOWNLOAD,
  STATUS_SEED_WAIT,
  STATUS_SEED,
} = Torrent;

export default function({ torrent }) {
  switch (torrent.status) {
    case STATUS_CHECK_WAIT:
      return <FormattedMessage id='torrent.status.checkwait' defaultMessage='Queued for verification' />;
    case STATUS_CHECK:
      return <FormattedMessage id='torrent.status.check' defaultMessage='Verifying local data' />;
    case STATUS_DOWNLOAD_WAIT:
      return <FormattedMessage id='torrent.status.downloadwait' defaultMessage='Queued for download' />;
    case STATUS_DOWNLOAD:
      return <FormattedMessage id='torrent.status.download' defaultMessage='Downloading' />;
    case STATUS_SEED_WAIT:
      return <FormattedMessage id='torrent.status.seedwait' defaultMessage='Queued for seeding' />;
    case STATUS_SEED:
      return <FormattedMessage id='torrent.status.seed' defaultMessage='Seeding' />;
    case STATUS_STOPPED:
      return (
      torrent.isFinished
        ? <FormattedMessage id='torrent.status.finished' defaultMessage='Finished' />
        : <FormattedMessage id='torrent.status.paused' defaultMessage='Paused' />
      );
    case null:
    case undefined:
      return <FormattedMessage id='torrent.status.unknown' defaultMessage='Unknown' />;
    default:
      return <FormattedMessage id='torrent.status.error' defaultMessage='Error' />;
  }
}
