// this works with the old firebase api v2.0 (is supported on RN)

import _ from 'lodash';
import Firebase from 'firebase';
import autobind from 'react-autobind';
import config from '../config';

const defaultSettings = {
  online: true
};

class FirebaseService {
  constructor() {
    autobind(this);
    this.firebaseApp = null;
    this.chatNode = null;
    this.onChatMsgInitCallback = null;
    this.onChatMsgAddedCallback = null;
  }
  isConnected(uid) {
    if (this.firebaseApp === null) { return false; }
    if (uid) {
      const user = this.firebaseApp.getAuth();
      if (user === null) { return false; }
      if (user.uid !== uid) { return false; }
    }
    return true;
  }
  disconnect() {
    if (this.firebaseApp !== null) {
      this.chatNode = null;
      this.onChatMsgInitCallback = null;
      this.onChatMsgAddedCallback = null;
      this.firebaseApp.off();
      // Firebase.goOffline();
      this.firebaseApp = null;
    }
  }
  async connect(endpoint, token, siteId) {
    this.firebaseApp = new Firebase(endpoint);
    return new Promise((resolve, reject) => {
      this.firebaseApp.authWithCustomToken(token, (error, authData) => {
        if (error) { reject(error); }
        else {
          const node = this.firebaseApp.child(`sites/${siteId}/installed`);
          node.once('value', (data) => resolve(!!data.val()));
        }
      });
    });
  }
  listenOnVisitorsUpdates(siteId, onVisitorsInit, onVisitorAdded, onVisitorChanged, onVisitorRemoved, onNewUnreadMessage) {
    if (!this.firebaseApp) return;
    const node = this.firebaseApp.child(`sites/${siteId}/visitors`);

    node.on('child_added', (data) => {
      onVisitorAdded(data.key(), data.val());
      const chatNode = this.firebaseApp.child(`chat/${siteId}/${data.key()}`);
      chatNode.off('child_added');
      chatNode.orderByChild('read').equalTo(false).on('child_added', () => onNewUnreadMessage(data.key()));
    });
    node.on('child_changed', (data) => onVisitorChanged(data.key(), data.val()));
    node.on('child_removed', (data) => onVisitorRemoved(data.key(), data.val()));
    node.limitToLast(config.settings.maxVisitorsToShow).once('value', (data) => onVisitorsInit(data.val()));
  }
  listenOnSettingsUpdates(siteId, onSettingsChanged) {
    if (!this.firebaseApp) return;
    const node = this.firebaseApp.child(`sites/${siteId}/settings`);
    node.on('value', (data) => onSettingsChanged(data.val()));
  }

  updateSettings(siteId, settings) {
    if (!this.firebaseApp) return;
    const node = this.firebaseApp.child(`sites/${siteId}/settings`);
    node.update(settings);
  }

  verifySettingsInitialized(siteId) {
    if (!this.firebaseApp) return;
    const node = this.firebaseApp.child(`sites/${siteId}/settings`);
    node.once('value', (data) => {
      const currentSettings = data.val() || {};
      const updatesToSettings = _.omitBy(defaultSettings, (value, key) => _.has(currentSettings, key));
      if (!_.isEmpty(updatesToSettings)) { this.updateSettings(siteId, updatesToSettings); }
    });
  }

  markSiteAsInstalled(siteId, installed) {
    if (!this.firebaseApp) return;
    const node = this.firebaseApp.child(`sites/${siteId}/installed`);
    node.set(installed);
    if (installed) { this.verifySettingsInitialized(siteId); }
  }

  listenOnNewChat(siteId, visitorId, onChatMsgInit, onChatMsgAdded) {
    if (!this.firebaseApp) return;
    if (this.chatNode) {
      if (this.onChatMsgInitCallback) { this.chatNode.off('value', this.onChatMsgInitCallback); }
      if (this.onChatMsgAddedCallback) { this.chatNode.off('child_added', this.onChatMsgAddedCallback); }
    }
    this.onChatMsgInitCallback = (data) => onChatMsgInit(data.val());
    this.onChatMsgAddedCallback = (data) => onChatMsgAdded(data.key(), data.val());
    this.chatNode = this.firebaseApp.child(`chat/${siteId}/${visitorId}`);
    this.chatNode.on('child_added', this.onChatMsgAddedCallback);
    this.chatNode.limitToLast(config.settings.maxOldChatsToShow).once('value', this.onChatMsgInitCallback);
  }

  sendChatMessage(message) {
    if (!this.chatNode) return;
    message.timestamp = Firebase.ServerValue.TIMESTAMP;
    this.chatNode.push(message);
  }

  clearUnreadMessages(siteId, visitorId) {
    const unreadMessagesNodes = this.firebaseApp.child(`chat/${siteId}/${visitorId}`).orderByChild('read').equalTo(false);
    this.firebaseApp.child(`chat/${siteId}/${visitorId}`).transaction((currentData) => {
      _.forEach(currentData, (messageNode) => messageNode.read = true);
      return currentData;
    });
  }
}

export default new FirebaseService();
