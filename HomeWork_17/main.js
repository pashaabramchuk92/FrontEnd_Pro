class Student {

    #attendance = [...Array(30)];
    #progress = [...Array(30)];
    #attenadnceIndex = 0;
    #gradeIndex = 0;    

    constructor(name, surname, bday) {
        this.name = name;
        this.surname = surname;
        this.bday = bday;
    }

    present() {
        if(this.#attendance.length > this.#attenadnceIndex) {
            this.#attendance[this.#attenadnceIndex] = true;
            this.#attenadnceIndex++;
        }
    }

    absent() {
        if(this.#attendance.length > this.#attenadnceIndex) {
            this.#attendance[this.#attenadnceIndex] = false;
            this.#attenadnceIndex++;
        }
    }

    mark(grade) {
        if(this.#progress.length > this.#gradeIndex) {
            this.#progress[this.#gradeIndex] = grade;
            this.#gradeIndex++;
        }
    }

    summary() {
        const bad = "Редиска!";
        const normal = "Норм, но можно лучше";
        const good = "Ути какой молодчинка!";
        const goodMark = 9;
        const goodPresent = 0.9;

        const avgMarks = this.#progress.reduce((sum, mark) => {
            if(mark === undefined) {
                mark = 0;
            }
            return sum + mark;
        }, 0);

        const progressResult = avgMarks / this.#progress.length.toFixed(1);

        const attendaceResult = this.#attendance.filter(x => x).length / this.#attendance.length;

        if (progressResult < goodMark && attendaceResult < goodPresent) {
            return bad;
        } else if (progressResult >= goodMark && attendaceResult >= goodPresent) {
            return good;
        } else if (progressResult < goodMark || attendaceResult < goodPresent) {
            return normal;
        }
    }
}

const ivan = new Student('Ivan', 'Petrov', 1999);
const petr = new Student('Petr', 'Ivanov', 2000);

ivan.mark(10);
ivan.mark(10);
ivan.mark(10);
ivan.mark(10);
ivan.mark(8);
ivan.present();
ivan.present();
ivan.present();
ivan.present();
ivan.present();

petr.mark(1);
petr.mark(2);
petr.mark(1);
petr.mark(3);
petr.mark(4);
petr.present();
petr.absent();
petr.present();
petr.absent();
petr.absent();

console.log(ivan.summary());
console.log(petr.summary());