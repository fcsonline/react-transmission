import React from 'react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  needs: {
    id: 'torrent.progress.magnet.needs',
    defaultMessage: 'needs',
  },
  retrieving: {
    id: 'torrent.progress.magnet.retrieving',
    defaultMessage: 'retrieving',
  },
});

function ProgressMagnet({ torrent, intl }) {
  const metadataStatus = torrent.isStopped ? messages.needs : messages.retrieving;

  return (
    <FormattedMessage
      id='torrent.progress.magnet'
      defaultMessage={`Magnetized transfer - {metadataStatus} metadata ({completed})`}
      values={{
        metadataStatus: intl.formatMessage(metadataStatus),
        completed: intl.formatNumber(torrent.metadataPercentComplete, {style: 'percent'}),
      }}
    />
  );
}

export default injectIntl(ProgressMagnet);
