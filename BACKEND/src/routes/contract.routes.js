const express = require('express');
const contractController = require('../controllers/contract.controller');
const router = express.Router();
const multer = require('multer');


// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });

const auth = require('../middleware/auth.middleware');
const { OnlyAdminCanAccess, OnlyEditorAdminCanAccess } = require('../middleware/admin.midlleware');
const { uploadSingleMiddleware, uploadMultipleMiddleware } = require('../middleware/update.middlleware');
router.get('/backups-contracts/:id',contractController.getAllContractsBackups);
router.get('/weekly-reports',auth,
  contractController.weeklyReportContract);
  
  router.get('/monthly-reports',auth,
    contractController.monthlyReportContract);
    
  router.get('/annual-reports',auth,
    contractController.annualReportContract);
router.get('/autoinc', auth, OnlyEditorAdminCanAccess,contractController.getAutoInc);
router.get('/count-status',auth, contractController.getContractCount);
router.get('/get-rental-history', auth,contractController.getRentalHistory);




router.post('/',auth, OnlyEditorAdminCanAccess, contractController.createContract,);
router.get('/', auth,OnlyEditorAdminCanAccess,contractController.getAllContracts);
router.get('/contract-branch',auth,OnlyEditorAdminCanAccess,contractController.getAllContractsByBranch);

router.put('/:id',auth,OnlyEditorAdminCanAccess, contractController.updateContract);
router.put('/update-image/:id',uploadMultipleMiddleware,auth,OnlyEditorAdminCanAccess, contractController.updateDamageCar);
router.delete('/:id',auth,OnlyAdminCanAccess, contractController.deleteContract);
router.get('/:id',auth,OnlyEditorAdminCanAccess,contractController.getContractById);
router.get('/features/:id',contractController.getFeaturesByContract);

router.get('/get-images/:contractId',contractController.getImages
)













module.exports = router;