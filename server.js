const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev })

const handler = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.all("*", (req, res) => handler(req, res))

    server.listen(
        process.env.PORT || 3000,
        process.env.HOST || "0.0.0.0",
        () => console.log("Started")
    )
})