import React from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { size as formatSize, ratioString } from 'util/formatters';

const messages = defineMessages({
  uploadStats: {
    id: 'torrent.progress.done.uploadstats',
    defaultMessage: `uploaded {uploaded} (Ratio: {ratio})`,
  },
});

const PartialDone = injectIntl(({ torrent, intl }) =>
  <FormattedMessage
    id='torrent.progress.done.partial'
    defaultMessage={`{remaining} of {total} ({completed}), {stats}`}
    values={{
      remaining: formatSize(torrent.sizeWhenDone),
      total: formatSize(torrent.totalSize),
      completed: intl.formatNumber(torrent.percentDone, {style: 'percent'}),
      stats: intl.formatMessage(messages.uploadStats, {
        uploaded: formatSize(torrent.uploadedEver),
        ratio: ratioString(torrent.uploadRatio),
      }),
    }}
  />
);

const DoneDone = injectIntl(({ torrent, intl }) =>
  <FormattedMessage
    id='torrent.progress.done.done'
    defaultMessage={`{total}, {stats}`}
    values={{
      total: formatSize(torrent.totalSize),
      stats: intl.formatMessage(messages.uploadStats, {
        uploaded: formatSize(torrent.uploadedEver),
        ratio: ratioString(torrent.uploadRatio),
      }),
    }}
  />
);

function ProgressDone({ torrent }) {
  if (torrent.totalSize === torrent.sizeWhenDone) {
    return <DoneDone torrent={torrent} />;
  }

  return <PartialDone torrent={torrent} />;
}

export default ProgressDone;
