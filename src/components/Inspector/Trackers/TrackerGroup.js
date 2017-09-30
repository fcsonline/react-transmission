import React, { Component } from 'react';
import { themr } from 'react-css-themr';

import {
  lastAnnounceStatus,
  getAnnounceState,
  lastScrapeStatus,
} from './services/tracker-stats';

// NOTE: We're not currently supporting multitracker entries.
// See http://www.bittornado.com/docs/multitracker-spec.txt for more info.
@themr('Trackers')
class TrackerGroup extends Component {
  render() {
    const { theme, trackers } = this.props;

    return (
      <div>
        {trackers.length > 0 &&
          <ul className={theme.trackerList}>
            {trackers.map((tracker, index) => {
              const lastAnnounceStatusHash = lastAnnounceStatus(tracker);
              const announceState = getAnnounceState(tracker);
              const lastScrapeStatusHash = lastScrapeStatus(tracker);

              return (
                <li key={index} className={theme.tierRow}>
                  <p className={theme.trackerTier}>Tier {tracker.tier + 1}</p>
                  <div className={theme.trackerRow}>
                    <div className={theme.trackerHost}>
                      {tracker.host || tracker.announce}
                    </div>
                    <div className={theme.trackerInfo}>
                      <div className={theme.trackerActivity}>
                        <p className={theme.trackerActivityRow}>{lastAnnounceStatusHash.label}: {lastAnnounceStatusHash.value}</p>
                        <p className={theme.trackerActivityRow}>{announceState}</p>
                        <p className={theme.trackerActivityRow}>{lastScrapeStatusHash.label}: {lastScrapeStatusHash.value}</p>
                      </div>
                      <dl className={theme.trackerStats}>
                        <div className={theme.trackerStatsRow}>
                          <dt className={theme.trackerStatsTerm}>Seeders:</dt>
                          <dd className={theme.trackerStatsDescription}>{tracker.seederCount > -1 ? tracker.seederCount : 'N/A'}</dd>
                        </div>
                        <div className={theme.trackerStatsRow}>
                          <dt className={theme.trackerStatsTerm}>Leechers:</dt>
                          <dd className={theme.trackerStatsDescription}>{tracker.leecherCount > -1 ? tracker.leecherCount : 'N/A'}</dd>
                        </div>
                        <div className={theme.trackerStatsRow}>
                          <dt className={theme.trackerStatsTerm}>Downloads:</dt>
                          <dd className={theme.trackerStatsDescription}>{tracker.downloadCount > -1 ? tracker.downloadCount : 'N/A'}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        }
      </div>
    );
  }
}

export default TrackerGroup;
