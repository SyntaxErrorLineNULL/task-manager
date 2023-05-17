# Mutex

A `Mutex` (mutual exclusion) is a synchronization object used to protect shared resources. It provides mutual exclusion, allowing only one thread or process to enter and execute critical sections of code at a time.

## Installation

The `Mutex` class is written in JavaScript and can be used in any Node.js environment. You can simply copy the `Mutex` class code and include it in your project.

## Usage

To use the `Mutex` class, follow these steps:

1. Import the `Mutex` class into your module:
   ```javascript
   import { Mutex } from '*/Mutex.js'; // Replace the path with the actual path to the mutex.js file
    ```
2. Create an instance of the Mutex class:
    ```javascript
   const mutex = new Mutex();
    ```
3. Acquire the lock before accessing shared resources:
    ```javascript
    await mutex.acquire();
    // Critical section: Access shared resources here
    ```
4. Release the lock after using the shared resources:
    ```javascript
    mutex.release();
    ```
5. You can check if the mutex is currently locked using the isLocked method:
    ```javascript
      const locked = mutex.isLocked();
    ```
   
## Example

#### Here's an example that demonstrates the usage of the Mutex class:
```javascript
import { Mutex } from '*/Mutex.js'; // Replace the path with the actual path to the mutex.js file

// Create a mutex
const mutex = new Mutex();

async function accessSharedResource() {
  // Acquire the lock
  await mutex.acquire();

  try {
    // Critical section: Access shared resources here
    console.log('Accessing shared resources');
    // ...
  } finally {
    // Release the lock
    mutex.release();
  }
}

// Call the function to access shared resources
accessSharedResource();
```

## API
## Mutex

`acquire(): Promise<void>`

Acquire the lock. If the lock is already held, wait until it is released before acquiring it.

* Returns: A promise that resolves when the lock is acquired.

`release(): void`

Release the lock. If there are other promises waiting to acquire the lock, wake up the next one and give it the lock.
* Throws: An error if the lock is not currently held.

`isLocked(): boolean`

Check if the mutex is currently locked.
* Returns: true if the mutex is locked, false otherwise.

Feel free to adjust the formatting or add more details to the API block as needed.
