import React, { Component} from 'react';
import { Modal } from 'react-overlays';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';

import Header from './Header';

@inject('view_store')
@themr('Dialog')
@observer
class Dialog extends Component {
  render() {
    const { theme } = this.props;

    return (
      <Modal
        backdropClassName={theme.backdrop}
        show={this.props.show}
        onHide={this.props.onHide}
      >
        <div className={theme.dialog}>
          <Header title={this.props.header} onClose={this.props.onHide} />
          {this.props.children}
        </div>
      </Modal>
    );
  }
}

export default Dialog;
