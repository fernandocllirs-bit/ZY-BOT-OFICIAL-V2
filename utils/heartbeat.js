const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "../bot-status.log");

function salvarLog() {
    const data = new Date();

    const mensagem = `[${data.toLocaleString("pt-BR")}] ✅ ZY-BOT funcionando normalmente\n`;

    fs.appendFileSync(logPath, mensagem);

    console.log(mensagem.trim());
}

module.exports = function iniciarHeartbeat() {
    // salva ao iniciar
    salvarLog();

    // salva a cada 1 hora
    setInterval(() => {
        salvarLog();
    }, 60 * 60 * 1000);
};