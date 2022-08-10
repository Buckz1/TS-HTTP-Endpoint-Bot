"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const discord_interactions_1 = require("discord-interactions");
exports.data = {
    custom_id: "button",
    async execute(req, res) {
        const { avatar, id, username, discriminator } = req.body.member.user;
        const { application_id, channel_id, guild_id } = req.body;
        const messageId = req.body.id;
        return res.send({
            type: discord_interactions_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: ">>> **Testing button ephemeral messages**",
                embeds: [
                    {
                        description: "WORKED!",
                        color: 13915391, //hex.convert("d454ff")
                    },
                ],
                flags: discord_interactions_1.InteractionResponseFlags.EPHEMERAL,
            },
        });
    },
};
