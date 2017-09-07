import React, { Component } from 'react';
import { themr } from 'react-css-themr';

import FileRow from './FileRow';

@themr('Files')
class FileList extends Component {
  render() {
    const { theme, entries, setPriority, setWanted } = this.props;

    return (
      <ul className={theme.fileList}>
        {Object.keys(entries).map((key, index) => (
          <li key={index}>
            <FileRow
              name={key}
              node={entries[key]}
              setPriority={setPriority}
              setWanted={setWanted}
            />
          </li>
        ))}
      </ul>
    );
  }
};

export default FileList;
