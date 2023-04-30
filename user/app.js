'use strict';

import AutoLoad from '@fastify/autoload';
import Sensible from '@fastify/sensible'
import { join } from 'desm'

// Pass --options via CLI arguments in command to enable these options.
//module.exports.options = {}

export default async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // Fastify is an extremely lightweight framework, it does very little for you.
  // Every feature you might need, such as cookies or database coonnectors
  // is provided by external plugins.
  // See the list of recognized plugins  by the core team! https://www.fastify.io/ecosystem/
  // `fastify-sensible` adds many  small utilities, such as nice http errors.
  await fastify.register(Sensible)

  // Normally you would need to load by hand each plugin. `fastify-autoload` is an utility
  // we wrote to solve this specific problems. It loads all the content from the specified
  // folder, even the subfolders. Take at look at its documentation, as it's doing a lot more!
  // First of all, we require all the plugins that we'll need in our application.
  await fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'plugins'),
    options: Object.assign({}, opts)
  })

  // Then, we'll load all of our routes.
  await fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'routes'),
    dirNameRoutePrefix: false,
    options: Object.assign({}, opts)
  })
}
