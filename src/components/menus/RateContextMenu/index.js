import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import ContextMenu from 'components/menus/ContextMenu';

@inject('view_store', 'session_store')
@themr('RateContextMenu')
class RateContextMenu extends Component {
  @autobind onToggleRateContextMenu() {
    // FIXME
    const string = this.props.direction;
    const direction = string.charAt(0).toUpperCase() + string.slice(1);

    this.props.view_store[`toggle${direction}loadRateContextMenu`]();
  }

  @autobind onToggleContextMenu() {
    // TODO: Move it to ContextMenu component
    this.props.view_store.toggleContextMenus();
  }

  @autobind onSetRateLimit(rateLimit) {
    this.props.session_store.setRateLimit(this.props.direction, rateLimit);
  }

  render() {
    const { theme } = this.props;

    const directionKey = `speed-limit-${this.props.direction}`;
    const rateLimit = this.props.session_store.settings[directionKey];
    const enabled = this.props.session_store.settings[`${directionKey}-enabled`];

    const rateList = {
      '5': '5 kB/s',
      '10': '10 kB/s',
      '20': '20 kB/s',
      '30': '30 kB/s',
      '40': '40 kB/s',
      '50': '50 kB/s',
      '75': '75 kB/s',
      '100': '100 kB/s',
      '150': '150 kB/s',
      '200': '200 kB/s',
      '250': '250 kB/s',
      '500': '500 kB/s',
      '750': '750 kB/s',
    };

    return (
      <ContextMenu
        show={this.props.show}
        container={this.props.container}
        target={this.props.target}
        onHide={this.props.onHide}
      >
        <ul
          className={theme.torrentMenu}
          onClick={this.onToggleContextMenu}
          onMouseEnter={this.onToggleRateContextMenu}
          onMouseLeave={this.onToggleRateContextMenu}
        >
          <li className={!enabled ? theme.torrentMenuSelected : theme.torrentMenuItem} onClick={() => this.onSetRateLimit(0)}>Unlimited</li>
          <li className={enabled ? theme.torrentMenuSelected : theme.torrentMenuItem}>Limit ({rateList[`${rateLimit}`]})</li>
          <li className={theme.torrentMenuSeparator} />
          {Object.keys(rateList).map((key) => (
            <li key={key} className={theme.torrentMenuItem} onClick={() => this.onSetRateLimit(+key)}>{rateList[key]}</li>
          ))}

        </ul>
      </ContextMenu>
    );
  }
}

export default RateContextMenu;
