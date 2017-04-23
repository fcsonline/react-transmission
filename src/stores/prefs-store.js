import {observable, action} from 'mobx';

export const PrefCookieKeys = {
  prefs: 'prefs',
  statusFilter: 'filter',
  sortCriteria: 'sort_method',
  sortDirection: 'sort_direction',
  compact: 'compact_display_state'
}

export const FilterStates = {
  All: 'all',
  Active: 'active',
  Seeding: 'seeding', 
  Downloading: 'downloading',
  Paused: 'paused',
  Finished: 'finished'
};

// can't guarantee iteration order
export function mapFilterStates (fn) {
  return ['all', 'active', 'seeding', 'downloading', 'paused', 'finished'].map(fn)
}

class PrefsStore {
  @observable statusFilter;
  @observable sortCriteria;
  @observable sortDirection;
  @observable compact;

  constructor(init) {
    this.rehydrate(init)
  }

  @action rehydrate({ statusFilter = -1, sortCriteria = 'name', sortDirection = '', compact = false } = {}) {
    this.statusFilter = statusFilter;
    this.sortCriteria = sortCriteria;
    this.sortDirection = sortDirection;
    this.compact = compact;
  }

  @action setStatusFilter(statusFilter) {
    this.statusFilter = statusFilter;
  }

  @action setSortCriteria(sortCriteria) {
    this.sortCriteria = sortCriteria;
  }

  @action setSortDirection(sortDirection) {
    this.sortDirection = sortDirection;
  }

  @action toggleCompact() {
    this.compact = !this.compact;
  }
}

export default PrefsStore;
