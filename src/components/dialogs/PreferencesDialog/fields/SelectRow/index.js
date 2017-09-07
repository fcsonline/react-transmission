import React, { Component} from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';

@inject('session_store')
@themr('PreferencesDialog')
@observer
class SelectRow extends Component {
  render() {
    const { theme } = this.props;

    const options = Object.keys(this.props.options).map((key) => {
      return {
        key: key,
        value: this.props.options[key],
      };
    });

    return (
      <div className={theme.row}>
        <div className={theme.key}>
          <label htmlFor={this.props.id}>{this.props.label}:</label>
        </div>
        <div className={theme.value}>
          <select id={this.props.id}>
            {options.map((option) => (
              <option key={option.key} value={option.key}>{option.value}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default SelectRow;
