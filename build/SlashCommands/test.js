"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const discord_interactions_1 = require("discord-interactions");
const discord_js_1 = require("discord.js");
exports.data = {
    name: "test",
    description: "Basic test command.",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    async execute(req, res) {
        const { avatar, id, username, discriminator } = req.body.member.user;
        const { application_id, channel_id, guild_id } = req.body;
        const commandId = req.body.id;
        return res.send({
            type: discord_interactions_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [
                    {
                        author: {
                            name: `${username}#${discriminator}  |  You used this command!`,
                            icon_url: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=4096`,
                        },
                        footer: {
                            text: "The footer.",
                        },
                        title: "The title.",
                        description: "The description.",
                        color: 13915391, //hex.convert("d454ff")
                    },
                ],
                components: [
                    {
                        type: discord_interactions_1.MessageComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: discord_interactions_1.MessageComponentTypes.BUTTON,
                                style: discord_interactions_1.ButtonStyleTypes.SUCCESS,
                                label: "Smexy Button",
                                custom_id: "button",
                            },
                        ],
                    },
                ],
                flags: discord_interactions_1.InteractionResponseFlags.EPHEMERAL,
            },
        });
    },
};
