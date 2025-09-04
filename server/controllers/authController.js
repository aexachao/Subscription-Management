const bcrypt = require('bcrypt');

// Get admin credentials from environment variables
const getAdminCredentials = () => {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    
    if (!username || !password) {
        throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file');
    }
    
    return { username, password };
};

// Login controller
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                message: '用户名和密码不能为空' 
            });
        }
        
        const adminCreds = getAdminCredentials();
        
        // Check if username matches
        if (username !== adminCreds.username) {
            return res.status(401).json({ 
                success: false, 
                message: '用户名或密码错误' 
            });
        }
        
        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, adminCreds.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: '用户名或密码错误' 
            });
        }
        
        // Set user session
        req.session.user = {
            username: adminCreds.username,
            role: 'admin'
        };
        
        res.json({ 
            success: true, 
            message: '登录成功',
            user: req.session.user
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: '服务器内部错误' 
        });
    }
};

// Logout controller
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: '登出失败' 
            });
        }
        
        res.json({ 
            success: true, 
            message: '登出成功' 
        });
    });
};

// Check authentication status
const checkAuth = (req, res) => {
    if (req.session && req.session.user) {
        res.json({ 
            success: true, 
            authenticated: true,
            user: req.session.user
        });
    } else {
        res.json({ 
            success: true, 
            authenticated: false 
        });
    }
};

module.exports = {
    login,
    logout,
    checkAuth
};
