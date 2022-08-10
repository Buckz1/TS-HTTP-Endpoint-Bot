"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordRequest = exports.VerifyDiscordRequest = void 0;
require("dotenv/config");
const discord_interactions_1 = require("discord-interactions");
function VerifyDiscordRequest(clientKey) {
    return function (req, res, buf, encoding) {
        const signature = req.get('X-Signature-Ed25519');
        const timestamp = req.get('X-Signature-Timestamp');
        const isValidRequest = (0, discord_interactions_1.verifyKey)(buf, signature, timestamp, clientKey);
        if (!isValidRequest) {
            res.status(401).send('Bad request signature');
            throw new Error('Bad request signature');
        }
        ;
    };
}
exports.VerifyDiscordRequest = VerifyDiscordRequest;
;
async function DiscordRequest(endpoint, options) {
    const url = 'https://discord.com/api/v10/' + endpoint;
    if (options.body)
        options.body = JSON.stringify(options.body);
    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.Token}`,
            'Content-Type': 'application/json; charset=UTF-8',
        },
        ...options
    });
    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }
    return res;
}
exports.DiscordRequest = DiscordRequest;
;
