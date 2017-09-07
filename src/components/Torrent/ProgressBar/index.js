import React, { Component } from 'react';
import { themr } from 'react-css-themr';

function getPercentage(torrent) {
  // TODO: Extract from session store if configure globally or grab torrent one
  const seedRatioLimit = torrent.seedRatioLimit;

  if (torrent.needsMetaData) {
    return torrent.metadataPercentComplete * 100;
  }

  if (!torrent.isDone) {
    return Math.round(torrent.percentDone * 100);
  }

  if (seedRatioLimit > 0 && torrent.isSeeding) {
    return Math.round(torrent.uploadRatio * 100 / seedRatioLimit);
  }

  return 100;
}

function getProgressStyles(theme, torrent) {
  let barStyle = '';

  if (torrent.isStopped) {
    barStyle = theme.paused;
  } else if (torrent.isDownloadingQueued) {
    barStyle = theme.leechingQueued;
  } else if (torrent.needsMetaData) {
    barStyle = theme.magnet;
  } else if (torrent.isDownloading) {
    barStyle = theme.leeching;
  } else if (torrent.isSeedingQueued) {
    barStyle = theme.seedingQueued;
  } else if (torrent.isSeeding) {
    barStyle = theme.seeding;
  }

  return `${theme.progressBar} ${barStyle}`;
}

@themr('ProgressBar')
class Compact extends Component {
  render() {
    const { theme, torrent } = this.props;

    return (
      <div className={getProgressStyles(theme, torrent)}>
        <progress max='100' value={getPercentage(torrent)} />
      </div>
    );
  }
}

export default Compact;
