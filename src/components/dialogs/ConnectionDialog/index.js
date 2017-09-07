import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Dialog from '../Dialog';
import logoImage from 'images/logo.png';

@inject('view_store')
@themr('ConnectionDialog')
@observer
class ConnectionDialog extends Component {
  @autobind onDismiss(event) {
    event.preventDefault();
    this.props.view_store.toggleConnectionDialog();
  }

  @autobind onHide() {
    this.props.view_store.toggleConnectionDialog();
  }

  render() {
    const { theme } = this.props;

    return (
      <Dialog
        show={this.props.view_store.isConnectionDialogShown}
        onHide={this.onHide}
        header='Connection Failed'
      >
        <div className={theme.body}>
          <div className={theme.logo}>
            <img src={logoImage} alt='logo' />
          </div>
          <div className={theme.content}>
            <p>
              Could not connect to the server. You may need to reload the page to reconnect.
            </p>
          </div>
        </div>

      </Dialog>
    );
  }
}

export default ConnectionDialog;
