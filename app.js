// const { demandOption, string } = require("yargs")
const { listenerCount } = require("process")
const yargs = require("yargs")
const { list, specific_Note } = require("./notes.js")
const notes = require("./notes.js")

//customize yargs version
yargs.version('1.1.0')

//add, remove, read, list
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//create remove command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//create list command
yargs.command({
    command: "listAll",
    describe: "list your notes",
    handler() {
        notes.listAll()
    }
})

//create to read a note
yargs.command({
    command: "read",
    describe: "read a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

console.log(yargs.argv)


