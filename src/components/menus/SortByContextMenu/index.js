import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import ContextMenu from 'components/menus/ContextMenu';

@inject('view_store', 'torrents_store')
@themr('SortByContextMenu')
class SortByContextMenu extends Component {
  @autobind onToggleSortByContextMenu() {
    this.props.view_store.toggleSortByContextMenu();
  }

  @autobind onToggleContextMenu() {
    // TODO: Move it to ContextMenu component
    this.props.view_store.toggleContextMenus();
  }

  @autobind onSetSortCriteria(sortCriteria) {
    this.props.torrents_store.setSortCriteria(sortCriteria);
  }

  render() {
    const { theme } = this.props;
    const { sortCriteria, sortDirection } = this.props.torrents_store;
    const criteriaList = {
      queue_order: 'Queue Order',
      activity: 'Activity',
      age: 'Age',
      name: 'Name',
      percent_completed: 'Progress',
      ratio: 'Ratio',
      size: 'Size',
      state: 'State',
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
          onMouseEnter={this.onToggleSortByContextMenu}
          onMouseLeave={this.onToggleSortByContextMenu}
        >
          {Object.keys(criteriaList).map((key) => (
            <li key={key} className={sortCriteria === key ? theme.torrentMenuSelected : theme.torrentMenuItem} onClick={() => this.onSetSortCriteria(key)}>{criteriaList[key]}</li>
          ))}

          <li className={theme.torrentMenuSeparator} />
          <li className={sortDirection === 'ascending' ? theme.torrentMenuSelected : theme.torrentMenuItem}>Reverse Sort Order</li>
        </ul>
      </ContextMenu>
    );
  }
}

export default SortByContextMenu;
