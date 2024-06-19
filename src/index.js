require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const keywords = require("./utils/welcome_messages_keywords");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Utilisation d'un Set pour stocker les IDs des auteurs
const authorsSeen = new Set();
let clientId = "";
let clientUsername = "";

client.on("ready", () => {
  console.log(`✅ ${client.user.tag} is online.`);

  clientUsername = client.user.username;
  clientId = client.user.id;
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "test_de_connaissances") {
    const subject = interaction.options.getString("sujet");
    console.log(subject);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Vérifiez si le message est dans le canal spécifique (remplacez l'ID du canal par le vôtre)
  if (message.channel.id === process.env.PRESENTATION_CHANNEL_ID) {
    try {
      // Vérifiez si l'auteur a déjà envoyé un message dans ce canal
      const isNewAuthor = !authorsSeen.has(message.author.id);

      console.log(authorsSeen);

      // Ajoutez l'auteur à la liste des auteurs vus
      authorsSeen.add(message.author.id);

      const isIntroduction = keywords.some((keyword) =>
        message.content.toLowerCase().includes(keyword)
      );

      // Vérifiez les mentions du bot
      const mentionned = message.content.toLowerCase().includes(`@${clientId}`);

      console.log(mentionned);

      if (mentionned) {
        console.log("Mention");
        message.channel.send(
          `Merci de me mentionner ${message.author}. Je suis **${clientUsername}**, un bot créé par **TakaCode**. Je peux vous aider à souhaiter la bienvenue à tous les nouveaux arrivants qui se présentent dans le salon 👋🏼 **[présentations](https://discordapp.com/channels/1247836198672793701/1248948123078885417)**. Je suis aussi en constante amélioration. Bientôt, je pourrai vous aider via des *slash commands* à tester vos connaissances après votre apprentissage et aussi réaliser des choses cool avec l'IA. Si tu t'es déjà présenté, évite l'usage des mots clés que tu retrouvera via ce **[lien](https://github.com/TripleCrownDiamond/mayakeywords/blob/main/keyword.js)**, car ils me permettent de reconnaître les nouveaux qui se présentent. Si toi aussi tu as envie d'apprendre à créer des bots cools comme moi ou des applications, fonce dès maintenant dans la session **DEVWEB** et commence ton apprentissage par **[I- Introduction au métier de développeur](https://discordapp.com/channels/1247836198672793701/1249363397162827849)**. Bon apprentissage avec TakaCode ! 📚✨`
        );
      }

      // Si c'est une nouvelle introduction et l'auteur est nouveau, envoyer un message de bienvenue
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
});

client.login(process.env.TOKEN);
