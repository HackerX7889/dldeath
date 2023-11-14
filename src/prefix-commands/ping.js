module.exports = {
    name: "ping",
    description: "pings the bot",
    aliases: ["p"],
    async execute(client, message, args) {
        return message.reply({
            content: `Pong! :ping_pong:\nAPI Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - message.createdTimestamp}`
        })
    }
}