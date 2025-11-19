import db from '../connectdb/db.js';
import validator from 'validator';
import { generateCode } from '../utils/generateCode.js';

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

// Create new short link
export const createLink = async (req, res) => {
  try {
    const { target_url, code } = req.body;

    if (!target_url || !validator.isURL(target_url, { require_protocol: true })) {
      return res.status(400).json({ error: 'Invalid or missing target_url. Include protocol (https://).' });
    }

    let finalCode = code;

    if (finalCode) {
      if (!CODE_REGEX.test(finalCode))
        return res.status(400).json({ error: 'Code must match [A-Za-z0-9]{6,8}' });

      const { rows: exists } = await db.query('SELECT 1 FROM links WHERE code=$1', [finalCode]);
      if (exists.length) return res.status(409).json({ error: 'Code already exists' });
    } else {
      // Generate unique code
      let tries = 0;
      while (tries < 6) {
        const c = generateCode();
        const { rows: exists } = await db.query('SELECT 1 FROM links WHERE code=$1', [c]);
        if (!exists.length) { finalCode = c; break; }
        tries++;
      }
      if (!finalCode) return res.status(500).json({ error: 'Failed to generate code' });
    }

    await db.query('INSERT INTO links(code, target_url) VALUES($1, $2)', [finalCode, target_url]);

    return res.status(201).json({
      code: finalCode,
      short_url: `${process.env.BASE_URL}/${finalCode}`,
      target_url
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// List all links
export const listLinks = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT code, target_url, total_clicks, last_clicked, created_at FROM links ORDER BY created_at DESC'
    );
    return res.status(200).json(rows); // ✅ must send rows directly, not wrapped in object
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};


// Get link stats
export const getLinkStats = async (req, res) => {
  try {
    const { code } = req.params;
    const { rows } = await db.query(
      'SELECT code, target_url, total_clicks, last_clicked, created_at FROM links WHERE code=$1',
      [code]
    );

    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(rows[0]);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Delete link
export const deleteLink = async (req, res) => {
  try {
    const { code } = req.params;
    const { rowCount } = await db.query('DELETE FROM links WHERE code=$1', [code]);
    if (!rowCount) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
