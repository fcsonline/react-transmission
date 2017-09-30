import React, { Component} from 'react';
import { findDOMNode } from 'react-dom';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import SettingsContextMenu from 'components/menus/SettingsContextMenu';

@inject('view_store', 'session_store')
@themr('StatusToolbar')
@observer
class StatusToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        left: 0,
        top: 0,
      },
    };
  }

  @autobind onTogglePreferences() {
    this.props.view_store.togglePreferencesDialog();
  }

  @autobind onToggleCompact() {
    this.props.view_store.toggleCompact();
  }

  @autobind onToggleTurtle() {
    this.props.session_store.togglePreference('alt-speed-enabled');
  }

  @autobind onToggleSettings(event) {
    const { clientX, clientY } = event;

    event.preventDefault();
    event.stopPropagation();

    this.toggleContextMenu({left: clientX, top: clientY});
  }

  @autobind toggleContextMenu(position) {
    this.props.view_store.toggleSettingsContextMenu();
    this.setState({position});
  }

  @autobind renderContextMenu() {
    const { position } = this.state;

    return (
      <div ref='target' style={{position: 'absolute', visibility: 'hidden', ...position, left: position.left + 50}}>
        <SettingsContextMenu
          show={this.props.view_store.isSettingsContextMenuShown}
          container={this}
          target={() => findDOMNode(this.refs.target)}
          onHide={() => this.props.view_store.toggleSettingsContextMenu()}
        />
      </div>
    );
  }

  render() {
    const { theme } = this.props;
    let compactClassName = theme.button;
    let turtleClassName = theme.button;

    if (this.props.view_store.compact) {
      compactClassName += ` ${theme.active}`;
    }

    if (this.props.session_store.settings['alt-speed-enabled']) {
      turtleClassName += ` ${theme.active}`;
    }

    return (
      <div className={theme.toolbar}>
        <button className={theme.button} onClick={this.onToggleSettings} title='Settings'>
          <div className={theme.settingsImage} />
        </button>
        <button className={theme.button} onClick={this.onTogglePreferences} title='Preferences'>
          <div className={theme.preferencesImage} />
        </button>
        <button className={turtleClassName} onClick={this.onToggleTurtle} title='Speed limit'>
          <div className={theme.turtleImage} />
        </button>
        <button className={compactClassName} onClick={this.onToggleCompact} title='Compact view'>
          <div className={theme.compactImage} />
        </button>
        {this.renderContextMenu()}
      </div>
    );
  }
}

export default StatusToolbar;
