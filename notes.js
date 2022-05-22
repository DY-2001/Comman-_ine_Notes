const { notStrictEqual } = require('assert')
const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.filter((note) => note.title === title)

    if(duplicateNote.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes)
        console.log(chalk.green('Note Successfully added!'))
    }
    else {
        console.log(chalk.red('Note already taken!'))
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((notes) => notes.title !==  title)
    
    if(notes.length === notesToKeep.length) {
        console.log(chalk.red.bold("Note not found!"))
    }
    else {
        saveNote(notesToKeep)
        console.log(chalk.green("Note Removed successfully!"))
    }
    
}

const listAll = () => {
    const notes = loadNotes()
    console.log(chalk.italic.bold("Your Notes :"))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(!note) {
        console.log(chalk.red("No Note found!"))
    }
    else {
        console.log(note.body)
    }
}

const saveNote = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listAll: listAll,
    readNote: readNote
}