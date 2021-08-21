//* Harmonica
//? Main Injector File

// Import utils
const util = require('./util');

// Remove node paths from process.argv to save headaches
const args = process.argv.slice(2);

// Handle cli arguments
if (args[0] === '--inject' || args[0] === '-i') {
    const inject = util.inject(args[1])
        .catch(error => { console.error('Something went wrong. Please report this error.', error) })

    if (inject === true) {
        console.log('Injected!')
    }
} else if (args[0] === ('--uninject') || args[0] === '-u') {
    const uninject = util.uninject(args[1])
    .catch(error => { console.error('Something went wrong. Please report this error.', error) })

    if (uninject === true) {
        console.log('Uninjected!')
    }
}

// Cursed syntax - forgive me, JS gods.
else console.error('Invalid arguments.');
