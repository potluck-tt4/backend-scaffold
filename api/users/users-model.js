const db = require("../data/db-config");
const { v4: uuidv4 } = require("uuid");
const { findById: findByPotluckId } = require("../potlucks/potlucks-model");

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

async function addPotluck(potluck, user_id) {
    const [id] = await db("potlucks").insert(
        { potluck_id: uuidv4(), user_id, ...potluck },
        "potluck_id"
    );
    return findByPotluckId(id);
}

function findPotlucksByUserId(id) {
    return db("potlucks").where({ user_id: id });
}
module.exports = {
    add,
    find,
    findBy,
    findById,
    findPotlucksByUserId,
    addPotluck,
};
