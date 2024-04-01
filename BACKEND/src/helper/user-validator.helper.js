const { check } = require('express-validator');



exports.updateUserValidator = [
    check('id', 'The ID is required.').not().isEmpty(),
    check('name', 'The Name is Required.').not().isEmpty(),
];

exports.deleteUserValidator = [
    check('id', 'The ID is required.').not().isEmpty(),
]