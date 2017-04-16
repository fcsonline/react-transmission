import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { size as formatSize } from 'util/formatters';

function ProgressPending({ torrent, intl }) {
  const { sizeWhenDone, leftUntilDone, percentDone } = torrent;

  return (
    <FormattedMessage
      id='torrent.progress.pending'
      defaultMessage={`{remaining} of {total} ({completed})`}
      values={{
        remaining: formatSize(sizeWhenDone - leftUntilDone),
        total: formatSize(sizeWhenDone),
        completed: intl.formatNumber(percentDone, {style: 'percent'}),
      }}
    />
  );
}

export default injectIntl(ProgressPending);
