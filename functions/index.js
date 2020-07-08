const functions = require('firebase-functions');
const admin = require('firebase-admin');
const utils = require('./utils');

const serviceAccount = require('./beach-e3b8a-firebase-adminsdk-yoi5k-c8b0f4d07f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://beach-e3b8a.firebaseio.com'
});

const db = admin.database();

exports.getBeachesByNameAndState = functions.https.onRequest((request, response) => {
  
  const defaultState = utils.sanitizeState('al');

  let { state, beachName } = request.query;

  state = utils.sanitizeState(state) || defaultState;
  beachName = utils.sanitizeBeachName(beachName);

  const ref = db.ref(`beaches/${state}/${beachName}`);

  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    response.set('Access-Control-Allow-Methods', 'GET');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    return response.status(204).send('');
  } else {
    return ref.once('value', snapshot => {
      const beaches = beachName ? { [beachName]: snapshot.val() } : snapshot.val();
      return snapshot.val() ? response.send(beaches) : response.status(404).send();
    });
  }
});
