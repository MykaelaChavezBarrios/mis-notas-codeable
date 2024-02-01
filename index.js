/* ---------- variables ----------*/

const note = document.getElementById('note');
const addBtn = document.getElementById('addBtn');
const noteList = document.getElementById('noteList');

/* ---------- carga inicial ----------*/

window.addEventListener('load', () => {
    loadNotes();
});

/* ---------- crear nota ----------*/

addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const txtNote = note.value;

    const li = document.createElement('li');
    li.classList.add('old-note');

    const p = document.createElement('p');
    p.textContent = txtNote;

    li.appendChild(p);
    li.appendChild(addDelBtn());
    noteList.appendChild(li);

    saveNote(txtNote);
    note.value = "";
});

/* ---------- borrar nota ----------*/

function addDelBtn() {
    const delBtn = document.createElement('button');
    delBtn.classList.add('delete-btn');
    delBtn.textContent = 'Borrar';

    delBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        noteList.removeChild(item);
        delNote(item.querySelector('p').textContent);
    });

    return delBtn;
}

/* ---------- almacenamiento ----------*/

function saveNote(textNote) {
    let notes = getNotes();
    notes.push(textNote);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function loadNotes() {
    const notes = getNotes();

    notes.forEach((textNote) => {
        const li = document.createElement('li');
        li.classList.add('old-note');

        const p = document.createElement('p');
        p.textContent = textNote;

        li.appendChild(p);
        li.appendChild(addDelBtn());
        noteList.appendChild(li);
    });
}

function delNote(textNote) {
    let notes = getNotes();
    notes = notes.filter((note) => note !== textNote);
    localStorage.setItem('notes', JSON.stringify(notes));
}