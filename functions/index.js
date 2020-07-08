const functions = require('firebase-functions');
const admin = require('firebase-admin');
const utils = require('./utils');

const serviceAccount = require('./beach-e3b8a-firebase-adminsdk-yoi5k-c8b0f4d07f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://beach-e3b8a.firebaseio.com'
});

const db = admin.database();

exports.getBeachesByState = functions.https.onRequest((request, response) => {

  const defaultState = utils.sanitizeState('al');

  let { state } = request.query;

  state = utils.sanitizeState(state) || defaultState;

  const ref = db.ref(`beaches/${state}`);
  
  return ref.once('value', snapshot => {
    const beaches = snapshot.val();
    return beaches ? response.send(beaches) : response.status(404).send();
  });
});

exports.getBeachesByNameAndState = functions.https.onRequest((request, response) => {
  
  const defaultState = utils.sanitizeState('al');

  let { state, beachName } = request.query;

  state = utils.sanitizeState(state) || defaultState;
  beachName = utils.sanitizeBeachName(beachName);

  const ref = db.ref(`beaches/${state}/${beachName}`);
  
  return ref.once('value', snapshot => {
    const beaches = snapshot.val();
    return beaches ? response.send(beaches) : response.status(404).send();
  });
});
