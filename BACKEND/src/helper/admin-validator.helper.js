const { check } = require('express-validator');

exports.permissionAddValidator = [
    check('permission_name', 'The Permission Name is required.').not().isEmpty(),
];

exports.permissionDeleteValidator = [
    check('id', 'The Permission ID is required.').not().isEmpty(),
];

exports.permissionUpdateValidator = [
    check('id', 'The Permission ID is required.').not().isEmpty(),
    check('permission_name', 'The Permission Name is required.').not().isEmpty()
];


exports.storeRoleValidator = [
    check('role_name', 'The Role Name is required.').not().isEmpty(),
    check('value', 'The Role Value is required.').not().isEmpty(),
];