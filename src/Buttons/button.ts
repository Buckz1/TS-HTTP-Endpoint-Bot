import {
  InteractionResponseType,
  InteractionResponseFlags,
} from "discord-interactions";

export const data = {
  custom_id: "button",

  async execute(req: any, res: any) {
    const { avatar, id, username, discriminator } = req.body.member.user;
    const { application_id, channel_id, guild_id } = req.body;
    const messageId = req.body.id;

    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, // Reply to the buttons message
      data: {
        content: ">>> **Testing button ephemeral messages**",
        embeds: [
          {
            description: "WORKED!",
            color: 13915391, //hex.convert("d454ff")
          },
        ],
        flags: InteractionResponseFlags.EPHEMERAL,
      },
    });
  },
};
