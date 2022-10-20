var express = require("express");
var app = express();
var expressWs = require("express-ws")(app);
/********************************/
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://yjqtpadsahfkxoiebttk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqcXRwYWRzYWhma3hvaWVidHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNTcyNTUsImV4cCI6MTk4MTgzMzI1NX0.wk6sfKMMzT-v3opgVKngcm48oZGUJxjii6pLbnEX5L8";
const supabase = createClient(supabaseUrl, supabaseKey);
/********************************/
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Last-Modified", new Date());
  res.header("Date", new Date());
  next();
});

app.use(function (req, res, next) {
  // console.log("middleware");
  req.testing = "testing";
  return next();
});

app.get("/ready_server", async function (req, res, next) {
  const { data, error } = await supabase.from("message").select();
  console.log(data)
  console.log(error)
  return res.json(data);
});

const websocket = {
  special: false,
  chat: false,
  aWss: null,
  temp: [],
  temppin: {},
  limit: 100,
  init: () => {
    websocket.aWss = expressWs.getWss("/");
    websocket.aWss.on("connection", async function (ws) {
      console.log("ONCONNECT");
      if (websocket.temp.length == 0) {
        const { data, error } = await supabase
          .from("message")
          .select()
          .limit(websocket.limit)
          .order("id", { ascending: false });
        websocket.temp = data;
      }

      if (websocket.temppin.id === undefined) {
        const { data, error } = await supabase
          .from("pin_message")
          .select()
          .eq("active", "true")
          .limit(1)
          .order("id", { ascending: false });
        console.log(data)
        websocket.temppin = data ? data[0] : {};
        websocket.temppin ? (websocket.temppin.pin = true) : {};
      }

      ws.send(JSON.stringify({ method: "temp", data: websocket.temp }));
      ws.send(JSON.stringify({ method: "temppin", data: websocket.temppin }));
      ws.send(JSON.stringify({ method: "special", data: websocket.special }));
      ws.send(JSON.stringify({ method: "chat", data: websocket.chat }));

    });
    app.ws("/", function (ws, req) {
      ws.on("message", function (msg) {
        console.log(msg);
        msg = JSON.parse(msg);
        switch (msg.method) {
          case "pin":
            websocket.events.pin(msg);
            break;
          case "unpin":
            websocket.events.unpin(msg);
            break;
          case "sticker":
            websocket.events.sticker(msg);
            break;
          case "special":
            websocket.events.special(msg);
            break;
          case "message":
            websocket.events.message(msg);
            break;
        }
        websocket.aWss.clients.forEach(function each(client) {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify(msg));
          }
        });
      });
      console.log("socket", req.testing);
    });
  },
  events: {
    pin: async (msg) => {
      const { data, error } = await supabase
        .from("pin_message")
        .insert([{ user: msg.user, message: msg.message, active: true }]);
      websocket.temppin = data[0];
      websocket.temppin.pin = true;
      msg = websocket.temppin;
    },
    unpin: async (msg) => {
      const { data, error } = await supabase
        .from("pin_message")
        .update({ active: false })
        .eq("active", "true");
      console.log(data);
      websocket.temppin = { id: 0 };
    },
    sticker: async (msg) => { },
    special: async (msg) => {
      websocket.special = msg.data
    },
    special: async (msg) => {
      websocket.chat = msg.data
    },
    message: async (msg) => {
      var Filter = require('bad-words'),
        filter = new Filter();
      msg.message = filter.clean(msg.message); //Don't be an ******
      // console.log(msg.message)
      let obj = { user: msg.user, message: msg.message };
      const { data, error } = await supabase.from("message").insert([obj]);
      if (!error) {
        if (websocket.temp.length >= websocket.limit) {
          // websocket.temp.splice(0, 1);
          websocket.temp.pop();
        }
        console.log(data)
        websocket.temp = [data[0], ...websocket.temp];
        // data[0].concat(websocket.temp)
        // websocket.temp.push(data[0]);
        msg = data[0];
      } else {
        console.error(error);
      }
    },
  },
};

websocket.init();
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;