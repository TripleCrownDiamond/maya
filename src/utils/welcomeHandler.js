const keywords = require("./welcome_messages_keywords");

async function handleWelcomeMessage(
  message,
  clientId,
  clientUsername,
  authorsSeen
) {
  if (
    message.channel.id === process.env.CUISINE_CHANNEL_ID ||
    message.channel.id === process.env.PRESENTATION_CHANNEL_ID
  ) {
    try {
      const isNewAuthor = !authorsSeen.has(message.author.id);

      console.log(authorsSeen);

      authorsSeen.add(message.author.id);

      const isIntroduction = keywords.some((keyword) =>
        message.content.toLowerCase().includes(keyword)
      );

      const mentionned = message.content.toLowerCase().includes(`@${clientId}`);

      console.log(mentionned);

      if (mentionned) {
        console.log("Mention");
        message.channel.send(
          `Merci de me mentionner ${message.author}. Je suis **${clientUsername}**, un bot créé par **TakaCode**. Je peux vous aider à souhaiter la bienvenue à tous les nouveaux arrivants qui se présentent dans le salon 👋🏼 **[présentations](https://discordapp.com/channels/1247836198672793701/1248948123078885417)**. Je suis aussi en constante amélioration. Bientôt, je pourrai vous aider via des *slash commands* à tester vos connaissances après votre apprentissage et aussi réaliser des choses cool avec l'IA. Si tu t'es déjà présenté, évite l'usage des mots clés que tu retrouvera via ce **[lien](https://github.com/TripleCrownDiamond/mayakeywords/blob/main/keyword.js)**, car ils me permettent de reconnaître les nouveaux qui se présentent. Si toi aussi tu as envie d'apprendre à créer des bots cools comme moi ou des applications, fonce dès maintenant dans la session **DEVWEB** et commence ton apprentissage par **[I- Introduction au métier de développeur](https://discordapp.com/channels/1247836198672793701/1249363397162827849)**. Bon apprentissage avec TakaCode ! 📚✨`
        );
      }

      if (isNewAuthor && isIntroduction) {
        const welcomeMessage = `@everyone, aidez-moi à souhaiter la bienvenue à ${message.author} dans notre communauté ! 🎉\n\n`;
        const quickStartLink =
          "🚀[démarrage-rapide](https://discordapp.com/channels/1247836198672793701/1248722799258894380)";
        const additionalMessage = `N'oublie pas de visiter le salon ${quickStartLink} pour apprendre à utiliser le serveur. Ce salon sera régulièrement mis à jour. Donc reviens périodiquement le visiter.`;

        message.channel.send(welcomeMessage + additionalMessage);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }
}

module.exports = { handleWelcomeMessage };
