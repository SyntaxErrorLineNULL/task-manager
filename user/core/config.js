'use strict';

import { readFileSync, accessSync, constants } from 'node:fs';

// EmptyEnvConfigFile return if file is not found.
const EmptyEnvConfigFile = new Error('Empty config file').stack;
const ErrorCheckExistFile = new Error('Failed check file exist').stack;

export class Config {
  #config;
  constructor (envFile) {
    if (envFile === '') {
      return EmptyEnvConfigFile;
    }
    this.#config = new Map();
    this.#loadConfig(envFile);
  }

  #loadConfig (envFile) {
    if (!this.#checkFileExists(envFile)) {
      console.log('file is not exists');
    }

    const encoding = 'utf8';

    try {
      const data = this.#parseEnvRow(readFileSync(envFile, { encoding }));
      Object.keys(data).forEach((key) => {
        // TODO: create a check for borderline cases, such as Boolean type, empty strings, remove spaces at the beginning and end, and work with numbers
        this.#config.set(key, data[key]);
      });
    } catch (error) {
      console.log(`Failed to load ${envFile} ${error.message}`);
    }
  }

  #parseEnvRow (row) {
    const result = {};
    const lines = row.toString().split('\n');
    for (const line of lines) {
      const match = line.match(/^([^=:#]+?)[=:](.*)/);
      if (match) {
        const key = match[1].trim();
        result[key] = match[2].trim().replace(/['"]+/g, '');
      }
    }
    return result;
  }

  all () {
    return this.#config;
  }

  #checkFileExists (file) {
    try {
      accessSync(file, constants.F_OK | constants.R_OK);
      return true;
    } catch (error) {
      console.log('Error check exist env file: ', error);
      return ErrorCheckExistFile;
    }
  }

  getParameter (key) {
    if (this.#config.has(key)) {
      return this.#config.get(key);
    }
    console.log('key is not exist in config');
  }

  setParameter (key, value) {
    this.#config.set(key, value);
  }
}
