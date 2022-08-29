// const express = require('express');
// const app = express();
// var cors = require('cors')
//     // // const http = require('http');
//     // // const server = express();
//     // const { Server } = require("socket.io");

// // // const bodyParser = require('body-parser');
// // // const server_port = 3000;
// const PORT = process.env.PORT || 8888;
// // const INDEX = '/index.html';
// const server = express()
//     .use(cors({ origin: false }))
//     .listen(PORT, () => console.log(`Listening on ${PORT}`));


// // // app.set('etag', true)
// // //     .use(bodyParser.json())
// // //     .use(bodyParser.urlencoded({ extended: true }))
// // //     .listen(server_port, function() { console.log('listening on *:' + server_port); });


// // app.use((req, res, next) => {
// //     res.header('Access-Control-Allow-Origin', '*');
// //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
// //     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
// //     res.header('Access-Control-Allow-Credentials', true);
// //     res.header('Last-Modified', new Date());
// //     res.header('Date', new Date());
// //     next();
// // })


// // app.get('/example', (req, res) => {
// //     res.sendFile(__dirname + '/index.html');
// // });

// // ////////////////////////////////////////////

// // const socketIO = {
// //     clientSocket:{},
// // }
// // const io = new Server(server,{cors:{origin:"*"}});

// // io.on('connection', (socket) => {
// //     console.log('a user connected');
// //     socket_handling.init(socket);
// // });

// // const socket_handling = {
// //     init: (socket) => {
// //         io.emit('request userID', "socket ready");
// //         socket_handling.events(socket);
// //     },
// //     events: (socket) => {
// //         // socket.on('connection', (data) => { clientSocket[data] = socket.id; console.log(clientSocket) });
// //         // service.api("message", "GET", "", (req, res) => { io.emit('OLD message', { id: socket.id, data: res.body }); })
// //         socket.on('reponse UserID', (data) => { 
// //             console.log(socket.id)
// //             socketIO.clientSocket[data.id] = socket.id;
// //             io.emit('connectings', socketIO.clientSocket); 
// //         });
// //         socket.on('chat message', (data) => { io.emit('chat message', data); });
// //         socket.on('disconnect', () => {
// //             let id = Object.entries(socketIO.clientSocket).find(i => i[1] === socket.id)[0];
// //             // io.emit('disconnecting', id);
// //             delete socketIO.clientSocket[id];
// //         });

// //     },
// // }

// // process.on('unhandledRejection', (e) => { console.log(e.message, e.stack) })





// const WebSocket = require('ws')
//     // const wss2 = new WebSocketServer({ noServer: true });
// const wss = new WebSocket.Server({ noServer: true })

// wss.on('connection', function connection(ws) {
//         //    ws.on('message', (data) => {
//         //       console.log('data received \n %o',data)
//         //       setInterval(()=>{
//         //         ws.send("TEST");
//         //       },1000)

//         //    })

//         //    console.log('data received \n %o',data)
//         console.log("TESTESTSE")
//         setInterval(() => {
//             ws.send(JSON.stringify({ method: 'message', data: { "value": 'test12345678' } }));
//         }, 1000)

//     })
//     // wss.on('listening',()=>{
//     //    console.log('listening on 8888')
//     // })

// server.on('upgrade', function upgrade(request, socket, head) {
//     const { pathname } = parse(request.url);

//     // if (pathname === '/foo') {
//         wss1.handleUpgrade(request, socket, head, function done(ws) {
//             wss1.emit('connection', ws, request);
//         });
//     // } else if (pathname === '/bar') {
//     //     wss2.handleUpgrade(request, socket, head, function done(ws) {
//     //         wss2.emit('connection', ws, request);
//     //     });
//     // } else {
//     //     socket.destroy();
//     // }
// });

// // server.listen(8888);

// // server.on('upgrade', (request, socket, head) => {
// //     const origin = request && request.headers && request.headers.origin;
// //     const corsRegex = /^https?:\/\/(.*\.?)abc\.com(:\d+)?\/$/g
// //     if (origin && origin.match(corsRegex) != null) {
// //       wss.handleUpgrade(request, socket, head, (ws) => {
// //         wss.emit('connection', ws, request);
// //       });
// //     } else {
// //       socket.destroy();
// //     }
// //   });


// // const socket_handling = {
// //     init: (socket) => {
// //         io.emit('request userID', "socket ready");
// //         socket_handling.events(socket);
// //     },
// //     events: (socket) => {
// //         // socket.on('connection', (data) => { clientSocket[data] = socket.id; console.log(clientSocket) });
// //         // service.api("message", "GET", "", (req, res) => { io.emit('OLD message', { id: socket.id, data: res.body }); })
// //         socket.on('reponse UserID', (data) => { 
// //             console.log(socket.id)
// //             socketIO.clientSocket[data.id] = socket.id;
// //             io.emit('connectings', socketIO.clientSocket); 
// //         });
// //         socket.on('chat message', (data) => { io.emit('chat message', data); });
// //         socket.on('disconnect', () => {
// //             let id = Object.entries(socketIO.clientSocket).find(i => i[1] === socket.id)[0];
// //             io.emit('disconnecting', id);
// //             delete socketIO.clientSocket[id];
// //         });

// //     },
// // }

// // const {http} = require('http');
// // const {parse} = require('url');
// // const {WebSocket} = require('ws')
// // import { createServer } from 'http';
// // import { parse } from 'url';
// // import { WebSocketServer } from 'ws';

// // const server = createServer();
// // const wss1 = new WebSocketServer({ noServer: true });
// // const wss2 = new WebSocketServer({ noServer: true });

// // wss1.on('connection', function connection(ws) {
// //   // ...
// // });

// // wss2.on('connection', function connection(ws) {
// //   // ...
// // });

// // server.on('upgrade', function upgrade(request, socket, head) {
// //   const { pathname } = parse(request.url);

// //   if (pathname === '/foo') {
// //     wss1.handleUpgrade(request, socket, head, function done(ws) {
// //       wss1.emit('connection', ws, request);
// //     });
// //   } else if (pathname === '/bar') {
// //     wss2.handleUpgrade(request, socket, head, function done(ws) {
// //       wss2.emit('connection', ws, request);
// //     });
// //   } else {
// //     socket.destroy();
// //   }
// // });

// // server.listen(8888);


const serverless = require('serverless-http')

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Last-Modified', new Date());
    res.header('Date', new Date());
    next();
})

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res, next){
//   console.log('get route', req.testing);
//   res.end();
// res.sendFile(__dirname + '/index.html');
// const path = `/item`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: `);
});



  
var aWss = expressWs.getWss('/');

app.ws('/', function(ws, req) {
    // console.log("HAHI")
  ws.on('message', function(msg) {
    // console.log("YEE")
    // ws.send(JSON.stringify({ method: 'message', data: { "value": msg } }));
    console.log(msg);
    // console.log(ws)
    
    aWss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify({ method: 'message', data: { "value": JSON.parse(msg) } }));
      }
    })
  });
  console.log('socket', req.testing);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use('./netlify/functions/')
module.exports = serverless(app)