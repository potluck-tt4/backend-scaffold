const db = require("../data/db-config");
const { v4: uuidv4 } = require("uuid");
const { add: addToPotluck } = require("../potlucks/potlucks-model");

function find() {
    return db("users");
}
function findBy(filter) {
    return db("users").where(filter).first();
}

function findByUserId(id) {
    return db("users").where({ user_id: id }).first();
}

async function add(newUser) {
    const [id] = await db("users").insert(
        { user_id: uuidv4(), ...newUser },
        "user_id"
    );
    return findByUserId(id);
}

async function addPotluck(potluck) {
    return addToPotluck(potluck);
}

function findPotlucksByUserId(id) {
    return db("potlucks").where({ user_id: id });
}
module.exports = {
    add,
    find,
    findBy,
    findByUserId,
    addPotluck,
    findPotlucksByUserId,
};
