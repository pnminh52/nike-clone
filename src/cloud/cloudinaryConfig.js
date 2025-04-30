const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary từ môi trường
cloudinary.config({
  cloud_name: 'dovbpv8ul',  // Thay bằng Cloud name của bạn
  api_key: '235481786647737',  // Thay bằng API key của bạn
  api_secret: 'tPl_7qlszAiJiM84YdF7ftoMXjM',  // Thay bằng API secret của bạn
});

module.exports = cloudinary;
