import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import { loadCommands } from './utils';

/**
 * Loading command files
 */
const commands = loadCommands().map((command) => {
    return command.data.toJSON();
});

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

/**
 * Deploy commands
 */
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application slash commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application slash commands.`);
    } catch (err) {
        console.error(err);
    }
})();
