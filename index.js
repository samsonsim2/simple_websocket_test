const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

// wss.on("connection",ws=>{
//     console.log("new client connected");

//     ws.on("message", data=>{

//         console.log(`Client has sent us : ${data}`);
//         // const jsonObject = {
//         //     frequency:5.0
//         //   };
//         ws.send(JSON.stringify(data));

//     })

//     ws.on("close",()=>{
//         console.log("client has disconnected");
//     })
// })

wss.on("connection", function connection(ws) {
  let jsonData = {
    time: 0.0,
    minStep: 0.1,
    maxStep: 0.6,
    frequency: 1.0,
    color1: new THREE.Color(0xffffff),
    color2: new THREE.Color(0x000000),
    speed: 1,
    invert: 0.0,
    step: 0.0,
    noiseOption: 0.0,
  };

  client.send(JSON.stringify(jsonData));



  ws.on("message", (data) => {
    console.log(`Client has sent us : ${data}`);

    jsonData = data

    // Broadcast to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(jsonData));
      }
    });
  });
});