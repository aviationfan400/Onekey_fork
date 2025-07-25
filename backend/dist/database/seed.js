"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("./db"));
async function seed() {
    const adminId = (0, uuid_1.v4)();
    const hashedPassword = await bcryptjs_1.default.hash(process.env['DEFAULT_ADMIN_PASSWORD'] || 'admin123', 12);
    db_1.default.run('INSERT OR IGNORE INTO users (id, username, email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)', [
        adminId,
        process.env['DEFAULT_ADMIN_USERNAME'] || 'admin',
        process.env['DEFAULT_ADMIN_EMAIL'] || 'on3keymusic@gmail.com',
        hashedPassword,
        'System',
        'Administrator'
    ], function (err) {
        if (err) {
            console.error('Error seeding admin user:', err);
        }
        else {
            console.log('Admin user seeded successfully');
        }
        process.exit(0);
    });
}
seed();
//# sourceMappingURL=seed.js.map