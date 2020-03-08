const { db } = require("../util/admin");

exports.getAllScreams = (req, res) => {
    db.collection("screams")
        .orderBy("createdAt", "desc")
        .get()
        .then(data => {
            let screams = [];
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    userImage: doc.data().userImage
                });
            });
            return res.json(screams);
        })
        .catch(err => console.error(err));
};

exports.postOneScream = (req, res) => {
    if (req.body.body.trim() === "") {
        return res.status(400).json({ body: "Body must not be empty " });
    }

    const newScream = {
        body: req.body.body,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0
    };

    db.collection("screams")
        .add(newScream)
        .then(doc => {
            const resScream = newScream;
            resScream.screamId = doc.id;
            return res.json(resScream);
        })
        .catch(err => {
            res.status(500).json({ error: `something went wrong` });
            console.error(err);
        });
};

exports.getScream = (req, res) => {
    let screamData = {};
    db.doc(`/screams/${req.params.screamId}`)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Scream not found" });
            }
            screamData = doc.data();
            screamData.screamId = doc.id;
            return db
                .collection("comments")
                .orderBy("createdAt", "desc")
                .where("screamId", "==", req.params.screamId)
                .get();
        })
        .then(data => {
            screamData.comments = [];
            if (data.empty) {
                console.log("No matching documents.");
                return;
            }
            data.forEach(doc => {
                screamData.comments.push(doc.data());
            });
            return res.json(screamData);
        })
        .catch(err => {
            res.status(500).json({ error: `something went wrong` });
            console.error(err);
        });
};

exports.commentOnScream = (req, res) => {
    if (req.body.body.trim() === "") {
        return res.status(400).json({ error: "Must not be empty" });
    }

    const newComment = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        screamId: req.params.screamId,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl
    };

    db.doc(`/scream/${req.params.screams}`)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Scream not found " });
            }
            return db.collection("comments").add(newComment);
        })
        .then(() => {
            return res.json(newComment);
        })
        .catch(err => {
            res.status(500).json({ error: `something went wrong` });
            console.error(err);
        });
};

exports.likeScream = (req, res) => {
    const likeDoc = db
        .collection("likes")
        .where("userHandle", "==", req.user.handle)
        .where("screamId", "==", req.params.screamId)
        .limit(1);

    const screamDocument = db.doc(`/screams/${req.params.screamId}`);

    let screamData = {};

    screamDocument
        .get()
        .then(doc => {
            if (!doc.exists) {
                screamData = doc.data();
                screamDocument.screamId = doc.id;
                return likeDoc.get();
            } else {
                return res.status(400).json({ error: "Scream not found " });
            }
        })
        .then(data => {
            if (data.empty) {
                return db
                    .collection("likes")
                    .add({
                        screamId: req.params.screamId,
                        userHandle: req.user.handle
                    })
                    .then(() => {
                        screamData.likeCount++;
                        return screamDocument.update({
                            likeCount: screamData.likeCount
                        });
                    })
                    .then(() => {
                        return res.json(screamData);
                    });
            } else {
                return res.status(400).json({ error: "Scream already liked " });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.code });
            console.error(err);
        });
};

exports.unlikeScream = (req, res) => {
    const likeDocument = db
        .collection("likes")
        .where("userHandle", "==", req.user.handle)
        .where("screamId", "==", req.params.screamId)
        .limit(1);

    const screamDocument = db.doc(`/screams/${req.params.screamId}`);

    let screamData;

    screamDocument
        .get()
        .then(doc => {
            if (doc.exists) {
                screamData = doc.data();
                screamData.screamId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: "Scream not found" });
            }
        })
        .then(data => {
            if (data.empty) {
                return res.status(400).json({ error: "Scream not liked" });
            } else {
                return db
                    .doc(`/likes/${data.docs[0].id}`)
                    .delete()
                    .then(() => {
                        screamData.likeCount--;
                        return screamDocument.update({
                            likeCount: screamData.likeCount
                        });
                    })
                    .then(() => {
                        return res.json(screamData);
                    });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};
// Delete a scream
exports.deleteScream = (req, res) => {
    const document = db.doc(`/screams/${req.params.screamId}`);
    document
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Scream not found" });
            }
            if (doc.data().userHandle !== req.user.handle) {
                return res.status(403).json({ error: "Unauthorized" });
            } else {
                return document.delete();
            }
        })
        .then(() => {
            return res.json({ message: "Scream deleted successfully" });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};
