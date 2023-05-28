'use strict';

/**
 * trivia controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::trivia.trivia');
