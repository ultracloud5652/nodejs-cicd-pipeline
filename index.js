const connectDB = require('./app/config/db');
const config = require('./app/config/config');
const app = require('./app/app');

// Connect Database
connectDB();

// Start Server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
