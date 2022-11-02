import { CommandInteraction, Client, Interaction } from "discord.js";
import { commands } from "../Command/Commands";
import { MyConstants } from "../Util/MyConstants";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
        if(interaction.isButton()){
            interaction.update({
                content:"calc"
            })
            console.log(interaction);
        }
    });
 
    client.on("messageCreate", async (message) => {
        if(message.content == ".doSomething") {
            if(message.author.id == MyConstants.NotAllowedUID){
                message.reply({
                    content:"We've detected <User Not Allowed> is trying to use a dot command."
                });
                //could return here to stop execution
            }

            if(MyConstants.AllowedUsers.indexOf(message.author.id) > -1){
                const msgContent = "Hey!"
                message.reply({
                    content: msgContent
                });
                return;
            }
        };
    })
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {

    const slashCommand = commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    
    if(slashCommand.name == 'cointoss'){
        var user:any = interaction.member?.roles;
        const userRoles:string[] = user.member["_roles"];
        
        if(interaction.member?.user.id == MyConstants.NotAllowedUID){
            await interaction.reply({
                content: "We've detected <Not Allowed User> is trying to use this bot and have stopped execution.",
                ephemeral:false
            })
            return;
        }
        //If not allowed
        if(!(userRoles.some(r => MyConstants.AllowedRoles.indexOf(r) >= 0))){
            await interaction.reply({
                content:"You do not have permissions to use this command!",
                ephemeral:true
            })
            return;
        }
    }

    await interaction.deferReply();

    slashCommand.run(client, interaction);
};