import React, { Component } from 'react';
import { themr } from 'react-css-themr';

@themr('ContextMenu')
class Menu extends Component {
  render() {
    const { theme, children, style } = this.props;
    return (
      <div className={theme.contextMenuOuter} style={style}>
        <div className={theme.contextMenuInner}>
          {children}
        </div>
      </div>
    );
  }
}

export default Menu;
