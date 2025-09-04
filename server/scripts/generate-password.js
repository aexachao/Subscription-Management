#!/usr/bin/env node

const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔐 密码加密工具');
console.log('================\n');

rl.question('请输入您想要设置的密码: ', async (password) => {
  if (!password || password.trim().length < 6) {
    console.log('❌ 密码长度至少需要6个字符');
    rl.close();
    return;
  }

  try {
    console.log('\n正在加密密码...');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('\n✅ 密码加密成功！');
    console.log('\n请在您的 .env 文件中添加以下配置：');
    console.log('=====================================');
    console.log(`ADMIN_USERNAME=admin`);
    console.log(`ADMIN_PASSWORD=${hashedPassword}`);
    console.log('=====================================');
    console.log('\n⚠️  请妥善保管您的密码，不要泄露给他人！');
    
  } catch (error) {
    console.error('❌ 密码加密失败:', error.message);
  } finally {
    rl.close();
  }
});

rl.on('close', () => {
  console.log('\n👋 再见！');
  process.exit(0);
});
