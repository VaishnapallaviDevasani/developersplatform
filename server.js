const config = require('config');
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const db = config.get('MONGO_URI'); // Accessing MONGO_URI from default.json
const jwtSecret = config.get('jwtSecret'); // Accessing JWT_SECRET from default.json
// Connect to Database
connectDB();
// Initialize Middleware
app.use(express.json({ strict: false }));
// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/messages', require('./routes/api/messages'));
// Serve Static assets in production
if (process.env.NODE_ENV === 'production'){
  // Set Static Folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// SERVER
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
