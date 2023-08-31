function wait(delay) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), delay);
    });
}
  
async function exampleAsyncFunction() { 
    console.log("Start of the async function");

    await wait(3000);
    console.log("After 3 seconds");

    await wait(2000);
    console.log("After another 2 second");

    await wait(1000);
    console.log("End of the async function");
}

exampleAsyncFunction();
