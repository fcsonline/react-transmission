import React, { Component} from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';

@inject('session_store')
@themr('PreferencesDialog')
@observer
class PortTestRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: null,
    };
  }

  componentDidMount() {
    const port = this.props.session_store.settings['peer-port'];

    this.props.session_store.testPort(port).then((open) => {
      this.setState({
        open: open,
      });
    });
  }

  renderPortStatus() {
    if (this.state.open === null) {
      return (
        <span id='port-label'>Status: Unknown</span>
      );
    } else if (this.state.open) {
      return (
        <span id='port-label'>Port is <strong>Open</strong></span>
      );
    } else {
      return (
        <span id='port-label'>Port is <strong>Closed</strong></span>
      );
    }
  }

  render() {
    const { theme } = this.props;

    return (
      <div className={theme.row}>
        <div className={theme.key}>&nbsp;</div>
        <div className={theme.value}>
          {this.renderPortStatus()}
        </div>
      </div>
    );
  }
}

export default PortTestRow;
