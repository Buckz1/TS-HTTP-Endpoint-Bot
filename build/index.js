"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const discord_interactions_1 = require("discord-interactions");
const requests_1 = require("./requests");
const ngrok_1 = require("ngrok");
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
const v10_1 = require("discord-api-types/v10");
const app = (0, express_1.default)();
const rest = new rest_1.REST({ version: "10" }).setToken(process.env.Token);
(async function () {
    const url = await (0, ngrok_1.connect)(3000);
    console.log(url + "/interactions");
})();
app.use(express_1.default.json({
    verify: (0, requests_1.VerifyDiscordRequest)(process.env.clientKey),
}));
const commands = [];
const slashcommands = new discord_js_1.Collection();
const commandFiles = fs_1.default
    .readdirSync("./build/SlashCommands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    (async function () {
        const command = await Promise.resolve().then(() => __importStar(require(`../build/SlashCommands/${file}`)));
        commands.push(command.data);
        slashcommands.set(command.data.name, command);
        rest.put(v10_1.Routes.applicationCommands(process.env.appId), { body: commands });
    })();
}
commands.forEach((c) => {
    console.log(`Installed /${c.name}`);
});
const buttons = new discord_js_1.Collection();
const buttonFiles = fs_1.default
    .readdirSync("./build/Buttons")
    .filter((file) => file.endsWith(".js"));
for (const file of buttonFiles) {
    (async function () {
        const button = await Promise.resolve().then(() => __importStar(require(`../build/Buttons/${file}`)));
        buttons.set(button.data.custom_id, button);
    })();
}
app.post("/interactions", async function (req, res) {
    const { type, data } = req.body;
    if (type === discord_interactions_1.InteractionType.PING) {
        return res.send({
            type: discord_interactions_1.InteractionResponseType.PONG,
        });
    }
    else if (type === discord_interactions_1.InteractionType.APPLICATION_COMMAND) {
        const commandName = data.name;
        const command = slashcommands.get(commandName);
        const { avatar, id, username, discriminator } = req.body.member.user;
        if (!command)
            return;
        if (!req.body.guild_id)
            return;
        try {
            return command.data.execute(req, res);
        }
        catch (error) {
            console.log(error);
        }
    }
    else if (type === discord_interactions_1.InteractionType.MESSAGE_COMPONENT) {
        if ((data.component_type = discord_interactions_1.MessageComponentTypes.BUTTON)) {
            const button = buttons.get(data.custom_id);
            const { avatar, id, username, discriminator } = req.body.member.user;
            if (!button)
                return;
            try {
                return button.data.execute(req, res);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
});
app.listen(3000, async () => {
    console.log("Listening on port 3000");
});
