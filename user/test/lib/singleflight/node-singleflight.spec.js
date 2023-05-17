import { SingleFlight } from '../../../lib/SingleFlight/SingleFlight.js';
import { describe, expect, it, jest } from '@jest/globals'

// I took this test from this repository: https://github.com/mustard-mh/node-singleflight
function get(num, errFrom = null, after = 200) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (errFrom != null) {
        reject(new Error('get error from ' + errFrom));
      } else {
        resolve(num);
      }
    }, after);
  });
}

describe('SingleFlight', () => {

  it('Do 10000 times = call once', async () => {
    jest.setTimeout(60000);
    const sf = new SingleFlight();

    let callGet = 0;
    let times = 10000;
    let num = 1;

    let tasks = [];
    for (let i = 0; i < times; i++) {
      tasks.push(sf.Do('get_' + num, async () => {
        callGet++;
        return get(num);
      }));
    }
    let results = await Promise.all(tasks);
    expect(callGet).toBe(1);
    expect(results.length).toBe(times);
    for (let r of results) {
      expect(r).toBe(num);
    }
  });

  it('Do catch error', async () => {
    const sf = new SingleFlight();
    let callGet = 0;
    let times = 10;
    let num = 2;

    let tasks = [];
    for (let i = 0; i < times; i++) {
      tasks.push((async () => {
        try {
          return await sf.Do('get_err', async () => {
            callGet++;
            return get(num, i);
          });
        } catch (e) {
          return e.message;
        }
      })());
    }
    let results = await Promise.all(tasks);
    expect(callGet).toBe(1);
    expect(results.length).toBe(times);
    for (let r of results) {
      expect(r).toBe('get error from 0');
    }
  });

  it('should execute a function once per key in parallel', async () => {
    const sf = new SingleFlight();

    // Create a function that will return a promise that resolves after 1 second.
    const fn = () => new Promise((resolve) => setTimeout(() => resolve('Hello, world!'), 1000));

    // Call the `Do` method twice with the same key.
    const p1 = await sf.Do('key', fn);
    const p2 = await sf.Do('key', fn);

    // Wait for both promises to resolve.
    await Promise.all([p1, p2]);

    // Assert that both promises resolved with the same value.
    expect(p1).toEqual('Hello, world!');
    expect(p2).toEqual('Hello, world!');
  });
});
