import React, { Component } from 'react';
import { themr } from 'react-css-themr';

@themr('Inspector')
class ActivityRow extends Component {
  render() {
    const { theme, label, value } = this.props;

    return (
      <div className={theme.row}>
        <div className={theme.key}>{label}:</div>
        <div className={theme.value}>{value}</div>
      </div>
    );
  }
}

export default ActivityRow;
