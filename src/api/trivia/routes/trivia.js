'use strict';

/**
 * trivia router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::trivia.trivia');
