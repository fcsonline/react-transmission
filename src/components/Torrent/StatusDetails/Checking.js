import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

function Checking({ torrent, intl }) {
  const { recheckProgress } = torrent;

  return (
    <FormattedMessage
      id='torrent.full.checking'
      defaultMessage={`Verifying local data ({recheckProgress} tested)`}
      values={{
        recheckProgress: intl.formatNumber(recheckProgress, {style: 'percent'}),
      }}
    />
  );
}

export default injectIntl(Checking);
