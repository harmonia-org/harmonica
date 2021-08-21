//* Harmonica
//? Windows Path Declarations

const path = require('path')

const appData = path.join(process.env.LOCALAPPDATA)

// Specify root Discord directory, as they use build directories
const discordPaths = [
    [
        `${appData}/Discord/`
    ],

    [
        `${appData}/DiscordPtb/`
    ],

    [
        `${appData}/DiscordCanary/`
    ],
]

module.exports = { discordPaths }