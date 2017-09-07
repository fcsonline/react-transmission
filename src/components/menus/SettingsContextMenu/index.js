import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import ContextMenu from 'components/menus/ContextMenu';
import SortByContextMenu from 'components/menus/SortByContextMenu';
import RateContextMenu from 'components/menus/RateContextMenu';

@inject('view_store')
@themr('SettingsContextMenu')
@observer
class TorrentContextMenu extends Component {
  @autobind onAbout() {
    this.props.view_store.toggleAboutDialog();
  }

  @autobind onStatistics() {
    this.props.view_store.toggleStatisticsDialog();
  }

  @autobind onToggleSortByContextMenu() {
    this.props.view_store.toggleSortByContextMenu();
  }

  @autobind onToggleDownloadRateContextMenu() {
    this.props.view_store.toggleDownloadRateContextMenu();
  }

  @autobind onToggleUploadRateContextMenu() {
    this.props.view_store.toggleUploadRateContextMenu();
  }

  @autobind onToggleContextMenu() {
    // TODO: Move it to ContextMenu component
    this.props.view_store.toggleContextMenus();
  }

  render() {
    const { theme } = this.props;

    return (
      <ContextMenu
        show={this.props.show}
        container={this.props.container}
        target={this.props.target}
        onHide={this.props.onHide}
      >
        <ul className={theme.torrentMenu} onClick={this.onToggleContextMenu}>
          <li className={theme.torrentMenuItem} onClick={this.onAbout}>About</li>
          <li className={theme.torrentMenuSeparator} />
          <li className={theme.torrentMenuItem}>
            <a href='http://transmissionbt.com/' target='_blank'>
              Transmission Home page
            </a>
          </li>
          <li className={theme.torrentMenuItem}>
            <a href='http://transmissionbt.com/donate/' target='_blank'>
              Transmission Tip Jar
            </a>
          </li>
          <li className={theme.torrentMenuSeparator} />
          <li className={theme.torrentMenuItem} onClick={this.onStatistics}>Statistics</li>
          <li className={theme.torrentMenuSeparator} />
          <li
            ref='downloadRateTarget'
            className={this.props.view_store.isDownloadRateContextMenuShown ? theme.torrentMenuSelected : theme.torrentMenuSubitem}
            onMouseEnter={this.onToggleDownloadRateContextMenu}
            onMouseLeave={this.onToggleDownloadRateContextMenu}
          >
            Total Download rate
            <RateContextMenu
              direction='down'
              show={this.props.view_store.isDownloadRateContextMenuShown}
              container={this.props.container}
              target={() => findDOMNode(this.refs.downloadRateTarget)}
              onHide={this.props.onHide}
            />
          </li>
          <li
            ref='uploadRateTarget'
            className={this.props.view_store.isUploadRateContextMenuShown ? theme.torrentMenuSelected : theme.torrentMenuSubitem}
            onMouseEnter={this.onToggleUploadRateContextMenu}
            onMouseLeave={this.onToggleUploadRateContextMenu}
          >
            Total Upload rate
            <RateContextMenu
              direction='up'
              show={this.props.view_store.isUploadRateContextMenuShown}
              container={this.props.container}
              target={() => findDOMNode(this.refs.uploadRateTarget)}
              onHide={this.props.onHide}
            />
          </li>
          <li className={theme.torrentMenuSeparator} />
          <li
            ref='sortByTarget'
            className={this.props.view_store.isSortByContextMenuShown ? theme.torrentMenuSelected : theme.torrentMenuSubitem}
            onMouseEnter={this.onToggleSortByContextMenu}
            onMouseLeave={this.onToggleSortByContextMenu}
          >
            Sort Transfers By
            <SortByContextMenu
              show={this.props.view_store.isSortByContextMenuShown}
              container={this.props.container}
              target={() => findDOMNode(this.refs.sortByTarget)}
              onHide={this.props.onHide}
            />
          </li>
        </ul>
      </ContextMenu>
    );
  }
}

export default TorrentContextMenu;
