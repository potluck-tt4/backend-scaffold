exports.up = async (knex) => {
    await knex.schema
        .createTable("users", (table) => {
            table.uuid("user_id").unique().notNullable();
            table.string("username", 200).notNullable().unique();
            table.string("password", 200).notNullable();
            table.timestamps(false, true);
        })
        .createTable("potlucks", (table) => {
            table.uuid("potluck_id").unique().notNullable();
            table
                .uuid("user_id")
                .notNullable()
                .references("user_id")
                .inTable("users");
            table.string("location", 200).notNullable();
            table.string("name", 25).notNullable();
            table.string("timestamp").notNullable();
        })
        .createTable("guests", (table) => {
            table.uuid("guest_id").unique().notNullable();
            table
                .uuid("user_id")
                .notNullable()
                .references("user_id")
                .inTable("users");
            table
                .uuid("potluck_id")
                .notNullable()
                .references("potluck_id")
                .inTable("potlucks");
            table.boolean("accepted").defaultTo(false);
        })
        .createTable("items", (table) => {
            table.uuid("item_id").unique().notNullable();
            table
                .uuid("user_id")
                .references("user_id")
                .inTable("users");
            table
                .uuid("potluck_id")
                .notNullable()
                .references("potluck_id")
                .inTable("potlucks");
            table.string("name").notNullable();
        });
};

exports.down = async (knex) => {
    await knex.schema
        .dropTableIfExists("items")
        .dropTableIfExists("guests")
        .dropTableIfExists("potlucks")
        .dropTableIfExists("users");
};
