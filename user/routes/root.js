'use strict';

export default async (fastify, opts) => {
  fastify.post('/', async (request, reply) => {
    console.log('request body: ', request.body);
    return { root: true };
  });
};
