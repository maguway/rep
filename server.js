const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.get('/api/hotels', (req, res) => {
    res.sendFile(path.join(__dirname, 'hotels.json'));
});

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8080
app.listen(port)

console.log('listening on port: ' + port)