
// async function hi() {
//     let message = await new Promise((res, rej) => {
//         setTimeout(() => {res('Hi!');}, 2500);
//     }).then((message) => {return message;});
//     return message;
// }

const p = new Promise((res, rej) => {
    setTimeout(() => {res('Hi!');}, 2500);
    setTimeout(() => {rej('YOU SUCK');}, 1000);
    // throw 'YOU SUPER SUCK';
}).catch((reason) => {
    console.log(reason);
});

p.then((val) => {
    console.log(val);
}, (err) => {
    throw err;
});

// var x = hi();
// console.log(x);
