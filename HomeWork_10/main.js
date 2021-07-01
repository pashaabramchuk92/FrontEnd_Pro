// Вроде бы как получилось, что я хотел

var todoList = {
    noteArr: [],
    createNote(text, status = false, id) {
        return {
            text: text,
            status: status,
            id: Date.now()
        }
    },
    deleteNote(noteId) {
        var arr = todoList.noteArr;

        var acc = arr.find(function(item, index) {
            if(item.id === noteId) {   
                arr.splice(index, 1);         
            }
        });
        return arr = acc;
    },
    editNote(noteId, newText) {
        var arr = todoList.noteArr;

        var acc = arr.find(function(item) {
            if(item.id === noteId) {
                item.text = newText;
            }
        });

        return arr = acc;
    },
    isComplete(noteId) {
        var arr = todoList.noteArr;

        var acc = arr.find(function(item) {
            if(item.id === noteId) {
                item.status = true;
            }
        });

        return arr = acc;
    }
}

Object.defineProperties(todoList, {
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
});

todoList.noteArr.push(todoList.createNote('aa'));

todoList.deleteNote(Date.now());
todoList.noteArr.push(todoList.createNote('cc'));

todoList.editNote(Date.now(), 'ndnsns');
todoList.isComplete(Date.now());

todoList.noteArr.push(todoList.createNote('bb'));
console.log(todoList.noteArr);



