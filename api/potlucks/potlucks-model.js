const db = require("../data/db-config");

function find() {
    return db("potlucks");
}
function findBy(filter) {
    return db("potlucks").where(filter).first();
}

function findById(id) {
    return db("potlucks").where({ user_id: id }).first();
}

async function add(newPotluck) {
    const [id] = await db("potlucks").insert(newPotluck, "potluck_id");
    return findById(id);
}
module.exports = {
    add,
    find,
    findBy,
    findById,
};
