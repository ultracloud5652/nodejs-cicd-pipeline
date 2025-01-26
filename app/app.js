const express = require('express');
const app = express();
const routes = require('./routes/index');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use('/', routes);
app.use('/tasks', taskRoutes);

module.exports = app;
