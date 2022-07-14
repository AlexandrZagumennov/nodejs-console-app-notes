// Импорт
const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

// Путь к БД
const notesPath = path.join(__dirname, 'db.json');

// Добавить заметку
async function addNote(title) {
	const notes = await getNotes();
	const note = {
		title,
		id : Date.now().toString()
	};

	notes.push(note);

	await fs.writeFile('./db.json', JSON.stringify(notes));

	console.log(chalk.green('Note was added!'));
};

async function getNotes() {
	const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []; 
};

// Показать список заметок
async function printNotes() {
	const notes = await getNotes();

	console.log(chalk.bgRed('Here is the list of notes:'));

	notes.forEach(note => {
		console.log(chalk.blue(note.id, note.title));
	});
};

// Удалить заметку по id
async function removeNoteById(id) {
  const notes = await getNotes();
  const updatedNotesList = notes.filter(note => note.id != id);
  await fs.writeFile(notesPath, JSON.stringify(updatedNotesList));
	await printNotes();
};

// Экспорт
module.exports = {
	addNote, printNotes, removeNoteById
};
