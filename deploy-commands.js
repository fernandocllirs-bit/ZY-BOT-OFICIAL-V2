require("dotenv").config();

const { REST, Routes } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

const commands = [
    new SlashCommandBuilder()
        .setName("criarpix")
        .setDescription("Cria um pedido PIX")
        .toJSON()
];


const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);


(async () => {
    try {

        console.log("🔄 Registrando comandos...");

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {
                body: commands
            }
        );

        console.log("✅ Comandos registrados!");

    } catch (error) {
        console.error(error);
    }
})();