//  App to learn Basic Concepts of Node.js
// Author : Kemi Patel

// commands to run the notes.app : node app.js add --title='title1' --body='body1'
// node app.js remove --title='title1' 
// node app.js list
// node app.js read --title='title1'

const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')



yargs.version('1.1.0')

//  Creating add command
yargs.command({
    command: 'add',
    describe: 'Adding a note',
    builder: {
        title:{
            describe :' title of the notes ',
            type : 'string',
            demandOption: true
        },
        body:{
            describe : ' body of the notes',
            type: 'string',
            demandOption:true
        }
    },
    handler : function(argv){
       notes.addNote(argv.title,argv.body)
    
    }
})

// Create a Remove command
yargs.command({
    command : 'remove',
    describe : 'Remove a note',
    builder:{
        title:{
            describe : 'Title to remove',
            type : 'string',
            demandOption: true
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title)
    }
})


// Create a List command
yargs.command({
    command : 'list',
    describe : 'list notes',
    handler: function(argv){
        notes.listNotes(argv)
    }
})


// create a read command
yargs.command({
    command: 'read',
    describe: ' Read a specific notes',
    builder:{
        title:{
            describe:'title of note to read',
            type:'string',
            demandOption: true
        }
    },
    handler: function(argv){
        notes.readNote(argv.title)
    }
    
})


yargs.parse()


