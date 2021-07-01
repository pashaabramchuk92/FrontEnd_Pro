const todo = {

    _notes: [],

    get notes() {
        return [...this._notes];
    },

    createNote(text, id = Date.now()) {
        const note = {
            text,
            id,
            status: false,
        };

        this._notes.push(note);
        this._addToLocalStorage('notes', this._notes);
    },

    deleteNote(id) {
        const index = this._findNoteById(id);

        if(index >= 0) {
            this._notes.splice(index, 1);
            this._addToLocalStorage('notes', this._notes);
        }
    },

    editNote(id, text) {
        const index = this._findNoteById(id);

        if(index >= 0 && text) {
            this._notes[index].text = text;
            this._addToLocalStorage('notes', this._notes);
        }
    },

    setComplete(id) {
        const index = this._findNoteById(id);

        if(index >= 0) {
            this._notes[index].status = true;
            this._addToLocalStorage('notes', this._notes);
        }
    },

    _findNoteById(id) {
        return this._notes.findIndex((note) => note.id === id);
    },

    _addToLocalStorage(key, notes) {
        const notesToJSON = JSON.stringify(notes, null, 1);
        return localStorage.setItem(key, notesToJSON);
    },

    checkLocalStorage(key) {
        if(localStorage.getItem(key)) {
            return localStorage.getItem(key);
        }
    }
};

Object.defineProperties(todo, {
    createNote: {
        writable: false,
        configurable: false
    },
    deleteNote: {
        writable: false,
        configurable: false
    },
    editNote: {
        writable: false,
        configurable: false
    },
    setComplete: {
        writable: false,
        configurable: false
    },
});

todo.createNote('hello1', 301);
todo.createNote('hello2', 302);
todo.createNote('hello3', 303);
todo.createNote('hello4', 304);
todo.createNote('hello5', 305);

todo.editNote(304, 'world');
todo.setComplete(303);
todo.deleteNote(301);

console.log(todo.checkLocalStorage('notes'));