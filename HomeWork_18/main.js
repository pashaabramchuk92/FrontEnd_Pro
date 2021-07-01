class List {

    dataArr = this._getData();

    constructor(listName) {
        this.listName = listName;
    }

    add(data) {
        this.dataArr.push(data);
        this.addToLocalStorage();
    }

    remove(id) {
        const index = this.findDataById(id);

        if(index >= 0) {
            this.dataArr.splice(index, 1);
            this.addToLocalStorage();
        }
    }

    edit(id, ...args) {
        const index = this.findDataById(id);
        
        if(index >= 0 && args != false) {
            this.addToLocalStorage();
            return this.dataArr[index];
        }
    }

    findDataById(id) {
        return this.dataArr.findIndex((data) => data.id === id);
    }

    addToLocalStorage() {
        const dataJson = JSON.stringify(this.dataArr, null, 1);
        localStorage.setItem(this.listName, dataJson);
    }

    _getData() {
        const data = localStorage.getItem(this.listName);
        return data ? JSON.parse(data) : [];
    }

}

class Todo extends List {

    add(text, id = Date.now()) {
        const data = {
            text,
            id,
            status: false
        };

        super.add(data);
    }

    edit(id, text) {
        const noteById = super.edit(id, text);
        noteById.text = text;
    }

    setComplete(id) {
        const index = this.findDataById(id);

        if(index >= 0) {
            this.dataArr[index].status = true;
            this.addToLocalStorage();
        }
    }

    statistic() {
        return this.dataArr.reduce((acc, data) => {
            if(data.status === true) {
                acc.complete++;
            } 
            return acc;
        }, {
            complete: 0,
            total: this.dataArr.length
        });
    }

}

class ContactList extends List {

    add(name, surname, phone, id = Date.now()) {
        const data = {
            name,
            surname,
            phone,
            id
        };

        super.add(data);
    }

    edit(id, name, surname, phone) {
        const contactById = super.edit(id, name, surname, phone);
        contactById.name = name || contactById.name;
        contactById.surname = surname || contactById.surname;
        contactById.phone = phone || contactById.phone;
    }

    findInfo(value) {
        let res = [];

        this.dataArr.forEach((data) => {
            if(data.name === value || data.surname === value || data.phone === value) {
                res.push(data);
            }
        });

        return res;
    }

}

const todo = new Todo('todo');
const contact = new ContactList('Contact');

todo.add('aaa', 1);
todo.add('bbb', 2);
todo.add('ccc', 3);
todo.edit(2, 'adsasdasd');
todo.setComplete(1);
todo.remove(3);

contact.add('Aaa', 'SurAaa', 801111111, 101);
contact.add('Bbb', 'SurBbb', 802222222, 102);
contact.add('Aaa', 'SurBbb3', 802222223, 103);
contact.add('Ccc', 'SurCcc', 803333333, 104);
contact.edit(102, '', 'Basdasd', 82828282828);
contact.remove(104);

const a = contact.findInfo('Aaa');
console.log(a);

console.log(todo.dataArr);
console.log(contact.dataArr);
console.log(todo.statistic());