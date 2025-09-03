const dotenv = require('dotenv');
dotenv.config();

exports.login = (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    req.session.isLoggedIn = true;
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: '账号或密码错误' });
  }
};
