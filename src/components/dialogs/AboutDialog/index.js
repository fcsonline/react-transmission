import React, { Component} from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Dialog from '../Dialog';
import logoImage from 'images/logo.png';

@inject('view_store', 'session_store')
@themr('AboutDialog')
@observer
class AboutDialog extends Component {
  @autobind onHide() {
    this.props.view_store.toggleAboutDialog();
  }

  render() {
    const { theme } = this.props;

    return (
      <Dialog
        show={this.props.view_store.isAboutDialogShown}
        onHide={this.onHide}
        header='About'
      >
        <div className={theme.body}>
          <div className={theme.content}>
            <div className={theme.logo}>
              <img src={logoImage} alt='logo' />
            </div>

            <h3>Transmission {this.props.session_store.settings.version}</h3>
            <p>A fast and easy BitTorrent client</p>
            <p>Copyright (c) The Transmission Project</p>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default AboutDialog;
