const knex = require('./connection');

module.exports = {
    getOneById: function(id) {
        return knex('actors').where('id', id).first();
    },
    getAllByUser: function(owner_id) {
        return knex('actors').where('owner_id', owner_id);
    },
    create: function(actor) {
        return knex('actors').insert(actor).returning();
    },
    delete: function(id) {
        return knex('actors').where('id', id).del();
    },
    update: function(actor, id) {
        return knex('actors').where('id', id).update(actor);
    },
};