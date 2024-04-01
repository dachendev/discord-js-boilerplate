import fs from 'node:fs';
import path from 'node:path';
import { Collection } from 'discord.js';

export const loadCommands = () => {
    const commands = new Collection();

    /**
     * Loading command files
     */
    const commandsPath = path.join(__dirname, 'commands');
    const commandsSubdirs = fs.readdirSync(commandsPath);

    for (const subdir of commandsSubdirs) {
        const subdirPath = path.join(commandsPath, subdir);
        const subdirFiles = fs.readdirSync(subdirPath).filter(file => file.endsWith('.js'));

        for (const file of subdirFiles) {
            const filePath = path.join(subdirPath, file);
            const command = require(filePath).default;

            if ('data' in command && 'execute' in command) {
                commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    return commands;
};

export const loadEvents = () => {
    const events = new Collection();

    /**
     * Loading event files
     */
    const eventsPath = path.join(__dirname, 'events');
    const eventsFiles = fs.readdirSync(eventsPath);

    for (const file of eventsFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath).default;

        if ('name' in event && 'execute' in event) {
            events.set(event.name, event);
        } else {
            console.log(`[WARNING] The event at ${filePath} is missing a required "name" or "execute" property.`);
        }
    }

    return events;
}