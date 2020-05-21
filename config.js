const dotenv = require('dotenv');
dotenv.config(); // This must be before db const because else crashes (needs url param from here to set db)

const config = {
    dbUrl: process.env.DB_CLUSTER,
    host: process.env.HOST || 'localhost',
    serverPort: process.env.SERVER_PORT || '3007',
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    filesRoute : process.env.FILE_ROUTE || 'files'
}

module.exports = config;