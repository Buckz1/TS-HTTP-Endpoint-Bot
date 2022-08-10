import "dotenv/config";
import fs from "fs";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  MessageComponentTypes,
} from "discord-interactions";
import { VerifyDiscordRequest } from "./requests";
import { connect } from "ngrok";
import { Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

const app = express();
const rest = new REST({ version: "10" }).setToken(process.env.Token);

(async function () {
  const url = await connect(3000);
  console.log(url + "/interactions");
})();

app.use(
  express.json({
    verify: VerifyDiscordRequest(process.env.clientKey),
  })
);

const commands: any[] = [];
const slashcommands: Collection<string, any> = new Collection();
const commandFiles = fs
  .readdirSync("./build/SlashCommands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  (async function () {
    const command = await import(`../build/SlashCommands/${file}`);
    commands.push(command.data);
    slashcommands.set(command.data.name, command);
    rest.put(Routes.applicationCommands(process.env.appId), { body: commands });
  })();
}
commands.forEach((c) => {
  console.log(`Installed /${c.name}`);
});

const buttons: Collection<string, any> = new Collection();
const buttonFiles = fs
  .readdirSync("./build/Buttons")
  .filter((file) => file.endsWith(".js"));

for (const file of buttonFiles) {
  (async function () {
    const button = await import(`../build/Buttons/${file}`);
    buttons.set(button.data.custom_id, button);
  })();
}

app.post("/interactions", async function (req, res) {
  const { type, data } = req.body;

  if (type === InteractionType.PING) {
    return res.send({
      type: InteractionResponseType.PONG,
    });
  } else if (type === InteractionType.APPLICATION_COMMAND) {
    const commandName = data.name;
    const command: any = slashcommands.get(commandName);
    const { avatar, id, username, discriminator } = req.body.member.user;
    if (!command) return;
    if (!req.body.guild_id) return;

    try {
      return command.data.execute(req, res);
    } catch (error) {
      console.log(error);
    }
  } else if (type === InteractionType.MESSAGE_COMPONENT) {
    if ((data.component_type = MessageComponentTypes.BUTTON)) {
      const button: any = buttons.get(data.custom_id);
      const { avatar, id, username, discriminator } = req.body.member.user;
      if (!button) return;

      try {
        return button.data.execute(req, res);
      } catch (error) {
        console.log(error);
      }
    }
  }
});

app.listen(3000, async () => {
  console.log("Listening on port 3000");
});
