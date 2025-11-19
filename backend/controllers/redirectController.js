import db from '../connectdb/db.js'; // your database client

export const handleRedirect = async (req, res) => {
  const { code } = req.params;

  try {
    // Find the link
    const result = await db.query(
      'SELECT * FROM links WHERE code = $1',
      [code]
    );

    if (result.rows.length === 0) return res.status(404).send('Link not found');

    const link = result.rows[0];

    // Update clicks and last_clicked
    await db.query(
      'UPDATE links SET total_clicks = total_clicks + 1, last_clicked = NOW() WHERE code = $1',
      [code]
    );

    // Redirect
    res.redirect(link.target_url);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
