import React, { Component} from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';

@inject('session_store')
@themr('PreferencesDialog')
@observer
class TextRow extends Component {
  render() {
    const { theme } = this.props;
    const value = this.props.session_store.settings[this.props.id];

    return (
      <div className={theme.row}>
        <div className={theme.key}>{this.props.label}:</div>
        <div className={theme.value}>
          <input type='text' id={this.props.id} defaultValue={value} />
        </div>
      </div>
    );
  }
}

export default TextRow;
