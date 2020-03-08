const admin = require("firebase-admin");

var serviceAccount = require("./firebase-adminsdk-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lets-go-8871b.firebaseio.com/"
});

const db = admin.firestore();

module.exports = { admin, db };
