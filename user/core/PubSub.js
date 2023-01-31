'use strict';

import { connect } from "nats";

export class PubSub {
  #client;
  constructor (option) {
    this.#client = connect(option);
  }

  Publish () {}

  Subscribe () {}
}
