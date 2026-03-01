const yargs = require('yargs')

yargs.command({
    command:'add',
    describe:'add new note',
    handler(){
        console.log('add command')
    }
})
yargs.command({
    command:'list',
    describe:'print all nodes',
    handler(){
        console.log('list command')
    }
})
