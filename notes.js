const chalk = require('chalk')
const { Console } = require('console')
const fs = require('fs')
const { title } = require('process')

// Adding a note
const addNote = function(title,body){
    const notes = loadNotes()   // add Notes in notes.json
    
    const duplicateNotes = notes.filter(function(note){   // check whether the title exists
        return note.title === title
    })

    if (duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
    
       saveNotes(notes)
       console.log(chalk.green.inverse("New Note Added!"))
    }else{
        console.log(chalk.red.inverse('Note title already taken!'))
    }

    
}

// Remove a Note

const removeNote = function(title){
    const notes = loadNotes()
    const notesToKeep = notes.filter(function(note){
        return note.title !== title
    })
    saveNotes(notesToKeep)
    console.log(chalk.red.inverse('Notes Removed'))
}

// list notes
const listNotes = function(){
    console.log(chalk.green.inverse("List of Notes"))
    console.log(loadNotes())
}


// read notes
const readNote = function(title){
    console.log(chalk.green.inverse("Details of the note : ",title))
    const notes = loadNotes()
    const titleToRead = notes.filter(function(note){
        return note.title === title
    })
    console.log(titleToRead)
}


const saveNotes = function(notes){  // if notes.json donot exists then create notes.json and add
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)

}
const loadNotes = function(){
    try{
        const databuffer = fs.readFileSync('notes.json')
        const dataJSON = databuffer.toString()
        return JSON.parse(dataJSON)
        
    }catch(e){
        return []
    }
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote: readNote
}