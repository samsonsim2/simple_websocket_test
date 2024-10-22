const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let jsonObject = {
  time: 0.0,
  minStep: 0.1,
  maxStep: 0.6,
  frequency: 1.0,
  color1: 143613,
  color2: 14350592,
  speed: 1,
  invert: 0.0,
  step: 0.0,
  noiseOption: 0.0,
  yRotation: 0.0,
  zRotation: 0.0,
};
wss.on("connection", function connection(ws) {
 
 
  // Broadcast to all clients
  
  const message = {
    type: 'greeting',
    content: 'Welcome to the WebSocket server!',
  };

  // Send the message as a JSON string
  ws.send(JSON.stringify(jsonObject));


  ws.on("message", (data) => {
    console.log(`Client has sent us : ${data}`);
    const property = JSON.parse(data);
    jsonObject = { ...jsonObject, ...property };
    // Broadcast to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(jsonObject));
      }
    });
  });
});
