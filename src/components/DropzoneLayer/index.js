import React, { Component} from 'react';
import Dropzone from 'react-dropzone';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import logoImage from 'images/logo.png';

import TorrentUpload from 'stores/torrent-upload';

@inject('torrents_store', 'session_store')
@themr('DropzoneLayer')
@observer
class DropzoneLayer extends Component {
  constructor(props) {
    super(props);

    this.torrentUpload = new TorrentUpload();
    this.torrentUpload.setDownloadDir(this.props.session_store.settings['download-dir']);
  }

  @autobind onDrop(acceptedFiles, rejectedFiles) {
    this.torrentUpload.setTorrentFiles(acceptedFiles);
    this.torrentUpload.serialize().then((torrents) => {
      torrents.forEach((torrentData) => this.props.torrents_store.add(torrentData));
    });
  }

  render() {
    const { theme } = this.props;

    return (
      <Dropzone
        activeClassName={theme.activeContainer}
        className={theme.container}
        disableClick
        accept='application/x-bittorrent'
        onDrop={this.onDrop}
      >
        <div className={theme.dropzoneContainer}>
          <div className={theme.dropzoneContent}>
            <img src={logoImage} alt='logo' />
            <div className={theme.description}>Try dropping some torrent files here.</div>
          </div>
        </div>
        <div className={theme.childrenContainer}>
          {this.props.children}
        </div>
      </Dropzone>
    );
  }
};

export default DropzoneLayer;
