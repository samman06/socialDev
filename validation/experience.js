const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateLoginInput = data => {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.company = !isEmpty(data.company) ? data.company : "";
    data.from = !isEmpty(data.from) ? data.from : "";


    if (validator.isEmpty(data.title)) {
        errors.title = "title is required"
    }

    if (validator.isEmpty(data.company)) {
        errors.company = "company is required"
    }
    if (validator.isEmpty(data.location)) {
        errors.location = "location is required"
    }

    if (validator.isEmpty(data.from)) {
        errors.from = "from date is required"
    }



    return {
        errors,
        isValid: isEmpty(errors),
    }
};
