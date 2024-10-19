const wss = new WebSocket.Server({port:8080});

wss.on("connection",ws=>{
    console.log("new client connected");
// wss.on("connection",ws=>{
//     console.log("new client connected");

    ws.on("message", data=>{
        console.log(`Client has sent us : ${data}`);
        // const jsonObject = {
        //     frequency:5.0
        //   };
        ws.send(JSON.stringify(data));
//     ws.on("message", data=>{
        
//         console.log(`Client has sent us : ${data}`);
//         // const jsonObject = {
//         //     frequency:5.0
//         //   };
//         ws.send(JSON.stringify(data));
//     })

    })
//     ws.on("close",()=>{
//         console.log("client has disconnected");
//     })
// })

    ws.on("close",()=>{
        console.log("client has disconnected");
    })
})
wss.on('connection', function connection(ws) {
    ws.on("message", data=>{
        console.log(`Client has sent us : ${data}`);
  
      // Broadcast to all clients
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
           client.send(JSON.stringify(data));
      
        }
      });
    });
  });