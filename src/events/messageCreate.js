const { handleWelcomeMessage } = require("../utils/welcomeHandler");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;

    const authorsSeen = client.authorsSeen || new Set();
    client.authorsSeen = authorsSeen;

    await handleWelcomeMessage(
      message,
      client.user.id,
      client.user.username,
      authorsSeen
    );
  },
};
