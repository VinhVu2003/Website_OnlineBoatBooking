const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Centralized upload folder configuration with cross-platform path handling
const UPLOAD_FOLDERS = {
  boat: 'D:/Nam4Ki1/Doan4/DA4/FrontEnd/datthuyen/public/assets/img/boat', 
  room: 'D:/Nam4Ki1/Doan4/DA4/FrontEnd/datthuyen/public/assets/img/room', 
  introduceBoat: path.join(__dirname, '../uploads/introduceBoat'), 
  default: path.resolve(__dirname, '../public/assets/default')
};

// Utility function to ensure directory exists
const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Create dynamic upload storage configuration
const createDynamicStorage = (destination) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      ensureDirectoryExists(destination);
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const originalName = path.parse(file.originalname).name
        .replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize filename
      const extension = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${originalName}-${uniqueSuffix}${extension}`);
    }
  });
};

// File type validation
const createFileFilter = (allowedTypes) => {
  return function (req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;

    const isAllowedExtension = allowedTypes.test(extension);
    const isAllowedMimeType = allowedTypes.test(mimeType);

    if (isAllowedExtension && isAllowedMimeType) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed types do not match.'), false);
    }
  };
};

// Create upload middleware with flexible configuration
const createUploadMiddleware = (options = {}) => {
  // Default configuration
  const defaultConfig = {
    destination: UPLOAD_FOLDERS.default,
    maxFiles: 10,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: /jpeg|jpg|png|gif|webp|bmp|svg/i
  };

  // Merge provided options with default configuration
  const config = { ...defaultConfig, ...options };

  // Create upload middleware
  return multer({
    storage: createDynamicStorage(config.destination),
    limits: { 
      fileSize: config.maxFileSize,
      files: config.maxFiles
    },
    fileFilter: createFileFilter(config.allowedTypes)
  }).array('files', config.maxFiles);
};

// Predefined upload middlewares for different use cases
const uploadMiddlewares = {
  boatImage: createUploadMiddleware({
    destination: UPLOAD_FOLDERS.boat,
    maxFiles: 5,
    allowedTypes: /jpeg|jpg|png|gif|webp|bmp|svg/i
  }),

  roomImage: createUploadMiddleware({
    destination: UPLOAD_FOLDERS.room,
    maxFiles: 5,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: /jpeg|jpg|png|gif|webp|bmp|svg/i
  }),
  introduceBoatImage: createUploadMiddleware({
    destination: UPLOAD_FOLDERS.introduceBoat,
    maxFiles: 5,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: /jpeg|jpg|png|gif|webp|bmp|svg/i
  }),

  document: createUploadMiddleware({
    destination: UPLOAD_FOLDERS.document,
    maxFiles: 3,
    allowedTypes: /pdf|doc|docx|txt/i
  }),

  default: createUploadMiddleware()
};

// Process upload with comprehensive error handling and response
const processUpload = (uploadMiddleware) => {
    return (req, res, next) => {
      uploadMiddleware(req, res, function(err) {
        // Multer error handling
        if (err instanceof multer.MulterError) {
          return res.status(400).json({
            success: false,
            message: err.code === 'LIMIT_FILE_SIZE' 
              ? 'File quá lớn. Vui lòng tải lên file nhỏ hơn.' 
              : 'Lỗi upload file'
          });
        }
  
        // Other errors (file type, etc.)
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message || 'Lỗi không xác định trong quá trình upload'
          });
        }
  
        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'Không có file nào được upload'
          });
        }

        // Process and return only filenames
        const fileNames = req.files.map(file => file.filename);
        // const fullPaths = fileNames.map(name => `http://localhost:5000/uploads/introduceBoat/${path.basename(name)}`); // Thay 'yourdomain.com' bằng tên miền của bạn

        res.json({
          success: true,
          message: `Đã upload thành công ${fileNames.length} file`,
          fileNames: fileNames,
          // fullPaths: fullPaths
        });
      });
    };
  };

module.exports = {
  createUploadMiddleware,
  uploadMiddlewares,
  processUpload,
  UPLOAD_FOLDERS
};