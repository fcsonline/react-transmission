import React from 'react';
import { FormattedMessage } from 'react-intl';

import { formatUL, formatDL } from 'util/formatters';

function DownloadingFromPeersAndWebSeeds({ torrent }) {
  const { peersSendingToUs, peersConnected, webseedsSendingToUs, rateUpload, rateDownload } = torrent;

  return (
    <FormattedMessage
      id='torrent.full.downloading.frompeersandwebseeds'
      defaultMessage={`Downloading from {peersSendingToUs, number} of {peersConnected, number} {peersConnected, plural, one {peer} other {peers}} and {webseedsSendingToUs, number} {webseedsSendingToUs, plural, one {web seed} other {web seeds}} - {formattedRateDownload} {formattedRateUpload}`}
      values={{
        peersSendingToUs,
        peersConnected,
        webseedsSendingToUs,
        formattedRateUpload: formatUL(rateUpload),
        formattedRateDownload: formatDL(rateDownload),
      }}
    />
  );
}

function DownloadingFromWebSeeds({ torrent }) {
  const { webseedsSendingToUs, rateUpload, rateDownload } = torrent;

  return (
    <FormattedMessage
      id='torrent.full.downloading.fromwebseeds'
      defaultMessage={`Downloading from {webseedsSendingToUs, number} {webseedsSendingToUs, plural, one {web seed} other {web seeds}} - {formattedRateDownload} {formattedRateUpload}`}
      values={{
        webseedsSendingToUs,
        formattedRateUpload: formatUL(rateUpload),
        formattedRateDownload: formatDL(rateDownload),
      }}
    />
  );
}

function DownloadingFromPeers({ torrent }) {
  const { peersSendingToUs, peersConnected, rateUpload, rateDownload } = torrent;

  return (
    <FormattedMessage
      id='torrent.full.downloading.frompeers'
      defaultMessage={`Downloading from {peersSendingToUs, number} of {peersConnected, number} {peersConnected, plural, one {peer} other {peers}} - {formattedRateDownload} {formattedRateUpload}`}
      values={{
        peersSendingToUs,
        peersConnected,
        formattedRateUpload: formatUL(rateUpload),
        formattedRateDownload: formatDL(rateDownload),
      }}
    />
  );
}

export default function({ torrent }) {
  const { peersConnected, webseedsSendingToUs } = torrent;

  if (webseedsSendingToUs && peersConnected) {
    return <DownloadingFromPeersAndWebSeeds torrent={torrent} />
  }

  if (webseedsSendingToUs) {
    return <DownloadingFromWebSeeds torrent={torrent} />
  }

  return <DownloadingFromPeers torrent={torrent} />
}
