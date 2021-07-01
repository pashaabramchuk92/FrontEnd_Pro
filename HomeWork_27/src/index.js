class Todo {
    BASE_URL = 'https://todo.hillel.it';
    token = null;
    notesList = [];
    addBtn = document.querySelector('.notes__btn');
    authBtn = document.querySelector('.auth__btn');
    authForm = document.querySelector('.auth');
    notes = document.querySelector('.notes');

    constructor() {
        this.account = document.querySelector('#login');
        this.pass = document.querySelector('#pass');

        this.addBtn.addEventListener('click', async () => {
            const input = document.querySelector('.notes__add');
            await this.add(input.value);
            input.value = '';
        });
    }

    async auth(login, pass) {
        const response = await fetch(`${this.BASE_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                value: login + pass,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // eslint-disable-next-line camelcase
        const { access_token } = await response.json();
        // eslint-disable-next-line camelcase
        this.token = access_token;
        this.renderNotes();
    }

    // eslint-disable-next-line no-magic-numbers
    async add(value, priority = 1) {
        await fetch(`${this.BASE_URL}/todo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value,
                priority,
            })
        });
        this.renderNotes();
    }

    async renderNotes() {
        const response = await fetch(`${this.BASE_URL}/todo`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            }
        });

        const notes = await response.json();
        this.notesList = notes;

        const wrapper = document.querySelector('.wrap');
        const ul = document.createElement('ul');

        this.notesList.forEach(note => {
            const wrapp = document.createElement('div');
            wrapp.classList.add('wrapp');

            const del = document.createElement('button');
            del.textContent = 'delete';

            const complete = document.createElement('button');
            complete.textContent = 'complete';

            const edit = document.createElement('button');
            edit.textContent = 'edit';

            const text = document.createElement('span');
            text.textContent = note.value;
            text.classList.add('note__field');
            const li = document.createElement('li');
            li.classList.add('d-flex');

            del.addEventListener('click', () => {
                this.remove(note._id);
            });
            complete.addEventListener('click', () => {
                this.setComplete(note._id);
                if(note.checked === true) {
                    complete.textContent = 'uncomplete';
                    text.classList.add('complete');
                }
            });

            edit.addEventListener('click', () => {
                const wrap = document.createElement('div');
                const innerInput = document.createElement('input');
                const set = document.createElement('button');
                set.textContent = 'set';
                wrap.append(innerInput, set);
                text.append(wrap);
                edit.setAttribute('disabled', 'disabled');

                set.addEventListener('click', () => {
                    const { value } = innerInput;
                    this.edit(note._id, value);
                });
            });

            wrapp.append(text, edit, del, complete);
            li.append(wrapp);
            ul.prepend(li);
        });
        wrapper.innerHTML = '';
        wrapper.prepend(ul);
    }

    // eslint-disable-next-line no-magic-numbers
    async edit(id, value, priority = 1) {
        await fetch(`${this.BASE_URL}/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value,
                priority,
            })
        });
        this.renderNotes();
    }

    async remove(id) {
        await fetch(`${this.BASE_URL}/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
        });
        this.renderNotes();
    }

    async setComplete(id) {
        await fetch(`${this.BASE_URL}/todo/${id}/toggle`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
        });
        this.renderNotes();
    }
}

const authBtn = document.querySelector('.auth__btn');

authBtn.addEventListener('click', () => {
    const todo = new Todo;
    todo.auth(todo.account, todo.pass);
    todo.authForm.classList.add('d-none');
    todo.notes.hidden = false;
});
