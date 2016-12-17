import { computed } from 'mobx';

import { size, timeInterval, formatStatus, formatError } from 'util/formatters';

export default class TorrentStats {
  constructor(torrents) {
    this.torrents = torrents;
    this.peers = [];
    this.trackers = [];
    this.files = [];
  }

  @computed get title() {
    if (this.torrents.length === 0) {
      return 'No Selection';
    }

    if (this.torrents.length === 1) {
      return this.torrents[0].title;
    }

    return `${this.torrents.length} Transfers Selected`;
  }

  // TODO: Maybe rename to totalHave (same for others) for better understanding
  @computed get have() {
    return size(this.torrents.reduce((totalSize, torrent) => totalSize + torrent.totalSize, 0));
  }

  @computed get available() {
    return this.torrents
      .filter((torrent) => !torrent.needsMetaData)
      .reduce((totalAvailable, torrent) => totalAvailable + torrent.have + torrent.desiredAvailable, 0);
  }

  @computed get sizeWhenDone() {
    return this.torrents
      .filter((torrent) => !torrent.needsMetaData)
      .reduce((totalSize, torrent) => totalSize + torrent.sizeWhenDone, 0);
  }

  @computed get upload() {
    return size(this.torrents.reduce((totalSize, torrent) => totalSize + torrent.uploadedEver, 0));
  }

  @computed get download() {
    return size(this.torrents.reduce((totalSize, torrent) => totalSize + torrent.downloadedEver, 0));
  }

  @computed get state() {
    const states = [...new Set(this.torrents.map((torrent) => torrent.status))];

    if (states.length === 0) {
      return 'None';
    }

    if (states.length === 1) {
      return formatStatus(this.torrents[0]);
    }

    return 'Mixed';
  }

  @computed get error() {
    const errors = [...new Set(this.torrents.map((torrent) => torrent.errorString).filter((errorString) => errorString.length > 0))];

    if (errors.length === 0) {
      return 'None';
    }

    if (errors.length === 1) {
      return errors[0];
    }

    return 'Mixed';
  }

  @computed get runningTime() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const baseline = this.torrents[0].startDate;
    const allPaused = this.torrents.every((torrent) => torrent.isStopped);
    const multiBaseline = this.torrents.some((torrent) => torrent.startDate !== baseline);

    if (allPaused) {
      return this.state;
    }

    if (multiBaseline) {
      return 'Mixed';
    }

    return timeInterval(Date.now() / 1000 - baseline);
  }

  @computed get remainingTime() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const baseline = this.torrents[0].eta;
    const multiBaseline = this.torrents.some((torrent) => torrent.eta !== baseline);

    if (multiBaseline) {
      return 'Mixed';
    }

    if (baseline < 0) {
      return 'Unknown';
    }

    return timeInterval(baseline);
  }

  @computed get lastActivity() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const baseline = this.torrents.reduce((lastActivityDate, torrent) => lastActivityDate < torrent.activityDate ? torrent.activityDate : lastActivityDate, -1);
    const elapsedSeconds = Date.now() / 1000 - baseline;

    if (elapsedSeconds < 0) {
      return 'None';
    }

    if (elapsedSeconds < 5) {
      return 'Active now';
    }

    return `${timeInterval(elapsedSeconds)} ago`;
  }
}
