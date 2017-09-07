import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';

import ProgressBar from './ProgressBar';

import { getPeerDetailsShort } from './services';

@inject('view_store')
@themr('Torrent')
@observer
class Compact extends Component {
  render() {
    const { theme, torrent } = this.props;

    return (
      <div className={theme.torrentCompact}>
        <div className={theme.nameCompact}>
          {torrent.name}
        </div>
        <div className={theme.detailsCompact}>
          {getPeerDetailsShort(torrent)}
        </div>
        <div className={theme.progressBarRowCompact}>
          <ProgressBar torrent={torrent} />
        </div>
      </div>
    );
  }
}

export default Compact;
