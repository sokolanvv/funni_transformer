const Fastify = require("fastify");
const fetch = require("node-fetch-commonjs");
const cors = require("@fastify/cors");

const fastify = Fastify({
    logger: true,
    bodyLimit: 1024 * 1024 * 2
});

fastify.register(cors, {
    origin: "*",
    methods: ["POST", "GET"]
});

fastify.all('/', async (req, rep) => {
    if (!req) return;

    console.log(req.body);
    await fetch(`https://pandora.dvfu.ru/chart/${req.body}/get_data`)
        .then((res) => res.json())
        .then((json) => {
            console.log(JSON.parse(json[0].value).data)
            rep.code(200);
            rep.send(JSON.parse(json[0].value).data);
        });
});

fastify.listen({ port: "7777", host: "localhost" }, (err, address) => {
    if (err) fastify.log.error(err);
});