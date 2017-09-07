import React, { Component} from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { speedBps } from 'util/formatters';
import Torrent from 'stores/torrent';

@inject('view_store', 'stats_store', 'torrents_store')
@themr('FilterToolbar')
@observer
class FilterToolbar extends Component {
  @autobind deselectAllTorrents() {
    this.props.view_store.selectTorrents([]);
  }

  @autobind onChangeFilterState(event) {
    this.deselectAllTorrents();
    this.props.torrents_store.setStatusFilter(+event.target.value);
  }

  @autobind onChangeFilterTracker(event) {
    this.deselectAllTorrents();
    this.props.torrents_store.setTrackerFilter(event.target.value);
  }

  @autobind onChangeFilterText(event) {
    this.deselectAllTorrents();
    this.props.torrents_store.setTextFilter(event.target.value);
  }

  render() {
    const { theme } = this.props;
    const torrentCount = this.props.stats_store.stats.torrentCount;
    const states = [
      {value: -1, label: 'All'},
      {value: 11, label: 'Active'},
      {value: Torrent.STATUS_DOWNLOAD, label: 'Downloading'},
      {value: Torrent.STATUS_SEED, label: 'Seeding'},
      {value: Torrent.STATUS_STOPPED, label: 'Paused'},
      {value: 55, label: 'Finished'},
    ];

    const trackers = this.props.torrents_store.trackers.map((domain) => {
      const label = domain.replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize

      return {value: domain, label};
    });

    return (
      <div className={theme.toolbar}>
        <span>Show</span>

        <div className={theme.filters}>
          <select onChange={this.onChangeFilterState}>
            {states.map((state, index) => <option key={index} value={state.value}>{state.label}</option>)}
          </select>
          <select onChange={this.onChangeFilterTracker}>
            <option value=''>All</option>
            {trackers.map((tracker, index) => <option key={index} value={tracker.value}>{tracker.label}</option>)}
          </select>
          <input className={theme.filter} type='search' placeholder='Filter' onChange={this.onChangeFilterText} />
          <span className={theme.counter}>{torrentCount} Transfers</span>
        </div>

        <div className={theme.stats}>
          <span title='Download speed'>
            <div className={theme.downImage} />
            {speedBps(this.props.torrents_store.totalDownloadSpeed)}
          </span>
          <span title='Upload speed'>
            <div className={theme.upImage} />
            {speedBps(this.props.torrents_store.totalUploadSpeed)}
          </span>
        </div>
      </div>
    );
  }
}

export default FilterToolbar;
