'use strict';

import { connect, StringCodec } from 'nats';

export class PubSub {
  #client;

  #logger;
  constructor (logger) {
    this.#logger = logger;
  }

  Connection (option) {
    this.#logger.info('connection on the nats');

    this.#client.connect(option);

    return new Promise((resolve, reject) => {
      this.#client.on('connect', () => {
        this.#logger.info('Connected to NATS');
        resolve();
      });
      this.#client.on('error', (err) => {
        this.#logger.error(`failed nats connection: ${err.message}`);
        reject(err);
      });
    });
  }

  Publish (subject, data) {
    if (data === null || data === undefined) {
      this.#logger.error();
      // TODO: create error
    }
    const sc = StringCodec();
    return new Promise((resolve, reject) => {
      this.#client.publish(subject, sc.encode(String(data)), (err) => {
        if (err) {
          this.#logger.error(`failed to publish: ${err.message}`);
          return reject(err.message);
        }
        this.#logger.info('successful published');
        resolve();
      });
    });
  }

  Subscribe (subject, queue, data) {
    const sc = StringCodec();
    return new Promise((resolve, reject) => {
      this.#client.subscribe(subject, { queue }, (err, msg) => {

      });
    });
  }

  #closed () {}
}
