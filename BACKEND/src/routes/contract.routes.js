const express = require('express');
const contractController = require('../controllers/contract.controller');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess } = require('../middleware/admin.midlleware');


router.post('/', contractController.createContract,auth, OnlyAdminCanAccess,);
router.get('/', contractController.getAllContracts,auth, OnlyAdminCanAccess,);
router.put('/:id', contractController.updateContract,auth, OnlyAdminCanAccess,);
router.delete('/:id', contractController.deleteContract,auth, OnlyAdminCanAccess,);
router.get('/:id', contractController.getContractById,auth, OnlyAdminCanAccess,);




module.exports = router;