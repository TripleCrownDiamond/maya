require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

/* const commands = [
  {
    name: "test_de_connaissances",
    description:
      "Testez vos connaissances en rapport avec les notions que vous avez apprise.",
    options: [
      {
        name: "sujet",
        description: "Choisissez un sujet pour testez vos connaissances.",
        required: true,
        type: ApplicationCommandOptionType.Channel,
        choices: [
          {
            name: "Informatique 101",
            value: "Informatique 101",
          },
          {
            name: "Internet 101",
            value: "Internet 101",
          },
        ],
      },
    ],
  },
]; */

const commands = [
  {
    name: "embed",
    description: "Crée un embed avec les informations que vous fournissez.",
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.TESTING_BOT_TOKEN
);

(async () => {
  try {
    console.log("Registering slash command...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.TESTING_BOT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash command were registered successfully");
  } catch (error) {
    console.log(`There is an error : ${error}`);
  }
})();
