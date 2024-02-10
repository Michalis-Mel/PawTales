import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const port = 5173;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes by serving the main HTML file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening on all network interfaces on port ${port}`);
});
