import { CommandInteraction, Client, ApplicationCommandType, EmbedBuilder} from "discord.js";
import { Command } from "../Command/Command";

export const CoinFlip: Command = {
    name: "cointoss",
    description: "Flips a coin",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction, runTime:Date) => {
        var coinFlip = Math.round(Math.random()) + 1;
        const content = (coinFlip == 1) ?  "heads" : "tails";   
        const thumbNail = (coinFlip == 1) ? "https://i.imgur.com/yYJykFE.png" : "https://i.imgur.com/HFssJWo.png";

            const embedMsg = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`You flipped a coin and got ${content}!`)
            .setThumbnail(`${thumbNail}`)
            
            await interaction.editReply({
                embeds: [embedMsg], 
            });
    }
};