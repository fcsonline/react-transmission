import React from 'react';
import { FormattedMessage } from 'react-intl';

import { formatUL } from 'util/formatters';

export default ({ torrent: { peersGettingFromUs, peersConnected, rateUpload } }) => (
  <FormattedMessage
    id='torrent.full.seeding'
    defaultMessage={`Seeding to {peersGettingFromUs, number} of {peersConnected, number} connected {peersConnected, plural, one{peer} other{peers}} - {formattedRateUpload}`}
    values={{
      peersGettingFromUs,
      peersConnected,
      formattedRateUpload: formatUL(rateUpload),
    }}
  />
);
