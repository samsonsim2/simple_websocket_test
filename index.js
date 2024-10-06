const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8080});

wss.on("connection",ws=>{
    console.log("new client connected");

    ws.on("message", data=>{
        console.log(`Client has sent us : ${data}`);
        // const jsonObject = {
        //     frequency:5.0
        //   };
        ws.send(JSON.stringify(data));

    })

    ws.on("close",()=>{
        console.log("client has disconnected");
    })
})