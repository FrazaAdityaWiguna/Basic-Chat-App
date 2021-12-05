const app = require('express')()
const server = require('http' ||
  'https://simplechatapp01.herokuapp.com/').createServer(app)
const io = require('socket.io')(server, {})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

let countUserOnline = 1
io.on('connection', (socket) => {
  socket.on('join', (params) => {
    console.log('User Join')
    countUserOnline++
    io.emit('countUserOnline', countUserOnline)
  })

  socket.on('message', (params) => {
    console.log('User Send Message')
    io.emit('pesan', params)
  })

  socket.on('disconnect', () => {
    console.log('User has been LogOut')
    countUserOnline--
    io.emit('countUserOnline', countUserOnline)
  })
})

server.listen(3000)
