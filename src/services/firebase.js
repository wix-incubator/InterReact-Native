// this works with the old firebase api v2.0 (is supported on RN)

import _ from 'lodash';
import Firebase from 'firebase';
import initData from './initData';
const FIREBASE_ENDPOINT = 'https://interactive-adf11.firebaseio.com';

const defaultSettings = {
  online: true
};

class FirebaseService {
  constructor() {
    // autobind(this);
    this.firebaseApp = null;
    // this.connect();
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
      this.confNode = null;
      this.firebaseApp.off();
      this.firebaseApp = null;
    }
  }

  async connect(confId) {
    this.confId = confId;
    this.firebaseApp = new Firebase(FIREBASE_ENDPOINT);
    this.confNode = this.firebaseApp.child(`confs/${this.confId}`);

    // return new Promise((resolve, reject) => {
    //   this.firebaseApp.authWithCustomToken(token, (error, authData) => {
    //     if (error) { reject(error); }
    //     else {
    //
    //       // const node = this.firebaseApp.child(`sites/${siteId}/installed`);
    //       // node.once('value', (data) => resolve(!!data.val()));
    //     }
    //   });
    // });
  }

  // return a promise
  readConf() {
    if (!this.confNode) { throw new Error('Conf node is not initialized'); }
    return this.confNode.once('value').then((snapshot) => {
      return snapshot.val()
    });
  }

  updateConf(data) {
    if (!this.confNode) { throw new Error('Conf node is not initialized'); }
    this.confNode.update(data);
  }

  listenToConfChanges(listener) {
    this.confNode.on('value', (snapshot) => {
      listener(snapshot.val());
    });
  }
}

export default new FirebaseService();
