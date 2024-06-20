const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
    if (!welcomeChannel) return;

    const welcomeEmbed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Bienvenue sur TakaCode !")
      .setDescription(
        `👋 Hey! <@${member.id}>, bienvenue dans le serveur Discord de **TakaCode**!\n\n` +
          `Pour bien commencer, nous te recommandons de visiter les salons suivants :\n\n` +
          `📜 <#1248591411666747465> pour prendre connaissance des règles de la communauté.\n\n` +
          `🚀 <#1248722799258894380> pour suivre les étapes et bien démarrer ta formation.\n\n` +
          `✍️ N'oublie pas de te présenter dans le salon : <#1248948123078885417> en indiquant ton nom, prénom, pays, ville, profession ou activité (par exemple étudiant ou développeur free-lance), et ton objectif en rejoignant la communauté.\n\n` +
          `### Exemple de présentation :\n\n` +
          `> ✍️ Salut tout le monde ! Je m'appelle **Jean Dupont**, je viens de **France**, plus précisément de **Paris**. Je suis **développeur free-lance** et j'ai rejoint cette communauté pour **échanger des idées et collaborer sur des projets innovants**. Hâte de discuter avec vous tous ! 🎉`
      )
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp();

    welcomeChannel.send({ embeds: [welcomeEmbed] });
  },
};
