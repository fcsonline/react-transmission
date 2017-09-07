import React, { Component} from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

@inject('torrents_store', 'view_store')
@themr('ActionToolbar')
@observer
class ActionToolbar extends Component {
  @autobind onOpen() {
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onRemove() {
    const confirmRemove = confirm(`Once removed, continuing the transfer will require the torrent file. Are you sure you want to remove it?`);

    if (!confirmRemove) return;

    this.props.torrents_store.remove(this.props.view_store.selectedTorrents);
  }

  @autobind onPause() {
    this.props.torrents_store.stop(this.props.view_store.selectedTorrents);
  }

  @autobind onStart() {
    this.props.torrents_store.start(this.props.view_store.selectedTorrents);
  }

  @autobind onPauseAll() {
    this.props.torrents_store.stop(this.props.torrents_store.torrents.map((torrent) => torrent.id));
  }

  @autobind onStartAll() {
    this.props.torrents_store.start(this.props.torrents_store.torrents.map((torrent) => torrent.id));
  }

  @autobind onToggleInspector() {
    this.props.view_store.toggleInspector();
  }

  render() {
    const { theme, view_store, torrents_store } = this.props;

    const selectedTorrents = torrents_store.getByIds(view_store.selectedTorrents);
    const isAnySelected = selectedTorrents.length > 0;
    const isAnyStarted = selectedTorrents.some((torrent) => torrent.isDownloading || torrent.isSeeding);
    const isAnyPaused = selectedTorrents.some((torrent) => torrent.isStopped);

    return (
      <div className={theme.toolbar}>
        <button
          className={theme.button}
          onClick={this.onOpen}
          title='Open Torrent'>
          <div className={theme.openImage} />
        </button>
        <button
          className={theme.button}
          onClick={this.onRemove}
          disabled={!isAnySelected}
          title='Remove Selected Torrents'>
          <div className={theme.removeImage} />
        </button>
        <span className={theme.separator} />
        <button
          className={theme.button}
          onClick={this.onStart}
          disabled={!isAnyPaused}
          title='Start Selected Torrents'>
          <div className={theme.startImage} />
        </button>
        <button
          className={theme.button}
          onClick={this.onPause}
          disabled={!isAnyStarted}
          title='Pause Selected Torrents'>
          <div className={theme.pauseImage} />
        </button>
        <span className={theme.separator} />
        <button
          className={theme.button}
          onClick={this.onStartAll}
          title='Start All Torrents'>
          <div className={theme.startAllImage} />
        </button>
        <button
          className={theme.button}
          onClick={this.onPauseAll}
          title='Pause All Torrents'>
          <div className={theme.pauseAllImage} />
        </button>
        <button
          className={`${theme.button} ${theme.inspector}`}
          onClick={this.onToggleInspector}
          title='Toggle inspector'>
          <div className={theme.inspectorImage} />
        </button>
      </div>
    );
  }
}

export default ActionToolbar;
