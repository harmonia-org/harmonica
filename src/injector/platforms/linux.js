//* Harmonica
//? GNU/Linux Path Declarations

const user = require('os').userInfo().username;
const homeDir = require('path').join('/home', user)

const discordPaths = [
    [
        '/usr/share/discord',
        '/usr/lib64/discord',
        '/opt/discord',
        '/opt/Discord',
        `${homeDir}/.local/bin/Discord`
    ],

    [
        '/usr/share/discord-ptb',
        '/usr/lib64/discord-ptb',
        '/opt/discord-ptb',
        '/opt/DiscordPtb',
        `${homeDir}/.local/bin/DiscordPtb`
    ],

    [
        '/usr/share/discord-canary',
        '/usr/lib64/discord-canary',
        '/opt/discord-canary',
        '/opt/DiscordCanary',
        `${homeDir}/.local/bin/DiscordCanary`
    ],
]

module.exports = { discordPaths }