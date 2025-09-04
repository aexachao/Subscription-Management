const dotenv = require('dotenv');
dotenv.config();

exports.login = (req, res) => {
  const { username, password, remember } = req.body || {};
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    req.session.isLoggedIn = true;
    // 记住我：30天；否则为会话cookie
    if (remember) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      // 会话结束即失效
      req.session.cookie.expires = false;
    }
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: '账号或密码错误' });
  }
};

exports.me = (req, res) => {
  const isLoggedIn = !!(req.session && req.session.isLoggedIn);
  return res.json({ success: true, data: { isLoggedIn } });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
};
