import React, { Component} from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';

@inject('session_store')
@themr('PreferencesDialog')
@observer
class CheckValueRow extends Component {
  render() {
    const { theme } = this.props;
    const check = this.props.session_store.settings[this.props.idCheck];
    const value = this.props.session_store.settings[this.props.idValue];

    return (
      <div className={theme.row}>
        <div className={theme.key}>
          <input type='checkbox' id={this.props.idCheck} defaultChecked={check} />
          <label htmlFor={this.props.idCheck}>{this.props.label}</label>
        </div>
        <div className={theme.value}>
          <input type='number' min='0' id={this.props.idValue} defaultValue={value} disabled={!check} />
        </div>
      </div>
    );
  }
}

export default CheckValueRow;
