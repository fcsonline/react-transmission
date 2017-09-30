import React, { Component} from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Dialog from '../Dialog';

import TorrentsTabPanel from './TorrentsTabPanel';
import SpeedTabPanel from './SpeedTabPanel';
import PeersTabPanel from './PeersTabPanel';
import NetworkTabPanel from './NetworkTabPanel';

@inject('view_store', 'session_store')
@themr('PreferencesDialog')
@observer
class PreferencesDialog extends Component {
  @autobind onBlur(event) {
    const type = event.target.attributes.type.value;
    const id = event.target.attributes.id.value;
    const value = event.target.value;

    if (type !== 'checkbox') {
      this.props.session_store.setPreference(id, value);
    }
  }

  @autobind onChange(event) {
    const type = event.target.attributes.type.value;
    const id = event.target.attributes.id.value;
    const value = event.target.checked;

    if (type === 'checkbox') {
      this.props.session_store.setPreference(id, value);
    }
  }

  @autobind onHide() {
    this.props.view_store.togglePreferencesDialog();
  }

  render() {
    const { theme } = this.props;

    return (
      <Dialog
        show={this.props.view_store.isPreferencesDialogShown}
        onHide={this.onHide}
        header='Preferences'
      >
        <div className={theme.body}>
          <div className={theme.content}>
            <Tabs onBlur={this.onBlur} onChange={this.onChange}>
              <TabList>
                <Tab>Torrents</Tab>
                <Tab>Speed</Tab>
                <Tab>Peers</Tab>
                <Tab>Network</Tab>
              </TabList>
              <TabPanel>
                <TorrentsTabPanel />
              </TabPanel>
              <TabPanel>
                <SpeedTabPanel />
              </TabPanel>
              <TabPanel>
                <PeersTabPanel />
              </TabPanel>
              <TabPanel>
                <NetworkTabPanel />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default PreferencesDialog;
