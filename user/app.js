'use strict'

import path from 'node:path'
import AutoLoad from '@fastify/autoload'
import Sensible from '@fastify/sensible'
import { join } from 'desm'

export default async function (fastify, opts) {

  // Fastify is an extremely lightweight framework, it does very little for you.
  // Every feature you might need, such as cookies or database coonnectors
  // is provided by external plugins.
  // See the list of recognized plugins  by the core team! https://www.fastify.io/ecosystem/
  // `fastify-sensible` adds many  small utilities, such as nice http errors.
  await fastify.register(Sensible)

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'routes'),
    options: Object.assign({}, opts)
  })
}
