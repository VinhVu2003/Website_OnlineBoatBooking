// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Thêm cors middleware
const upload = require("./uploadHandler"); // Import upload middleware
const setupRoutes = require("./routes"); // Import routes setup
const sequelize = require("./config/database");
const app = express();
const http = require("http"); // Import http module
const { Server } = require("socket.io"); // Thêm socket.io


// Khởi động server
const server = http.createServer(app); // Tạo server HTTP

const io = new Server(server,{
  cors: {
    origin: 'http://localhost:3000', // Cho phép từ localhost:3000
    methods: ['GET', 'POST'],        // Cho phép các phương thức này
},
}); // Khởi tạo Socket.IO
// Socket.IO connection
io.on('connection', (socket) => {
  // console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const uploadRoutes = require("./routes/uploadRoutes");

// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cho phép truy cập từ frontend
  methods: 'GET,POST,PUT,DELETE', // Cho phép các phương thức cần thiết
  credentials: true // Cho phép chia sẻ cookies, nếu cần
}));

app.use(bodyParser.json());

// Định nghĩa các route
// Thiết lập routes
setupRoutes(app,io);

// Route for file upload
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    console.log("Uploaded files:", req.files); // Thay đổi để kiểm tra thông tin tệp
    if (err) {
      return res.status(500).send({ error: "File upload failed", details: err });
    } else if (!req.files || req.files.length === 0) { // Kiểm tra nếu không có file nào được chọn
      return res.status(400).send({ error: "No files selected" });
    } else {
      const fileNames = req.files.map(file => file.filename); // Lấy tên của tất cả các file đã tải lên
      return res.json({
        message: "Files uploaded successfully",
        fileNames: fileNames, // Trả về danh sách tên file
      });
    }
  });
});
app.use('/upload', uploadRoutes);

// Cấu hình truy cập tĩnh vào thư mục uploads
app.use('/uploads', express.static('uploads')); // Thêm dòng này để phục vụ tệp tĩnh từ thư mục uploads








// Khởi động server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await sequelize.authenticate();
  const host = process.env.HOST || 'localhost';  // Đảm bảo host mặc định là localhost
  const protocol = process.env.PROTOCOL || 'http';  // Đảm bảo protocol mặc định là http
  const url = `${protocol}://${host}:${PORT}`;
  console.log(`Server is running on ${url}`);
  try {
    // await sequelize.authenticate();
    console.log("Connected to SQL Server successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});



// Middleware để truyền io vào req
app.use((req, res, next) => {
  req.io = io; // Gán io vào req để sử dụng trong router
  next();
});