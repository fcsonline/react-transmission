import React, { Component } from 'react';
import { themr } from 'react-css-themr';

import FileList from './FileList';
import PriorityButton from './PriorityButton';
import WantedButton from './WantedButton';

@themr('Files')
class FileRow extends Component {
  render() {
    const { theme, name, node, setPriority, setWanted } = this.props;
    const { priority, fileIds, entries } = node;
    const wanted = !!node.wanted;

    return (
      <div className={theme.fileRowContainer}>
        <div className={theme.fileRow}>
          <WantedButton
            wanted={wanted}
            fileIds={fileIds}
            setWanted={setWanted}
          />
          <div className={theme.name}>{name}</div>
          <PriorityButton
            priority={priority}
            fileIds={fileIds}
            setPriority={setPriority}
          />
        </div>
        {entries && <FileList entries={entries} setPriority={setPriority} setWanted={setWanted} />}
      </div>
    );
  }
}

export default FileRow;
