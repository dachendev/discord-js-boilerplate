import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { loadCommands, loadEvents } from './utils';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Loading command files
client.commands = loadCommands();

/**
 * Registering event listeners
 */
loadEvents().every((event) => {
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

// Login to Discord using bot token
client.login(process.env.DISCORD_TOKEN);