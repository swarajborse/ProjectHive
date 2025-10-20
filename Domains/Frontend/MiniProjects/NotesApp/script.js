const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesGrid = document.getElementById('notes-grid');


document.addEventListener('DOMContentLoaded', loadNotes);

function getNotesFromStorage() {
    return JSON.parse(localStorage.getItem('notes') || '[]');
}

function saveNotesToStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = getNotesFromStorage();
    notes.forEach(note => createNoteElement(note));
}

function createNoteElement(noteText) {
    const noteEl = document.createElement('div');
    noteEl.classList.add('note');

    const contentEl = document.createElement('div');
    contentEl.classList.add('note-content');
    contentEl.textContent = noteText;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    
    deleteBtn.addEventListener('click', () => {
        deleteNote(noteText, noteEl);
    });

    noteEl.appendChild(contentEl);
    noteEl.appendChild(deleteBtn);
    notesGrid.prepend(noteEl); // Add new notes to the top
}

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText === '') {
        alert('Please write a note.');
        return;
    }

    createNoteElement(noteText);

    const notes = getNotesFromStorage();
    notes.push(noteText);
    saveNotesToStorage(notes);

    noteInput.value = '';
}

function deleteNote(noteText, noteEl) {
    const notes = getNotesFromStorage();
    const filteredNotes = notes.filter(note => note !== noteText);
    saveNotesToStorage(filteredNotes);
    notesGrid.removeChild(noteEl);
}

addNoteBtn.addEventListener('click', addNote);