const db = require("../data/db-config");
const { v4: uuidv4 } = require("uuid");

function find() {
    return db("users");
}
function findBy(filter) {
    return db("users").where(filter).first();
}

function findById(id) {
    return db("users").where({ user_id: id }).first();
}

async function add(newUser) {
    const [id] = await db("users").insert(
        { user_id: uuidv4(), ...newUser },
        "user_id"
    );
    return findById(id);
}
module.exports = {
    add,
    find,
    findBy,
    findById,
};
