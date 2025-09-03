// 登录态校验中间件
module.exports = function requireLogin(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }
  return res.status(401).json({ success: false, message: '未登录或会话已过期' });
}
