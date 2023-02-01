'use strict';

import { connect, StringCodec } from 'nats';

export class PubSub {
  #subject;
  #client;

  #logger;
  constructor (option, logger) {
    this.#client = connect(option);
    this.#logger = logger;
  }

  Publish (data) {
    if (data === null || data === undefined) {
      this.#logger.error();
      // TODO: create error
    }
    const sc = StringCodec();
    return new Promise((resolve, reject) => {
      this.#client.publish(this.#subject, sc.encode(String(data)), (err) => {
        if (err) {
          this.#logger.error(`failed to publish: ${err}`);
          return reject(err);
        }
        this.#logger.info('successful published');
        resolve();
      });
    });
  }

  Subscribe () {}

  #closed () {}
}
