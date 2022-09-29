var express = require("express");
var app = express();
var expressWs = require("express-ws")(app);

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

app.use(function(req, res, next) {
    console.log("middleware");
    req.testing = "testing";
    return next();
});

app.get("/ready_server", function(req, res, next) {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.end(`Express Ready : ${PORT}`);
});

let temp = [];
let temppin = [];
let limit = 10;

var aWss = expressWs.getWss("/");

aWss.on("connection", function(ws) {
    ws.send(JSON.stringify({ method: "temp", data: temp }));
    ws.send(JSON.stringify({ method: "temppin", data: temppin }));
});

app.ws("/", function(ws, req) {
    ws.on("message", function(msg) {
        msg = JSON.parse(msg)
        if (msg.pin == true) {
            temppin = { value: msg };
        } else {
            if (temp.length > limit) {
                temp.splice(0, 1);
            }
            temp.push({ value: msg });
        }

        aWss.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
                client.send(
                    JSON.stringify({
                        method: "message",
                        data: { value: msg },
                    })
                );
            }
        });
    });
    console.log("socket", req.testing);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;