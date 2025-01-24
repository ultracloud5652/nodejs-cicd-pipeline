const app = require('./app/app');
const config = require('./app/config/config');

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
