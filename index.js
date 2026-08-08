require("dotenv").config();

const fs = require("fs");
const iniciarHeartbeat = require("./utils/heartbeat");

const {
    Client,
    GatewayIntentBits,
    Collection,
    Partials
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel
    ]
});

client.commands = new Collection();
client.prefixCommands = new Collection();


// =======================
// Slash Commands
// =======================

const commandFiles = fs.readdirSync("./commands")
.filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);

    console.log(`✅ Slash carregado: ${command.data.name}`);

}


// =======================
// Prefix Commands
// =======================

if (fs.existsSync("./prefix")) {

    const prefixFiles = fs.readdirSync("./prefix")
    .filter(file => file.endsWith(".js"));

    for (const file of prefixFiles) {

        const command = require(`./prefix/${file}`);

        client.prefixCommands.set(command.name, command);

        console.log(`✅ Prefixo carregado: ${command.name}`);

    }

}


// =======================
// Eventos
// =======================

require("./events/interactionCreate")(client);


// =======================
// Prefixos
// =======================

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    const prefix = "!";

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(commandName);

    if (!command) return;

    try {

        await command.execute(message, args, client);

    } catch (err) {

        console.error(err);

    }

});



client.once("ready", () => {
    console.log(`💗 ${client.user.tag} está online!`);
    iniciarHeartbeat();
});


client.login(process.env.TOKEN);