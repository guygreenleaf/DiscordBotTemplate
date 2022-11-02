import { Client, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv';
import ready from "./Listeners/ready";
import interactionCreate from "./Listeners/interactionCreate";

dotenv.config();
console.log("Bot is starting...");

const client = new Client({
    intents: [GatewayIntentBits.Guilds,
		      GatewayIntentBits.GuildMessages,
              GatewayIntentBits.MessageContent]
});

ready(client);

interactionCreate(client);

client.login(process.env.DEV_TOKEN);