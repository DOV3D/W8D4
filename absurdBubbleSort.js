const readline = require("readline");
//readline is node specific libraray, can't test on Chrone.
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Write this first.
function askIfGreaterThan(el1, el2, callback) {
    // Prompt user to tell us whether el1 > el2; pass true back to the
    // callback if true; else false.
    reader.question(`Is ${el1} bigger than ${el2}?`, (answer) => {
        if (answer === 'yes') {
            // reader.close();
            callback(true);
        } else {
            // reader.close();
            callback(false);
        }
        
    });
    
}

// askIfGreaterThan(1,3, (arg) => {
//     if (arg) {
//         console.log('Thanks!');
//     } else {
//         console.log('no');
//     }
// })

// Once you're done testing askIfGreaterThan with dummy arguments, write this.
function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    // Do an "async loop":
    // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
    //    know whether any swap was made.
    // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
    //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
    //    continue the inner loop. You'll want to increment i for the
    //    next call, and possibly switch madeAnySwaps if you did swap.
    if (i === arr.length-1) {
        outerBubbleSortLoop(madeAnySwaps);
        return;
        // console.log('in outer bubble sort');
        // reader.close(); 
        //we want the reader.close when we invoke it, at the end of the question
        
    }
    

    if (i < arr.length - 1) { // 0
        
        askIfGreaterThan(arr[i], arr[i + 1], (isGreaterThan) => {
            if (isGreaterThan) {
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
                madeAnySwaps = true;
                innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop); //2 [2, 1, 3]
                
            } 
            // else {
            //     innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);//1
            // }
            // madeAnySwaps = false;
            innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
            
        })
        
        // reader.close();
        
    }
    
    
}
// innerBubbleSortLoop([2, 3, 1], 0, false, (arg) => console.log(`It's ${arg}`))
// Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.
// Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.

function absurdBubbleSort(arr, sortCompletionCallback) {
    function outerBubbleSortLoop(madeAnySwaps) {
        // Begin an inner loop if you made any swaps. Otherwise, call
        // `sortCompletionCallback`.
        if (madeAnySwaps === true) {
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
        } else {
            sortCompletionCallback(arr);
        }
    }

    // Kick the first outer loop off, starting `madeAnySwaps` as true.
    outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 2, 1], function (arr) {
    console.log("Sorted array: " + JSON.stringify(arr));
    reader.close();
});

