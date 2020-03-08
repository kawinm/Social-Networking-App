const isEmail = email => {
    //eslint-disable-next-line
    const regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email.match(regEx)) {
        return true;
    } else {
        return false;
    }
};

const isEmpty = abc => {
    if (abc.trim() === "") {
        return true;
    } else {
        return false;
    }
};

exports.validateSignupData = data => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = "Must not be empty";
    } else if (!isEmail(data.email)) {
        errors.email = "Must be a valid email address";
    }

    if (isEmpty(data.password)) errors.password = "Must not be empty";
    if (data.password !== data.confirmpassword) {
        errors.confirmpassword = "Passwords must be same";
    }
    if (isEmpty(data.handle)) errors.handle = "Must not be empty";

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.validateLoginData = data => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = "Must not be empty";
    }
    if (isEmpty(data.password)) {
        errors.password = "Must not be empty";
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.reduceUserDetails = data => {
    let userDetails = {};

    if (!isEmpty(data.bio)) {
        userDetails.bio = data.bio;
    }
    if (!isEmpty(data.sem)) {
        userDetails.sem = data.sem;
    }
    if (!isEmpty(data.dept)) {
        userDetails.dept = data.dept;
    }

    return userDetails;
};
