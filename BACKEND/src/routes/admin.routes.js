const express = require('express');
const router = express();

const auth = require('../middleware/auth.middleware');

const permissionController = require('../controllers/permission.controller');

const roleController = require('../controllers/role.controller');

const { OnlyAdminCanAccess } = require('../middleware/admin.midlleware');

const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator, storeRoleValidator } = require('../helper/admin-validator.helper');

// Authenticated Routes Starts Here (authorization token needed) -----------


// Permissions Routes

router.post('/add-permission', auth, OnlyAdminCanAccess, permissionAddValidator, permissionController.addPermission);
router.get('/get-permissions', auth, OnlyAdminCanAccess, permissionController.getPermission);
router.delete('/delete-permission/:id', auth, OnlyAdminCanAccess, permissionDeleteValidator, permissionController.deletePermission);
router.get('/get-permission-by-id/:id', auth, OnlyAdminCanAccess, permissionController.getPermissionById);
router.put('/update-permission/:id', auth, OnlyAdminCanAccess, permissionUpdateValidator, permissionController.updatePermission);

// Roles Routes

router.post('/store-role', auth, OnlyAdminCanAccess, storeRoleValidator, roleController.storeRole);
router.get('/get-roles', auth, OnlyAdminCanAccess, roleController.getRoles);


module.exports = router;