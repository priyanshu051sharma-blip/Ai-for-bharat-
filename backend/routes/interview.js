const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { dbRun, dbGet, dbAll } = require('../utils/database');

const router = express.Router();

// Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all interviews
router.get('/', verifyToken, async (req, res) => {
  try {
    const interviews = await dbAll(db, `SELECT * FROM interviews WHERE user_id = ? ORDER BY interview_date DESC`, [req.userId]);
    res.json(interviews || []);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get upcoming interviews
router.get('/upcoming', verifyToken, async (req, res) => {
  try {
    const interviews = await dbAll(db, 
      `SELECT * FROM interviews WHERE user_id = ? AND status = 'scheduled' ORDER BY interview_date ASC`, 
      [req.userId]
    );
    res.json(interviews || []);
  } catch (error) {
    console.error('Error fetching upcoming:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get completed interviews
router.get('/completed', verifyToken, async (req, res) => {
  try {
    const interviews = await dbAll(db, 
      `SELECT * FROM interviews WHERE user_id = ? AND status = 'completed' ORDER BY interview_date DESC`, 
      [req.userId]
    );
    res.json(interviews || []);
  } catch (error) {
    console.error('Error fetching completed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Schedule interview
router.post('/schedule', verifyToken, async (req, res) => {
  try {
    const { interview_title, interview_type, interview_date, duration_minutes, company_name, interviewer_name } = req.body;

    if (!interview_title || !interview_date) {
      return res.status(400).json({ message: 'Title and date required' });
    }

    const result = await dbRun(db, 
      `INSERT INTO interviews (user_id, interview_title, interview_type, interview_date, duration_minutes, company_name, interviewer_name, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'scheduled')`,
      [req.userId, interview_title, interview_type || 'mock', interview_date, duration_minutes || 30, company_name, interviewer_name]
    );

    res.status(201).json({ id: result.lastID, message: 'Interview scheduled' });
  } catch (error) {
    console.error('Error scheduling:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update interview status
router.put('/:interviewId/status', verifyToken, async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { status, score, feedback } = req.body;

    if (!status) return res.status(400).json({ message: 'Status required' });

    await dbRun(db, 
      `UPDATE interviews SET status = ?, score = ?, feedback = ? WHERE id = ? AND user_id = ?`,
      [status, score, feedback, interviewId, req.userId]
    );

    res.json({ message: 'Interview updated' });
  } catch (error) {
    console.error('Error updating:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reschedule interview
router.put('/:interviewId/reschedule', verifyToken, async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { interview_date } = req.body;

    if (!interview_date) return res.status(400).json({ message: 'New date required' });

    await dbRun(db, 
      `UPDATE interviews SET interview_date = ?, status = 'scheduled' WHERE id = ? AND user_id = ?`,
      [interview_date, interviewId, req.userId]
    );

    res.json({ message: 'Interview rescheduled' });
  } catch (error) {
    console.error('Error rescheduling:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete interview
router.delete('/:interviewId', verifyToken, async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interview = await dbGet(db, `SELECT id FROM interviews WHERE id = ? AND user_id = ?`, [interviewId, req.userId]);
    if (!interview) return res.status(404).json({ message: 'Not found' });

    await dbRun(db, `DELETE FROM interviews WHERE id = ? AND user_id = ?`, [interviewId, req.userId]);
    res.json({ message: 'Interview cancelled' });
  } catch (error) {
    console.error('Error cancelling:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get interview responses
router.get('/:interviewId/responses', verifyToken, async (req, res) => {
  try {
    const responses = await dbAll(db, 
      `SELECT * FROM interview_responses WHERE interview_id = ? AND user_id = ? ORDER BY question_number ASC`,
      [req.params.interviewId, req.userId]
    );
    res.json(responses || []);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save interview response
router.post('/:interviewId/responses', verifyToken, async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { question_number, question_text, answer_text, audio_file_path, ai_feedback, answer_score } = req.body;

    if (!question_text || !answer_text) {
      return res.status(400).json({ message: 'Question and answer required' });
    }

    const result = await dbRun(db, 
      `INSERT INTO interview_responses (interview_id, user_id, question_number, question_text, answer_text, audio_file_path, ai_feedback, answer_score)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [interviewId, req.userId, question_number, question_text, answer_text, audio_file_path, ai_feedback, answer_score || 0]
    );

    res.status(201).json({ id: result.lastID, message: 'Response saved' });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update response
router.put('/responses/:responseId', verifyToken, async (req, res) => {
  try {
    const { responseId } = req.params;
    const { answer_text, audio_file_path, ai_feedback, answer_score } = req.body;

    await dbRun(db, 
      `UPDATE interview_responses SET answer_text = ?, audio_file_path = ?, ai_feedback = ?, answer_score = ? WHERE id = ? AND user_id = ?`,
      [answer_text, audio_file_path, ai_feedback, answer_score, responseId, req.userId]
    );

    res.json({ message: 'Response updated' });
  } catch (error) {
    console.error('Error updating:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get mock results
router.get('/mock/results', verifyToken, async (req, res) => {
  try {
    const mockInterviews = await dbAll(db, 
      `SELECT i.*, COUNT(ir.id) as total_questions, AVG(ir.answer_score) as average_score
       FROM interviews i
       LEFT JOIN interview_responses ir ON i.id = ir.interview_id
       WHERE i.user_id = ? AND i.interview_type = 'mock'
       GROUP BY i.id
       ORDER BY i.created_at DESC`,
      [req.userId]
    );
    res.json(mockInterviews || []);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create mock session
router.post('/mock/create', verifyToken, async (req, res) => {
  try {
    const { interview_title, interview_date, duration_minutes } = req.body;

    if (!interview_title) return res.status(400).json({ message: 'Title required' });

    const result = await dbRun(db, 
      `INSERT INTO interviews (user_id, interview_title, interview_type, interview_date, duration_minutes, status)
       VALUES (?, ?, 'mock', ?, ?, 'scheduled')`,
      [req.userId, interview_title, interview_date || new Date().toISOString(), duration_minutes || 30]
    );

    res.status(201).json({ id: result.lastID, message: 'Mock session created' });
  } catch (error) {
    console.error('Error creating:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
