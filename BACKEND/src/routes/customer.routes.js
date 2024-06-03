const express = require('express');
const customerController = require('../controllers/customer.controller');
const multer = require('multer');

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess, OnlyEditorAdminCanAccess } = require('../middleware/admin.midlleware');
const {uploadMultipleMiddleware} = require('../middleware/update.middlleware');
const router = express.Router();







router.post('/',auth,OnlyEditorAdminCanAccess,uploadMultipleMiddleware,customerController.createCustomer);
router.get('/',auth,OnlyEditorAdminCanAccess, customerController.getAllCustomers);
router.get('/customers-branch',auth,OnlyEditorAdminCanAccess, customerController.getAllCustomersByBranch);
router.get('/:id',auth,OnlyEditorAdminCanAccess, customerController.getCustomerById);
router.put('/:id',auth,OnlyEditorAdminCanAccess, customerController.updateCustomer);
router.delete('/:id',auth,OnlyEditorAdminCanAccess, customerController.deleteCustomer);

module.exports = router;