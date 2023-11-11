const https =require('https')
const app =require('./app')
require('dotenv').config();
const server = https.createServer(app)

  
server.listen(8080)