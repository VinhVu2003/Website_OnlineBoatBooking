const multer = require('multer');
const path = require('path');

// Thiết lập bộ nhớ lưu trữ
// Thiết lập bộ nhớ lưu trữ
const storage = multer.diskStorage({
  destination: 'D:\\Nam4Ki1\\Doan4\\DA4\\FrontEnd\\datthuyen\\public\\assets\\img', // Thư mục lưu trữ file đã upload
  filename: function (req, file, cb) {
    // Giữ tên file gốc và thêm timestamp để tránh xung đột
    const originalName = path.parse(file.originalname).name; // Lấy tên file gốc mà không có phần mở rộng
    const extension = path.extname(file.originalname); // Lấy phần mở rộng của file
    const uniqueSuffix = Date.now(); // Thêm timestamp để đảm bảo tính duy nhất
    cb(null, `${originalName}-${uniqueSuffix}${extension}`); // Tạo tên file mới
  }
});

// Hàm kiểm tra loại file
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp|bmp|svg|tiff|psd|eps|ai|indd|raw|cr2|nef|orf|sr2|arw|rw2|dng|pef|raf|mrw|erf|srw|k25|kdc|dcr|drf|eip|raf|rwz|srz|x3f|3fr|fff|iiq|mef|mos|mrw|nx2|orf|pef|raf|raw|rw2|rwz|sr2|srf|srw|x3f/; // Cho phép tất cả các loại ảnh
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Kiểm tra phần mở rộng file
  const mimetype = filetypes.test(file.mimetype); // Kiểm tra định dạng file (mime)

  if (mimetype && extname) {
    return cb(null, true); // Nếu đúng định dạng, cho phép upload
  } else {
    cb('Lỗi: Chỉ cho phép hình ảnh!'); // Báo lỗi nếu không đúng định dạng
  }
}

// Khởi tạo middleware upload
const upload = multer({
  storage: storage, // Sử dụng bộ nhớ đã định nghĩa ở trên
  limits: { fileSize: 10000000 }, // Giới hạn kích thước file (10MB)
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb); // Kiểm tra loại file trước khi upload
  }
}).array('files', 10); // 'myImages' là tên field chứa file cần upload, tối đa 10 file

// Xuất middleware upload để sử dụng trong file khác
module.exports = upload;
