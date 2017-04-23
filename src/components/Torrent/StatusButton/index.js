import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import autobind from 'autobind-decorator';
import { observer } from 'mobx-react';

import styles from './styles/index.css';

@observer
@CSSModules(styles)
class StatusButton extends Component {
  static defaultProps = {
    onToggle: () => {},
  }

  @autobind onClick(event) {
    this.props.onToggle(this.props.torrent.id);
  }

  render() {
    return (
      <button
        styleName={this.props.torrent.isStopped ? 'statusResume' : 'statusPause'}
        onClick={this.onClick}
      />
    );
  }
}

export default StatusButton;
