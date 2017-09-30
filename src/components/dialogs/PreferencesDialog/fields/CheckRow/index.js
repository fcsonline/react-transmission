import React, { Component} from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';

@inject('session_store')
@themr('PreferencesDialog')
@observer
class CheckRow extends Component {
  render() {
    const { theme } = this.props;
    const check = this.props.session_store.settings[this.props.id];

    return (
      <div className={theme.row}>
        <input type='checkbox' id={this.props.id} title={this.props.title} defaultChecked={check} />
        <label htmlFor={this.props.id} title={this.props.title}>{this.props.label}</label>
      </div>
    );
  }
}

export default CheckRow;
