
exports.up = function(knex, Promise) {
   return knex.schema.createTable('pics', (table) => {
        table.increments('id').primary();
        table.string('url');
        table.integer('listings_id').unsigned()
          .references('listings.id');
    }) 

  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pics')

  
};
