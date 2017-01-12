import {observable, action} from 'mobx';

class ViewStore {
  @observable currentFilter = 'all';
  // TODO: Rename to selectedTorrentIds
  @observable selectedTorrents = [];
  @observable lastSelectedTorrent = null;
  @observable compact = false;
  @observable notificationsEnabled = false;

  @observable menus = {
    settings: false,
    torrent: false,
    sortBy: false,
    downloadRate: false,
    uploadRate: false,
  };

  @observable prompts = {
    rename: false,
    location: false,
  };

  @observable dialogs = {
    open: false,
    preferences: false,
    connection: false,
    statistics: false,
    about: false,
  };

  @observable isInspectorShown = false;

  @action toggleContextMenus() {
    Object.keys(this.menus).forEach((key) => this.menus[key] = false);
  }

  @action toggleSettingsContextMenu() {
    this.toggleContextMenus();
    this.dialogs.settings = !this.dialogs.settings;
  }

  @action toggleTorrentContextMenu() {
    this.toggleContextMenus();
    this.dialogs.torrent = !this.dialogs.torrent;
  }

  @action toggleContextMenu(menu) {
    this.menus[menu] = !this.menus[menu];
  }

  @action toggleSortByContextMenu() {
    this.isSortByContextMenuShown = !this.isSortByContextMenuShown;
  }

  @action toggleDownloadRateContextMenu() {
    this.isDownloadRateContextMenuShown = !this.isDownloadRateContextMenuShown;
  }

  @action toggleUploadRateContextMenu() {
    this.isUploadRateContextMenuShown = !this.isUploadRateContextMenuShown;
  }

  @action togglePrompt(id) {
    this.prompts[id] = !this.prompts[id];
  }

  @action toggleConnectionDialog(value) {
    this.dialogs.connection = value;
  }

  @action toggleDialog(dialog) {
    this.dialogs[dialog] = !this.dialogs[dialog];
  }

  @action toggleInspector() {
    this.isInspectorShown = !this.isInspectorShown;
  }

  @action toggleCompact() {
    this.compact = !this.compact;
  }

  @action setFilter(filter) {
    this.currentFilter = filter;
  }

  @action setSelected(id) {
    this.lastSelectedTorrent = id;
    this.selectedTorrents = [id];
  }

  @action toggleSelected(id) {
    const torrent = this.selectedTorrents.find((torrentId) => id === torrentId);

    this.lastSelectedTorrent = id;

    if (torrent) {
      this.selectedTorrents.remove(torrent);
      return;
    }

    this.selectedTorrents.push(id);
  }

  @action addSelectedRange(id, ids) {
    this.selectedTorrents = [...new Set(this.selectedTorrents.concat(ids))]; // Unique
    this.lastSelectedTorrent = id;
  }

  @action selectTorrents(torrentIds) {
    this.selectedTorrents = torrentIds;
  }

  // TODO: Does this method belong to view store? If we're adding more logic to
  // selectedTorrents array, maybe it's a good idea to create an observable
  // TorrentCollection
  isTorrentSelected(id) {
    return this.selectedTorrents.includes(id);
  }

  @action toggleNotificationsEnabled(enable) {
    this.notificationsEnabled = enable;
  }
}

export default ViewStore;
