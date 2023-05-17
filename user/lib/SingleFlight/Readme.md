# SingleFlight

---

The SingleFlight class provides a method called Do that executes a given function once per key in parallel, while ensuring that only one instance of the function is executing for a given key at a time. If a function is requested for a specific key, and there is already a function executing for that key, the request is queued, and the result of the original function is returned to all queued requests once it has completed. The class uses a mutex to ensure thread safety and a map to cache the results of executed functions.
Constructor

The constructor for the SingleFlight class takes no arguments.
Methods

The SingleFlight class has the following methods:

    Do(key, fn, ...args)

Executes the function associated with the given key. If the function has already been executed for the given key, returns the cached result instead of executing the function again.

#### Parameters:

    key: The key to use for caching the result of the function.
    fn: The function to execute.
    args: The arguments to pass to the function.

Returns:

    A promise that resolves with the result of the function.


### Example

The following example shows how to use the SingleFlight class to execute a function once per key in parallel:

```javascript
const singleFlight = new SingleFlight();

async function doSomething(key) {
  console.log(`Executing function for key ${key}`);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(key);
    }, 1000);
  });
}

(async() => {
  for (let i = 0; i < 5; i++) {
    singleFlight.Do(i, doSomething, i);
  }

  for (let i = 0; i < 5; i++) {
    await singleFlight.Do(i, doSomething, i);
    console.log(`Result for key ${i}: ${singleFlight.Do(i, doSomething)}`);
  }
})();
```
