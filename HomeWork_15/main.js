function Student(name, surname, bday) {
    this.name = name;
    this.surname = surname;
    this.bday = bday;
    this.attendance = [...Array(30)];
    this.progress = [...Array(30)];
    this._absentIndex = 0;
    this._gradeCount = 0;
}

Student.prototype.present = function() {
    if(this.attendance.length > this._absentIndex) {
        this.attendance[this._absentIndex] = true;
        this._absentIndex++;
    }
};

Student.prototype.absent = function() {
    if(this.attendance.length > this._absentIndex) {
        this.attendance[this._absentIndex] = false;
        this._absentIndex++;
    }
};

Student.prototype.mark = function(grade) {
    if(this.progress.length > this._gradeCount) {
        this.progress[this._gradeCount] = grade;
        this._gradeCount++;
    }
};

Student.prototype.summary = function() {
    const bad = "Редиска!",
          normal = "Норм, но можно лучше",
          good = "Ути какой молодчинка!",
          goodMark = 9,
          goodPresent = 0.9;

    const avgMarks = this.progress.reduce((sum, mark) => {
        if(mark === undefined) {
            mark = 0;
        }
        return sum + mark;
    }, 0);
    
    const progressResult = avgMarks / this.progress.length.toFixed(1);

    const attendaceResult = this.attendance.filter(x => x).length / this.attendance.length;

    if (progressResult < goodMark && attendaceResult < goodPresent) {
        return bad;
    } else if (progressResult >= goodMark && attendaceResult >= goodPresent) {
        return good;
    } else if (progressResult < goodMark || attendaceResult < goodPresent) {
        return normal;
    }
};


const ivan = new Student('Ivan', 'Petrov', 1992);
const petr = new Student('Petr', 'Ivanov', 1994);

ivan.present();
ivan.present();
ivan.present();
ivan.present();
ivan.absent();

ivan.mark(6);
ivan.mark(5);
ivan.mark(6);
ivan.mark(6);
ivan.mark(7);

console.log(ivan.summary());

petr.present();
petr.present();
petr.present();
petr.present();
petr.present();

petr.mark(10);
petr.mark(10);
petr.mark(10);
petr.mark(10);
petr.mark(10);
console.log(petr.summary());