import { InteractionResponseType } from "discord-interactions";
import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";

export const data = {
  name: "hello",
  description: "...",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "minutes",
      description: "The minutes of your timestamp.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "hours",
      description: "The hour of your timestamp.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "day",
      description: "The month's day of your timestamp.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "month",
      description: "The month of your timestamp.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "year",
      description: "The year of your timestamp.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],

  async execute(req: any, res: any) {
    const { avatar, id, username, discriminator } = req.body.member.user;
    const { application_id, channel_id, guild_id } = req.body;
    const messageId = req.body.id;

    const minutes = req.body.data.options.find(async (obj: any) => {
      return obj.name === "minutes" && obj.type === 10;
    });
    const hours = req.body.data.options.find(async (obj: any) => {
      return obj.name === "hours" && obj.type === 10;
    });
    const days = req.body.data.options.find(async (obj: any) => {
      return obj.name === "day" && obj.type === 10;
    });
    const month = req.body.data.options.find(async (obj: any) => {
      return obj.name === "month" && obj.type === 10;
    });
    const year = req.body.data.options.find(async (obj: any) => {
      return obj.name === "year" && obj.type === 10;
    }); // year.value = to their input

    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Testing to see if we get the correct data constants from the options.`,
      },
    });
  },
};
