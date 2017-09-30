import React, { Component} from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';

@inject('view_store')
@themr('Dialog')
@observer
class Header extends Component {
  render() {
    const { theme } = this.props;

    return (
      <header className={theme.header}>
        <h2 className={theme.title}>{ this.props.title }</h2>
        <button className={theme.close} onClick={this.props.onClose} title='Close'>
          <div className={theme.closeImage} />
        </button>
      </header>
    );
  }
}

export default Header;
