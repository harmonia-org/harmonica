//* Harmonica
//? Injector Utils

const path = require('path')
const { readdirSync, existsSync, mkdirSync, writeFileSync, rmdirSync, rmSync } = require('fs');

exports.fetchPath = async function(channel) {
    // Handle bad args
    const supportedChannels = ['stable', 'ptb', 'canary'];
    if (!supportedChannels.includes(channel)) { console.error(`Invalid Discord platform given. Supported platforms are: ${supportedChannels.join()}`); process.exit() }
    const channelById = supportedChannels.indexOf(channel)

    let platformModule;
    try { 
        platformModule = require(path.join(__dirname, 'platforms', process.platform));
    } catch(error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            console.error(`Looks like your platform (${process.platform}) is unsupported.`);
            process.exit();
        } else {
            console.error('Something unexpected happened. Please report this error.', error);
            process.exit();
        }
    }

    let discordPath;
    platformModule.discordPaths[channelById].forEach(path => {
        if (existsSync(path)) {
            discordPath = path;
        }
    })

    if (!discordPath) {
        console.log(`Unable to find an installation of Discord ${channel.charAt(0).toUpperCase() + channel.slice(1)}.`);
        process.exit();
    }

    return discordPath;
}

exports.inject = async function(channel) {
    let appPath = await this.fetchPath(channel);

    // Handle build directories on Windows
    if (process.platform === 'win32') {
        const currentBuild = readdirSync(appPath).filter(path => path.startsWith('app-'))

        appPath = path.join(appPath, currentBuild, 'resources', 'app')
    } else {
        appPath = path.join(appPath, 'resources', 'app')
    }

    if (existsSync(appPath)) {
        console.error('Looks like a client mod is already injected into your Discord.')
        process.exit()
    };

    try {
        mkdirSync(appPath);
    } catch(error) {
        if (error.code === 'EACCES') {
            console.error('Looks like we don\'t have permissions in your Discord install folder. Try running the script again with elevated permissions.')
            process.exit()
        } else {
            console.error('Uh oh!', error)
        }
    }

    writeFileSync(path.join(appPath, 'index.js'), `require(\`${path.join(__dirname, '../', 'loader', 'index.js')}\`)`);
    writeFileSync(path.join(appPath, 'package.json'), JSON.stringify({ main: 'index.js', name: 'harmonia' }));
    
    return true;
}

exports.uninject = async function(channel) {
    let appPath = await this.fetchPath(channel);

    // Handle build directories on Windows
    if (process.platform === 'win32') {
        const currentBuild = readdirSync(appPath).filter(path => path.startsWith('app-'))

        appPath = path.join(appPath, currentBuild, 'resources', 'app')
    } else {
        appPath = path.join(appPath, 'resources', 'app')
    }

    if (!existsSync(appPath)) {
        console.error('There is no client mod injected into your Discord.')
        process.exit()
    };

    try {
        if (rmSync) {
            rmSync(appPath, { recursive: true, force: true });
        } else {
            rmdirSync(appPath, { recursive: true, force: true });
        }
    } catch(error) {
        if (error.code === 'EACCES') {
            console.error('Looks like we don\'t have permissions in your Discord install folder. Try running the script again with elevated permissions.')
            process.exit()
        } else {
            console.error('Uh oh!', error)
        }
    }
}