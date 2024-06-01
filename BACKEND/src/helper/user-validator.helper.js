const { check } = require('express-validator');



exports.updateUserValidator = [
    check('id', 'The ID is required.').not().isEmpty(),
    check('name', 'The Name is Required.').not().isEmpty(),
];

exports.createUserValidator = [
    check('name', 'The Name is Required.').not().isEmpty(),

    check('email', 'The Email is Required.').not().isEmpty(),
    check('email',"Plase enter a valid Email").isEmail(),
];

exports.deleteUserValidator = [
    check('id', 'The ID is required.').not().isEmpty(),
]