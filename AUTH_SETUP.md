# 认证系统设置说明

## 环境变量配置

在项目根目录创建 `.env` 文件，包含以下配置：

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=$2b$10$YourHashedPasswordHere

# Database Configuration
DB_PATH=./db/database.sqlite

# Exchange Rate API (Optional)
TIANAPI_KEY=your-tianapi-key-here

# Frontend Configuration
VITE_API_BASE_URL=http://localhost:3001/api
```

## 密码加密

使用 bcrypt 加密密码。在服务器目录下运行：

```bash
cd server
npm install
node -e "
const bcrypt = require('bcrypt');
const password = 'your-plain-text-password';
bcrypt.hash(password, 10).then(hash => {
  console.log('Hashed password:', hash);
  console.log('Copy this to your .env file as ADMIN_PASSWORD');
});
"
```

## 安装依赖

### 后端依赖
```bash
cd server
npm install
```

### 前端依赖
```bash
npm install
```

## 启动服务

### 启动后端
```bash
cd server
npm start
```

### 启动前端
```bash
npm run dev
```

## 登录

1. 访问 `http://localhost:5173/login`
2. 使用配置的用户名和密码登录
3. 登录成功后会自动跳转到主页

## 安全说明

- 生产环境中请使用强密码
- 定期更换 SESSION_SECRET
- 确保 HTTPS 在生产环境中启用
- 密码使用 bcrypt 加密存储
