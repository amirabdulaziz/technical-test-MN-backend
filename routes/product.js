const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/list-of-products:
 *   get:
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get('/list-of-products', (req, res) => {
    console.log('Received request for /api/list-of-products');

    const db = req.app.get("db");
    
    db.query('SELECT * FROM products', (err, results) => {
      if (err) {
        console.error('Query Error:', err);
        return res.status(500).json({ error: 'Failed to fetch products' });
      }
      console.log('Query Success:', results);
      res.json(results);
    });
  });

module.exports = router;
