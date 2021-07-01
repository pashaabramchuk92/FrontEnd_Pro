// Понял, что findIndex в методе __getNoteById не подходил
// Я не хотел отходить от своей изначальной реализации и что-то намудрил с проверкой на уникальнось.
// Вроде как работает, если id изменяемой заметки равен id любой другой заметки, то замена текста не происходит

var todo = {
    _notes: [],

    get notes() {
        return [...this._notes];
    },

    createNote(createNumNote, text, id, status = false) {
        for (let i = 0; i < createNumNote; i++) {
            const note = {
                text: text || `Задача ${i + 1}`,
                id: id || this._getRandomId(),
                status
            };
            this._notes.push(note);
        }
    },

    deleteNote(noteNum, noteIdArr, confirm) {
        const del = this._getNoteById(noteNum, noteIdArr).id;

        for (let i = 0; i < this._notes.length; i++) {
            if(del === this._notes[i].id && confirm) {
                this._notes.splice(i, 1);
            }
        }
    },

    _checkUniq(noteNum, noteIdArr) {
        let acc = [];
        for (let i = 0; i < noteIdArr.length; i++) {
            if(noteNum - 1 === i) {
                this._notes.forEach((note) => {
                    if(note.id === noteIdArr[i]) {
                        acc.push(note)
                    }
                });
                return acc.length;
            }
        }
    },

    editNote(noteNum, textNote, noteIdArr, confirm) {
        if(confirm && textNote && this._checkUniq(noteNum, noteIdArr) === 1) {
            this._getNoteById(noteNum, noteIdArr).text = textNote;
        }
    },

    isComplete(noteNum, noteIdArr) {
        this._getNoteById(noteNum, noteIdArr).status = true;
    },

    _getRandomId() {
        return Math.round(Math.random() * 100);
    },

    _getNoteArrById() {
        const acc = todo._notes.map((item) => {
            return item.id;
        });
        return acc;
    },

    get getNoteArrById() {
        return this._getNoteArrById;
    },

    _getNoteById(noteNum, noteIdArr) {
        let res;
        for (let i = 0; i < noteIdArr.length; i++) {
            if(noteNum - 1 === i) {
                this._notes.forEach((note) => {
                    if(note.id === noteIdArr[i]) {
                        res = note;
                    }
                });
            }
        }
        return res;
    },

    getStatistic() {
        return this._notes.reduce((acc, note) => {
            if(note.status === true) {
                acc.completed++;
            } else {
                acc.uncompleted++;
            }
            return acc;
        }, {
            completed: 0,
            uncompleted: 0
        });
    }
}

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
    isComplete: {
        writable: false,
        configurable: false
    },
    _getRandomId: {
        writable: false,
        configurable: false,
        enumerable: false
    },
    _getNoteById: {
        writable: false,
        configurable: false,
        enumerable: false
    },
    _getNoteArrById: {
        writable: false,
        configurable: false,
        enumerable: false
    }
});

const confirmation = () => confirm('Вы уверенны?');
const createNewNote = +prompt('Сколько будет задач?');
todo.createNote(createNewNote);

const changeNote = +prompt('Какую задачу меняем? (введите номер)', 1);
const newNoteText = prompt('Какая будет новая задача?');
todo.editNote(changeNote, newNoteText, todo.getNoteArrById(), confirmation());

const completeNote = confirm('Вы завершили задачу?');
if(completeNote) {
    const completeNoteNum = +prompt('Какую? (введите номер)', 1);
    todo.isComplete(completeNoteNum, todo.getNoteArrById());
}

const removeNote = +prompt('Какую задачу удаляем? (введите номер)', 1);
todo.deleteNote(removeNote, todo.getNoteArrById(), confirmation());

console.log(todo.notes);
console.log(todo.getStatistic());
