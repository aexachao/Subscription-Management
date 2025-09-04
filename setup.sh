#!/bin/bash

echo "🚀 订阅管理系统设置脚本"
echo "=========================="
echo ""

# 检查是否在项目根目录
if [ ! -f "package.json" ] || [ ! -d "server" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

# 检查 .env 文件是否存在
if [ ! -f ".env" ]; then
    echo "📝 创建 .env 文件..."
    cat > .env << EOF
# Server Configuration
PORT=3001
NODE_ENV=development

# Session Configuration
SESSION_SECRET=$(openssl rand -base64 32)

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=CHANGE_THIS_PASSWORD

# Database Configuration
DB_PATH=./db/database.sqlite

# Exchange Rate API (Optional)
TIANAPI_KEY=your-tianapi-key-here

# Frontend Configuration
VITE_API_BASE_URL=http://localhost:3001/api
EOF
    echo "✅ .env 文件已创建"
    echo "⚠️  请编辑 .env 文件，设置您的用户名和密码"
    echo ""
fi

# 安装前端依赖
echo "📦 安装前端依赖..."
npm install

# 安装后端依赖
echo "📦 安装后端依赖..."
cd server
npm install
cd ..

# 生成加密密码
echo ""
echo "🔐 生成加密密码..."
echo "请运行以下命令生成加密密码："
echo "cd server && npm run generate-password"
echo ""

# 检查数据库
if [ ! -f "server/db/database.sqlite" ]; then
    echo "🗄️  初始化数据库..."
    cd server
    npm run db:init
    cd ..
    echo "✅ 数据库已初始化"
else
    echo "✅ 数据库已存在"
fi

echo ""
echo "🎉 设置完成！"
echo ""
echo "接下来的步骤："
echo "1. 编辑 .env 文件，设置您的用户名和密码"
echo "2. 运行 'cd server && npm run generate-password' 生成加密密码"
echo "3. 将生成的密码复制到 .env 文件的 ADMIN_PASSWORD 字段"
echo "4. 启动后端：cd server && npm start"
echo "5. 启动前端：npm run dev"
echo ""
echo "然后访问 http://localhost:5173/login 进行登录"
