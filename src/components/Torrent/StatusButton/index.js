import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import autobind from 'autobind-decorator';
import { observer } from 'mobx-react';

@themr('StatusButton')
@observer
class StatusButton extends Component {
  static defaultProps = {
    onToggle: () => {},
  }

  @autobind onClick(event) {
    this.props.onToggle(this.props.torrent.id);
  }

  render() {
    const { theme } = this.props;

    return (
      <button
        className={this.props.torrent.isStopped ? theme.statusResume : theme.statusPause}
        onClick={this.onClick}
      />
    );
  }
}

export default StatusButton;
