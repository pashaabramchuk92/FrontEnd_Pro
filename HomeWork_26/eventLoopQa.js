// 1
console.info("foo"); //1
console.info("bar"); //2
console.info("baz"); //3 
// Все поочереди, так как асинхронности нет

// 2
console.info("foo"); //1
setTimeout(() => console.info("bar"), 1000); //3
console.info("baz"); //2 
// в колстэк попадает контекст выполения foo, выводится foo, удаляется из колстэка
// в колстэк попадет таймаут, планирует выполнение console.info(bar), удаляется из колстэка,
// в колстэк попадает контекст выполения baz, выводится baz, удаляется из колстэка
// console.info(bar) попадает в task queue, event loop выпоняет nextTick, console.info(bar) в event loop, с event loop в колстэк, выполнятеся и удаляется из колстэка


// 3
console.info("foo"); //1
setTimeout(() => console.info("bar"), 0); //3
console.info("baz"); //2 
// в колстэк попадает контекст выполения foo, выводится foo, удаляется из колстэка
// в колстэк попадет таймаут, планирует выполнение console.info(bar), удаляется из колстэка,
// в колстэк попадает контекст выполения baz, выводится baz, удаляется из колстэка
// console.info(bar) попадает в task queue, event loop выпоняет nextTick, console.info(bar) в event loop, с event loop в колстэк, выполнятеся и удаляется из колстэка

// 4
const timer = setInterval(() => {
  console.info("foo"); //2 
  setTimeout(() => clearTimeout(timer), 0);
}, 1000);
setTimeout(() => console.info("bar"), 1000); //3
console.info("baz"); //1
// Сначала выполнятся синхронный код,
// в колстэк попадет интервал, планирует выполнение console.info(foo), планирует таймаут, удаляется из колстэка
// в колстэк попадает таймаут, планирует выполение console.info(bar), удаляется из колстэка
// в колстэк попадает контекст выполения baz, выводится baz, удаляется из колстэка
// попадает в task queue, event loop выпоняет nextTick, console.info(foo) в event loop, с event loop в колстэк, выполнятеся и удаляется из колстэка
// попадает в task queue, event loop выпоняет nextTick, console.info(bar) в event loop, с event loop в колстэк, выполнятеся и удаляется из колстэка


// 5
const timer = setInterval(() => {
  setTimeout(() => {
    console.info("foo"); //3
    clearTimeout(timer);
  }, 0);
}, 1000);
setTimeout(() => console.info("bar"), 1000); //2 
console.info("baz"); //1 
// в колстэк попадет интервал, планирует таймаут, удаляется из колстэка
// в колстэк попадает таймаут, планирует выполение console.info(bar), удаляется из колстэка
// в колстэк попадает контекст выполения baz, выводится baz, удаляется из колстэка
// таймаут попадает в task queue, от туда в event loop, с event loop в колстэк, планирует выполение console.info("foo"), удаляется из колстэка
// console.info(bar) попадает в task queue, от туда в event loop, с event loop в колстэк, выполнятеся и удаляется из колстэка
// console.info(foo) попадает в task queue, от туда в event loop, с event loop в колстэк, выполнятеся и удаляется из колстэка

// 6
Promise.resolve("foo").then((res) => console.info(res)); //2
setTimeout(() => console.info("bar"), 0); //3
console.info("baz"); //1
// в колстэк попадает промис foo, выполняется промис, выполняется then, then планирует console.info(res), удаляется из колстэка, попадает в job queue
// в колстэк попадает таймаут, планирует выполение console.info(bar), удаляется из колстэка
// в колстэк попадает контекст выполения baz, выводится baz, удаляется из колстэка
// т.к. в job queue что-то есть, event loop не выполняет nextTick и в колстэк попадает console.info(res), выводит foo,
// после этого event loop выполняет nextTick, console.info(bar) попадает в task queue, от туда в event loop, с event loop в колстэк, выполнятеся и удаляется из колстэка

// 7
setTimeout(() => console.info("foo"), 0); //5
Promise.resolve("bar").then((res) => console.info(res)); //3
console.info("baz"); //1
setTimeout(() => console.info("foo2"), 0); //6
Promise.resolve("bar2").then((res) => console.info(res)); //4
console.info("baz2"); //2 
//аналогично предыдущему 


// 8
setTimeout(() => Promise.resolve("foo").then((res) => console.info(res)), 1000); //2
Promise.resolve("bar").then((res) => {
  setTimeout(() => console.info(res), 1000); //3
});
console.info("baz"); //1 
// в колстэк попадает таймаут (foo), удаляется из колстэка, попадает в task queue
// в колстэк попадет промис (bar), выполняется промис, выполняется then, который планирует таймаут, удаляется из колстэка, попадает в job queue
// в колстэк попадает контекст выполения baz, выводится baz, удаляется из колстэка
// т.к. задержка одинаковая
// промис (bar) из job queue попадает в колстэк, планирует таймер (bar), удаляется из колстэка, попадает в taks queue (второй в очереди), nextTick
// таймаут(foo) из job queue попадает в event loop, с event loop в колстэк, планирует выполение промиса console.info(res), удаляется из колстэка
// из job queue промис (foo) попадает event loop, с event loop в колстэк, выполяется console.info(res), удаляется из колстэка
// последним в event loop попадает таймаут (bar), потом в колстэк, выполняется, удаляется



// 9
setTimeout(() => Promise.resolve("foo").then((res) => console.info(res)), 1000); //3
Promise.resolve("bar").then((res) => { 
  setTimeout(() => console.info(res), 500); //2
});
console.info("baz") //1 
// Похоже на предыдущее, но из-за меньшей задержки таймаута в промисе, сначала будет console.info из второго таймаута


// 10
(async () => {
    const result = await Promise.resolve("foo");
    console.info(result); //2
  }
)();
setTimeout(() => console.info("bar"), 0); //3
console.info("baz"); //1
//Аналогично предыдущему, async await так же попадают в job queue и nextTick не выполняется, пока в job queue что-то есть


// 11
setTimeout(console.info("foo"), 0); //1
console.info("bar"); //2

(async () => {
  const result = await Promise.resolve("baz"); //3
  console.info(result);
})();

// так как в таймаут первым аргументом передена строка, то выполняется сразу функция 
