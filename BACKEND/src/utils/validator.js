
const {check} = require('express-validator');


exports.creatCarValidator = [
    check('username','username is required').not().isEmpty(),
    check('email','please enter a valid email').normalizeEmail(
        {gmail_remove_dots: true}
    ),
    check('password','password is required').not().isEmpty()
    
]

