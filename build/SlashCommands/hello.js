"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const discord_interactions_1 = require("discord-interactions");
const discord_js_1 = require("discord.js");
exports.data = {
    name: "hello",
    description: "...",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "minutes",
            description: "The minutes of your timestamp.",
            type: discord_js_1.ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: "hours",
            description: "The hour of your timestamp.",
            type: discord_js_1.ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: "day",
            description: "The month's day of your timestamp.",
            type: discord_js_1.ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: "month",
            description: "The month of your timestamp.",
            type: discord_js_1.ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: "year",
            description: "The year of your timestamp.",
            type: discord_js_1.ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
    async execute(req, res) {
        const { avatar, id, username, discriminator } = req.body.member.user;
        const { application_id, channel_id, guild_id } = req.body;
        const messageId = req.body.id;
        const minutes = req.body.data.options.find(async (obj) => {
            return obj.name === "minutes" && obj.type === 10;
        });
        const hours = req.body.data.options.find(async (obj) => {
            return obj.name === "hours" && obj.type === 10;
        });
        const days = req.body.data.options.find(async (obj) => {
            return obj.name === "day" && obj.type === 10;
        });
        const month = req.body.data.options.find(async (obj) => {
            return obj.name === "month" && obj.type === 10;
        });
        const year = req.body.data.options.find(async (obj) => {
            return obj.name === "year" && obj.type === 10;
        }); // years.value = to their input
        return res.send({
            type: discord_interactions_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `balls.`,
            },
        });
    },
};
