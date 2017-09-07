import React, { Component } from 'react';
import { themr } from 'react-css-themr';

@themr('Files')
class PriorityButton extends Component {
  render() {
    const { theme, priority, fileIds, setPriority } = this.props;

    return (
      <div className={theme.priorityButton}>
        <button
          title='Low Priority'
          className={priority.includes(-1) ? theme.selected : ''}
          onClick={() => setPriority({fileIds, priority: 'low'})}
        >
          <div className={theme.lowImage} />
        </button>
        <button
          title='Normal Priority'
          className={priority.includes(0) ? theme.selected : ''}
          onClick={() => setPriority({fileIds, priority: 'normal'})}
        >
          <div className={theme.normalImage} />
        </button>
        <button
          title='High Priority'
          className={priority.includes(1) ? theme.selected : ''}
          onClick={() => setPriority({fileIds, priority: 'high'})}
        >
          <div className={theme.highImage} />
        </button>
      </div>
    );
  }
}

export default PriorityButton;
