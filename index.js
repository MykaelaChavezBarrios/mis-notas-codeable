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

    const txtNote = note.value.trim();

    if (txtNote !== '') {
        const uniqueId = Date.now().toString();
        const noteObj = { id: uniqueId, content: txtNote };

        const li = document.createElement('li');
        li.dataset.id = uniqueId;
        li.classList.add('old-note');

        const p = document.createElement('p');
        p.textContent = txtNote;

        li.appendChild(p);
        li.appendChild(addDelBtn(uniqueId));
        li.appendChild(addEdit(uniqueId));
        noteList.appendChild(li);

        saveNote(noteObj);
        note.value = "";
    }
    else {
        alert('Mensaje incorrecto, intentelo de nuevo');
    }
});

/* ---------- borrar nota ----------*/

function addDelBtn(noteId) {
    const delBtn = document.createElement('button');
    delBtn.classList.add('delete-btn');
    delBtn.textContent = 'Borrar';

    delBtn.addEventListener('click', (e) => {
        const itemId = e.target.parentElement.dataset.id;
        const item = noteList.querySelector(`li[data-id="${itemId}"]`);
        noteList.removeChild(item);
        delNote(itemId);
    });

    return delBtn;
}

function addEdit(noteId) {
    const edBtn = document.createElement('button');
    edBtn.classList.add('delete-btn');
    edBtn.textContent = 'Editar';

    edBtn.addEventListener('click', (e) => {
        const itemId = e.target.parentElement.dataset.id;
        const item = noteList.querySelector(`li[data-id="${itemId}"]`);
        editNote(itemId);
    });
    return edBtn;
}

/* ---------- almacenamiento ----------*/

function saveNote(noteObj) {
    let notes = getNotes();
    notes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function loadNotes() {
    const notes = getNotes();

    notes.forEach((noteObj) => {
        const li = document.createElement('li');
        li.dataset.id = noteObj.id;
        li.classList.add('old-note');

        const p = document.createElement('p');
        p.textContent = noteObj.content;

        li.appendChild(p);
        li.appendChild(addDelBtn(noteObj.id));
        li.appendChild(addEdit(noteObj.id));
        noteList.appendChild(li);
    });
}

function delNote(noteId) {
    let notes = getNotes();
    notes = notes.filter((noteObj) => noteObj.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(notes));
}


function editNote(noteId) {
    let notes = getNotes();
    let noteObj = notes.find((note) => note.id === noteId);
    if (noteObj) {
        const newText = prompt('Escribe el nuevo texto');
        if (newText !== null) {
            noteObj.content = newText;
            localStorage.setItem('notes', JSON.stringify(notes));
            location.reload();
        }
    }
}