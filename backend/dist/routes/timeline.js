"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../database/db"));
const router = (0, express_1.Router)();
router.get('/events', (_req, res) => {
    db_1.default.all('SELECT * FROM timeline_events ORDER BY date DESC', (err, events) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        return res.json({ events });
    });
});
router.get('/events/:id', (req, res) => {
    db_1.default.get('SELECT * FROM timeline_events WHERE id = ?', [req.params.id], (err, event) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        return res.json({ event });
    });
});
router.get('/events/category/:category', (req, res) => {
    db_1.default.all('SELECT * FROM timeline_events WHERE category = ? ORDER BY date DESC', [req.params.category], (err, events) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        return res.json({ events });
    });
});
router.post('/events', (req, res) => {
    const { name, date, category, location, time, attendees, performers, duration, description, photo_url } = req.body;
    const id = (0, uuid_1.v4)();
    db_1.default.run('INSERT INTO timeline_events (id, name, date, category, location, time, attendees, performers, duration, description, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, name, date, category, location, time, attendees, performers, duration, description, photo_url], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        return res.status(201).json({ id, message: 'Event created successfully' });
    });
});
router.put('/events/:id', (req, res) => {
    const { name, date, category, location, time, attendees, performers, duration, description, photo_url } = req.body;
    db_1.default.run('UPDATE timeline_events SET name = ?, date = ?, category = ?, location = ?, time = ?, attendees = ?, performers = ?, duration = ?, description = ?, photo_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [name, date, category, location, time, attendees, performers, duration, description, photo_url, req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        return res.json({ message: 'Event updated successfully' });
    });
});
router.delete('/events/:id', (req, res) => {
    db_1.default.run('DELETE FROM timeline_events WHERE id = ?', [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        return res.json({ message: 'Event deleted successfully' });
    });
});
exports.default = router;
//# sourceMappingURL=timeline.js.map