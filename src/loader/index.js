//* Harmonica
//? Main Loader File

// Import path
const path = require('path')

// Import the Module constructor
const Module = require('module');

// Import electron as we are running in Discord
const electron = require('electron')

// Fetch Discord's asar from main
const discordAsar = path.join(path.dirname(require.main.filename), '..', 'app.asar');

// Set main file name to Discord's bootstrap main file from the asar
require.main.filename = path.join(discordAsar, 'app_bootstrap/index.js');

// Fetch Discord's package.json from the asar
const discordPackage = require(path.join(discordAsar, 'package.json'));

// Restore the old app path
electron.app.setAppPath(discordAsar);
electron.app.name = discordPackage.name;

// Attempt to load Discord as normal
try {
    console.log('Discord is loading...');
    Module._load(path.join(discordAsar, discordPackage.main), null, true);
} catch(error) {
    console.error("Harmonica failed to load Discord...", error);
}
