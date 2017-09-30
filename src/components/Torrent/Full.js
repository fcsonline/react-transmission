import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import ProgressBar from './ProgressBar';
import StatusButton from './StatusButton';

import { getPeerDetails, getProgressDetails } from './services';

function getPeerDetailsStyles(theme, torrent) {
  if (torrent.hasErrors) {
    return theme.peerDetailsError;
  }

  return theme.peerDetails;
}

@inject('torrents_store')
@themr('Torrent')
@observer
class Full extends Component {
  @autobind onToggleTorrent(torrentId) {
    if (this.props.torrent.isStopped) {
      this.props.torrents_store.start(torrentId);
      return;
    }

    this.props.torrents_store.stop(torrentId);
  }

  render() {
    const { theme, torrent } = this.props;

    return (
      <div className={theme.torrent}>
        <div className={theme.name}>
          {torrent.name}
        </div>
        <div className={getPeerDetailsStyles(theme, torrent)}>
          {getPeerDetails(torrent)}
        </div>
        <div className={theme.progressBarRow}>
          <ProgressBar torrent={torrent} />
          <StatusButton torrent={torrent} onToggle={this.onToggleTorrent} />
        </div>
        <div className={theme.progressDetails}>
          {getProgressDetails(torrent)}
        </div>
      </div>
    );
  }
}

export default Full;
