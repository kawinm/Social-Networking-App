const functions = require("firebase-functions");

const app = require("express")();

const cors = require("cors");
app.use(cors());

const {
    getAllScreams,
    postOneScream,
    getScream,
    commentOnScream,
    likeScream,
    unlikeScream,
    deleteScream
} = require("./handlers/screams");

const {
    signUp,
    login,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser
} = require("./handlers/users");

const FBAuth = require("./util/fbAuth");

//Screams route
app.get("/scream", getAllScreams);
app.post("/scream", FBAuth, postOneScream);
app.get("/scream/:screamId", getScream);
app.post("/scream/:screamId/comment", FBAuth, commentOnScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);

//Users route
app.post("/signup", signUp);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.region("asia-east2").https.onRequest(app);
