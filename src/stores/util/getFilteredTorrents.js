import { comparatorsMap, extractDomains } from 'stores/torrent-store';
import { FilterStates } from 'stores/prefs-store';
import Torrent from 'stores/torrent';

export default function getFilteredTorrents (torrentStore, prefsStore) {
  const regexp = new RegExp(torrentStore.textFilter, 'i'); // TODO: Escape!

  return torrentStore.torrents.filter((torrent) => {
    if (!passOnState(prefsStore.statusFilter, torrent)) return false;
    if (torrentStore.trackerFilter && !extractDomains(torrent).includes(torrentStore.trackerFilter)) return false;
    if (torrentStore.textFilter && !regexp.test(torrent.name)) return false;

    return true;
  }).sort(comparatorsMap[prefsStore.sortCriteria]);
}

function passOnState (state, torrent) {
  const status = torrent.status;

  switch (state) {
    case FilterStates.Active:
      return torrent.getPeersGettingFromUs() > 0 || torrent.getPeersSendingToUs() > 0 || torrent.getWebseedsSendingToUs() > 0 || torrent.isChecking;
    case FilterStates.Seeding:
      return (status === Torrent.STATUS_SEED) || (status === Torrent.STATUS_SEED_WAIT);
    case FilterStates.Downloading:
      return (status === Torrent.STATUS_DOWNLOAD) || (status === Torrent.STATUS_DOWNLOAD_WAIT);
    case FilterStates.Paused:
      return torrent.isStopped;
    case FilterStates.Finished:
      return torrent.isFinished;
    default:
      return true;
  }
}
