The whole point with redux saga is to provide easy testing
because redux saga makes the code look synchronously but before you mess with it
you must know what a generator function does

Intro to generator

generator function lets you suspend function execution

Function usually use the keyword return! Generators use YIELD to provide a value

so

function\* generatorExample(){
console.log('HEllo i am not called i have turned into an object')
yield 1; //output {value: 1, done:false}
yield 2; //output {value: 2, done:false}
yield 3; //output {value: 3, done:false}
return 11; //output {value: 11, done:true}
yield 12; //output {value: undefined, done:true}
} // this will return 1,2,3

so what happens if this line exist

const generator = generatorExample(); // <- this

You wont get everything at once instead you get an object

so to get the value you do

console.log(generator.next()); hello, and return 1
console.log(generator.next()); return 2
console.log(generator.next()); return 3

You can also treat generator functions as iterators
like this (:

for(const n of generatorExample()){
console.log(n)
}

Powers come when you use variables
// I want 1,4,9,16,
function* squaredNumbers(){
let n= 0;
while(true){
n++;
yield n * n;
}
}

const squaredNumber = squaredNumbers();
console.log(squarednumbers.next().value); 1
console.log(squarednumbers.next().value); 4

Redux saga tutorial

Data Flow(With Sagas)

Components -> Saga(Generator function) -> Actions(Checks Type(String)) -> Reducers

all - to run multiple generater functions

take - calls an action and The Generator is suspended until an action that matches pattern is dispatched.

put - calls an action effect is non-blocking and any errors that are thrown downstream (e.g. in a reducer)
will not bubble back into the saga

fork - Creates an Effect description that instructs the middleware to perform a non-blocking call on fn

call - You think of this as promises with generator functions if promises fail will suspend generater until all promises
are settled

Redux saga acual documentation

** All() Method
Creates an Effect description that instructs the
middleware to run multiple Effects in parallel and
wait for all of them to complete.
It's quite the corresponding API to standard
_/
// ------------------------------------------------
/_
** Call() Method
Creates an Effect description that instructs
the middleware to call the function fn with
args as arguments.

Notes
fn can be either a normal or a Generator function.
The middleware invokes the function and examines
its result.

If the result is an Iterator object, the middleware
will run that Generator function, just like it did with
the startup Generators (passed to the middleware on startup).
****\*\***** Important! **\*\*\***
The parent Generator will be suspended until the child Generator
terminates normally, in which case the parent Generator
is resumed with the value returned by the child Generator.
Or until the child aborts with some error, in which case
an error will be thrown inside the parent Generator.

---

@Params fn
If fn is a normal
function and returns a Promise, the middleware will suspend
the Generator until the Promise is settled. After the promise
is resolved the Generator is resumed with the resolved value,
or if the Promise is rejected an error is thrown inside the Generator.

If the result is not an Iterator object nor a Promise,
the middleware will immediately return that value back to the
saga, so that it can resume its execution synchronously.

When an error is thrown inside the Generator,
if it has a try/catch block surrounding the current
yield instruction, the control will be passed to
the catch block. Otherwise, the Generator aborts
with the raised error, and if this Generator was
called by another Generator, the error
will propagate to the calling Generator.
