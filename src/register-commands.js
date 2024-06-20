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
    name: "add",
    description: "Additionne 2 nombres.",
    options: [
      {
        name: "nombre1",
        description: "Premier nombre",
        required: true,
        type: ApplicationCommandOptionType.Number,
      },
      {
        name: "nombre2",
        description: "Deuxième nombre",
        required: true,
        type: ApplicationCommandOptionType.Number,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash command...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash command were registered successfully");
  } catch (error) {
    console.log(`There is an error : ${error}`);
  }
})();
