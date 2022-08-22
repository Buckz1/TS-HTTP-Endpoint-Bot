import {
  InteractionResponseType,
  InteractionResponseFlags,
  ButtonStyleTypes,
  MessageComponentTypes,
} from "discord-interactions";
import { ApplicationCommandType } from "discord.js";

export const data = {
  name: "test",
  description: "Basic test command.",
  type: ApplicationCommandType.ChatInput,

  async execute(req: any, res: any) {
    const { avatar, id, username, discriminator } = req.body.member.user;
    const { application_id, channel_id, guild_id } = req.body;
    const commandId = req.body.id;

    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
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
            type: MessageComponentTypes.ACTION_ROW,
            components: [
              {
                type: MessageComponentTypes.BUTTON,
                style: ButtonStyleTypes.SUCCESS,
                label: "Button",
                custom_id: "button",
              },
            ],
          },
        ],
        flags: InteractionResponseFlags.EPHEMERAL,
      },
    });
  },
};
