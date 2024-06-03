const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Function to ensure existence of the 'uploads' directory
const ensureUploadsDirectory = () => {
  const uploadDirectory = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }
};

// Function to configure multer storage
const configureStorage = () => {
  ensureUploadsDirectory(); // Ensure uploads directory exists
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
};

// Create multer upload instance
const upload = multer({ storage: configureStorage() });

// Custom file upload middleware for single file
const uploadSingleMiddleware = (req, res, next) => {
  upload.single('imagePath')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Retrieve uploaded file
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file was uploaded.' });
    }
    
    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: `Invalid file type: ${file.originalname}` });
    }

    if (file.size > maxSize) {
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: `File too large: ${file.originalname}` });
    }

    // Attach file to the request object
    req.file = file;

    // Proceed to the next middleware or route handler
    next();
  });
};

// Custom file upload middleware for multiple files
const uploadMultipleMiddleware = (req, res, next) => {
  upload.array('files', 5)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Retrieve uploaded files
    const files = req.files;
    if (!files) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }
    
    const errors = [];

    // Validate file types and sizes
    files.forEach((file) => {
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    // Handle validation errors
    if (errors.length > 0) {
      // Remove uploaded files
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      return res.status(400).json({ errors });
    }

    // Attach files to the request object
    req.files = files;

    // Proceed to the next middleware or route handler
    next();
  });
};





module.exports = {
  uploadSingleMiddleware,
  uploadMultipleMiddleware
};
