import React, { Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';

import TorrentStats from 'stores/torrent-stats';

import Activity from './Activity';
import Details from './Details';
import Peers from './Peers';
import Trackers from './Trackers';
import Files from './Files';

@inject('view_store', 'torrents_store')
@themr('Inspector')
@observer
class Inspector extends Component {
  render() {
    const { theme } = this.props;
    const selectedTorrentIds = this.props.view_store.selectedTorrents;
    const torrents = this.props.torrents_store.getByIds(selectedTorrentIds);

    const info = new TorrentStats(torrents);

    return (
      <div className={theme.inspector}>
        <Tabs>
          <TabList>
            <Tab title='Info'><div className={theme.infoImage} /></Tab>
            <Tab title='Peers'><div className={theme.peersImage} /></Tab>
            <Tab title='Trackers'><div className={theme.trackersImage} /></Tab>
            <Tab title='Files'><div className={theme.filesImage} /></Tab>
          </TabList>
          <TabPanel>
            <h1>{info.title}</h1>
            <Activity info={info} />
            <Details info={info} />
          </TabPanel>
          <TabPanel>
            <h1>{info.title}</h1>
            {info.peers.length > 0 && <Peers info={info} />}
          </TabPanel>
          <TabPanel>
            <h1>{info.title}</h1>
            {info.trackers.length > 0 && <Trackers info={info} />}
          </TabPanel>
          <TabPanel>
            <h1>{info.title}</h1>
            {info.files.length > 0 && <Files info={info} />}
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Inspector;
