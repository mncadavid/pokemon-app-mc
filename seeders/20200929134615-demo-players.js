'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Players', [
      {
        name: "Juan",
        username: "jccj",
        password: "luke",
        teamId: 1
    },
    {
        name: "Mila",
        username: "mila",
        password: "asdf",
        teamId: 2
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Players', null, {});
  }
};
