import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../database/db';

const router = Router();

router.get('/events', (_req, res) => {
  db.all('SELECT * FROM timeline_events ORDER BY date DESC', (err: any, events: any) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    return res.json({ events });
  });
});

router.get('/events/:id', (req, res) => {
  db.get('SELECT * FROM timeline_events WHERE id = ?', [req.params.id], (err: any, event: any) => {
    if (err) {
      return res.status(500).js on({ error: 'Database error' });
    }
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return res.json({ event });
  });
});

router.get('/events/category/:category', (req, res) => {
  db.all('SELECT * FROM timeline_events WHERE category = ? ORDER BY date DESC', [req.params.category], (err: any, events: any) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    return res.json({ events });
  });
});

router.post('/events', (req, res) => {
  const { name, date, category, location, time, attendees, performers, duration, description, photo_url } = req.body;
  const id = uuidv4();

  console.log('Creating timeline event:', { id, name, date, category });

  db.run(
    'INSERT INTO timeline_events (id, name, date, category, location, time, attendees, performers, duration, description, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [id, name, date, category, location, time, attendees, performers, duration, description, photo_url],
    function(err: any) {
      if (err) {
        console.error('Database error creating event:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      console.log('Event created successfully:', id);
      return res.status(201).json({ id, message: 'Event created successfully' });
    }
  );
});

router.put('/events/:id', (req, res) => {
  const { name, date, category, location, time, attendees, performers, duration, description, photo_url } = req.body;

  db.run(
    'UPDATE timeline_events SET name = ?, date = ?, category = ?, location = ?, time = ?, attendees = ?, performers = ?, duration = ?, description = ?, photo_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [name, date, category, location, time, attendees, performers, duration, description, photo_url, req.params.id],
    function(err: any) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }
      return res.json({ message: 'Event updated successfully' });
    }
  );
});

router.delete('/events/:id', (req, res) => {
  db.run('DELETE FROM timeline_events WHERE id = ?', [req.params.id], function(err: any) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return res.json({ message: 'Event deleted successfully' });
  });
});

export default router; 