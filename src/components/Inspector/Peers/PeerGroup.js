import React, { Component } from 'react';
import { themr } from 'react-css-themr';

import { speedBps } from 'util/formatters';

const flagMap = {
  'O': 'Optimistic unchoke',
  'D': 'Downloading from this peer',
  'd': "We would download from this peer if they'd let us",
  'U': 'Uploading to peer',
  'u': "We would upload to this peer if they'd ask",
  'K': "Peer has unchoked us, but we're not interested",
  '?': "We unchoked this peer, but they're not interested",
  'E': 'Encrypted Connection',
  'H': 'Peer was discovered through Distributed Hash Table (DHT)',
  'X': 'Peer was discovered through Peer Exchange (PEX)',
  'I': 'Peer is an incoming connection',
  'T': 'Peer is connected via uTP',
};

function formatPeerFlag(flag) {
  const flagExplanation = flagMap[flag];

  if (!flagExplanation) {
    return String(flag);
  }

  return `${flag}: ${flagExplanation}`;
}

@themr('Peers')
class PeerGroup extends Component {
  render() {
    const { theme, peers } = this.props;

    return (
      <div>
        {peers.length > 0 &&
          <table className={theme.peerList}>
            <thead>
              <tr>
                <th className={theme.encryptedCol} />
                <th className={theme.upCol}>Up</th>
                <th className={theme.downCol}>Down</th>
                <th className={theme.percentCol}>%</th>
                <th className={theme.statusCol}>Status</th>
                <th className={theme.addressCol}>Address</th>
                <th className={theme.clientCol}>Client</th>
              </tr>
            </thead>
            <tbody>
              {peers.map((peer, index) => (
                <tr key={index} className={theme.peerRow}>
                  <td>{peer.isEncrypted && <div className={theme.lockImage} title='Encrypted Connection' />}</td>
                  <td>{peer.isUploadingTo && speedBps(peer.rateToPeer)}</td>
                  <td>{peer.isDownloadingFrom && speedBps(peer.rateToClient)}</td>
                  <td className={theme.percentCol}>{`${Math.floor(peer.progress * 100)}%`}</td>
                  <td>{[...peer.flagStr].map((flag) => <span key={flag} title={formatPeerFlag(flag)}>{flag}</span>)}</td>
                  <td>{peer.address}</td>
                  <td>{peer.clientName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default PeerGroup;
