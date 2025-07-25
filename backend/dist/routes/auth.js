"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../database/db"));
const router = (0, express_1.Router)();
router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        db_1.default.get('SELECT * FROM users WHERE username = ? AND is_active = 1', [username], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const isValidPassword = await bcryptjs_1.default.compare(password, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, process.env['JWT_SECRET'] || 'fallback-secret');
            db_1.default.run('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);
            return res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name
                }
            });
        });
        return;
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});
router.get('/me', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env['JWT_SECRET'] || 'fallback-secret');
        db_1.default.get('SELECT id, username, email, first_name, last_name FROM users WHERE id = ?', [decoded.userId], (err, user) => {
            if (err || !user) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            return res.json({ user });
        });
        return;
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map