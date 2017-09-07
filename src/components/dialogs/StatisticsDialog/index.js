import React, { Component} from 'react';
import { themr } from 'react-css-themr';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { size, timeInterval } from 'util/formatters';

import Dialog from '../Dialog';

@inject('view_store', 'stats_store')
@themr('StatisticsDialog')
@observer
class StatisticsDialog extends Component {
  @autobind onHide() {
    this.props.view_store.toggleStatisticsDialog();
  }

  render() {
    const { theme } = this.props;

    if (!this.props.view_store.isStatisticsDialogShown) {
      return false;
    }

    const cumulativeSession = this.props.stats_store.currentStats;
    const cumulativeTotal = this.props.stats_store.cumulativeStats;

    return (
      <Dialog
        show={this.props.view_store.isStatisticsDialogShown}
        onHide={this.onHide}
        header='Statistics'
      >
        <div className={theme.body}>
          <h3>Current Session</h3>
          <div className={theme.row}>
            <div className={theme.key}>Uploaded:</div>
            <div className={theme.value}>{ size(cumulativeSession.uploadedBytes) }</div>
          </div>
          <div className={theme.row}>
            <div className={theme.key}>Downloaded:</div>
            <div className={theme.value}>{ size(cumulativeSession.downloadedBytes) }</div>
          </div>
          <div className={theme.row}>
            <div className={theme.key}>Ratio:</div>
            <div className={theme.value}>None</div>
          </div>
          <div className={theme.row}>
            <div className={theme.key}>Running Time:</div>
            <div className={theme.value}>{ timeInterval(cumulativeSession.secondsActive) } seconds</div>
          </div>

          <h3>Total</h3>
          <div className={theme.row}>
            <div className={theme.key}>Started:</div>
            <div className={theme.value}>{ cumulativeTotal.sessionCount } times</div>
          </div>
          <div className={theme.row}>
            <div className={theme.key}>Uploaded:</div>
            <div className={theme.value}>{ size(cumulativeTotal.uploadedBytes) }</div>
          </div>
          <div className={theme.row}>
            <div className={theme.key}>Downloaded:</div>
            <div className={theme.value}>{ size(cumulativeTotal.downloadedBytes) }</div>
          </div>
          <div className={theme.row}>
            <div className={theme.key}>Ratio:</div>
            <div className={theme.value}>None</div>
          </div>
          <div className={theme.row}>
            <div className={theme.key}>Running Time:</div>
            <div className={theme.value}>{ timeInterval(cumulativeTotal.secondsActive) } seconds</div>
          </div>
        </div>

      </Dialog>
    );
  }
}

export default StatisticsDialog;
