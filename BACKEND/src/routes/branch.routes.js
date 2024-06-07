const express = require('express');
const branchController = require('../controllers/branch.controller');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess, OnlyEditorAdminCanAccess } = require('../middleware/admin.midlleware');


router.post('/',auth, branchController.addBranch,);
router.get('/', auth,branchController.getBranch);

router.put('/:id',auth, branchController.getBranchById);
router.delete('/:id',auth, branchController.deleteBranch);




    








module.exports = router;