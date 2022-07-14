const yargs = require('yargs');
const pkg = require('./package.json');
const {addNote, printNotes, removeNoteById} = require('./notes.controller.js');

yargs.version(pkg.version);

// Добавить заметку
yargs.command({
	command: 'add',
	describe: 'Add new note to list',
	builder: {
		title: {
			type: 'string',
			describe: 'Note title',
			demandOption: true
		}
	},
	handler({ title }) {
		addNote(title)
	}
});

// Показать список заметок
yargs.command({
	command: 'list',
	describe: 'Print all notes',
	async handler() {
		await printNotes();
	}
});

// Удалить заметку по id
yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true
    }
  },
	async handler({ id }) {
    await removeNoteById(id);
  },
});

yargs.parse();
