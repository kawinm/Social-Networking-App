const { admin, db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const {
    validateSignupData,
    validateLoginData,
    reduceUserDetails
} = require("../util/validators");

exports.signUp = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        handle: req.body.handle,
        type: req.body.type
    };

    const { valid, errors } = validateSignupData(newUser);

    if (!valid) {
        return res.status(400).json(errors);
    }

    const noImg = `noimg.png`;

    db.doc(`/users/${newUser.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res
                    .status(400)
                    .json({ handle: "This handle is already taken" });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        newUser.email,
                        newUser.password
                    );
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(token => {
            usertoken = token;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                type: newUser.type,
                createdAt: new Date().toISOString(),
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/Profile%20Images%2F${noImg}?alt=media`,
                userId: userId
            };
            db.doc(`/users/${newUser.handle}`).set(userCredentials);
            return res.status(201).json({ token });
        })
        .then(data => {
            return res.status(201).json({ usertoken });
        })
        .catch(err => {
            console.error(err);

            if (err.code === "auth/email-already-in-use") {
                return res
                    .status(400)
                    .json({ email: "Email is already in use" });
            } else {
                return res.status(500).json({ error: err.code });
            }
        });
};

let usertoken, userId;
exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLoginData(user);

    if (!valid) {
        return res.status(400).json(errors);
    }

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({ token });
        })
        .catch(err => {
            console.error(err);
            if (err.code === "auth/wrong-password") {
                return res
                    .status(403)
                    .json({ general: "Wrong credentials, please try again" });
            } else {
                return res.status(500).json({ error: err.code });
            }
        });
};

exports.uploadImage = (req, res) => {
    const BusBoy = require("busboy");
    const path = require("path");
    const os = require("os");
    const fs = require("fs");

    let folder = "Profile Images";

    const busboy = new BusBoy({ headers: req.headers });

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        console.log(mimetype);

        if (!mimetype.includes("image")) {
            return res.status(400).json({ error: "Wrong filetype submitted" });
        }

        let imageExtension = filename.split(".")[
            filename.split(".").length - 1
        ];
        imageFileName = `${Math.round(
            Math.random() * 1000000000000
        )}.${imageExtension}`;

        let filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };

        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
        admin
            .storage()
            .bucket(config.storageBucket)
            .upload(imageToBeUploaded.filepath, {
                destination: `${folder}/${imageFileName}`,
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToBeUploaded.mimetype
                    }
                }
            })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/Profile%20Images%2F${imageFileName}?alt=media`;
                return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
            })
            .then(() => {
                return res.json({ message: "Image uploaded successfully" });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ error: err.code });
            });
    });
    busboy.end(req.rawBody);
};

exports.uploadPostImage = (req, res) => {
    const BusBoy = require("busboy");
    const path = require("path");
    const os = require("os");
    const fs = require("fs");

    let folder = "Post Image";

    const busboy = new BusBoy({ headers: req.headers });

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        console.log(mimetype);

        if (!mimetype.includes("image")) {
            return res.status(400).json({ error: "Wrong filetype submitted" });
        }

        let imageExtension = filename.split(".")[
            filename.split(".").length - 1
        ];
        imageFileName = `${Math.round(
            Math.random() * 1000000000000
        )}.${imageExtension}`;

        let filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };

        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
        admin
            .storage()
            .bucket(config.storageBucket)
            .upload(imageToBeUploaded.filepath, {
                destination: `${folder}/${imageFileName}`,
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToBeUploaded.mimetype
                    }
                }
            })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/Post%20Image%2F${imageFileName}?alt=media`;
                res.set("Access-Control-Allow-Origin", "*");
                var data = {
                    imageUrl: imageUrl
                };
                return res.json(data);
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ error: err.code });
            });
    });
    busboy.end(req.rawBody);
};

exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);

    console.log(req.user.handle);
    db.doc(`/users/${req.user.handle}`)
        .update(userDetails)
        .then(() => {
            return res.json({ message: "Details added successfully" });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.getAuthenticatedUser = (req, res) => {
    let userData = {};

    db.doc(`/users/${req.user.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return db
                    .collection("likes")
                    .where(`userHandle`, "==", req.user.handle)
                    .get();
            }
            return res
                .status(500)
                .json({ error: `Database entry doesnt exists` });
        })
        .then(data => {
            userData.likes = [];
            data.forEach(doc => {
                userData.likes.push(doc.data());
            });
            return res.json(userData);
        })
        .catch(err => {
            res.status(500).json({ error: `something went wrong` });
            console.error(err);
        });
};

exports.createGroup = (req, res) => {
    var newGroup = {
        subject: req.body.subject,
        dept: req.body.dept,
        sem: req.body.sem,
        createdBy: req.user.handle,
        createdAt: new Date().toISOString()
    };

    db.collection("groups")
        .add(newGroup)
        .then(doc => {
            const resGroup = newGroup;
            resGroup.GroupId = doc.id;
            return res.json(resGroup);
        })
        .catch(err => {
            res.status(500).json({ error: `something went wrong` });
            console.error(err);
        });
};

exports.getAllGroups = (req, res) => {
    db.collection("groups")
        .where("dept", "==", `${req.user.dept}`)
        .orderBy("createdAt", "desc")
        .get()
        .then(data => {
            let groups = [];
            data.forEach(doc => {
                groups.push({
                    groupId: doc.id,
                    subject: doc.data().subject,
                    dept: doc.data().dept,
                    sem: doc.data().sem,
                    createdAt: doc.data().createdAt,
                    createdBy: doc.data().createdBy
                });
            });
            return res.json(groups);
        })
        .catch(err => console.error(err));
};
