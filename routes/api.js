const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/map', (req, res) => {
  const filePath = path.join(__dirname, '../public/scripts/obstacles.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Failed to read file' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).json({ error: 'Failed to parse JSON' });
    }
  });
});

module.exports = router;
