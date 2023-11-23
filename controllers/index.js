const path = require('path');

const home = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'frontend/index.html'), { headers: { 'Content-Type': 'text/html' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { home };
