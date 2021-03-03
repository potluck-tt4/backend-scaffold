const db = require("../data/db-config");
const { v4: uuidv4 } = require("uuid");

function find() {
    return db("potlucks");
}
function findBy(filter) {
    return db("potlucks").where(filter).first();
}

async function findById(id) {
    const potluck = await db("potlucks as p")
        .select("p.location", "p.timestamp", "p.potluck_id", "p.user_id")
        .where("p.potluck_id", id);

    const guests = await db("guests")
        .select("guest_id", "accepted")
        .where("potluck_id", id);

    const items = await db("items as i")
        .select("i.item_id", "i.user_id", "i.name", "i.potluck_id")
        .where("i.potluck_id", id);
    return { ...potluck, guests: guests, items: items };
}

async function add(newPotluck) {
    const [id] = await db("potlucks").insert(
        { ...newPotluck, potluck_id: uuidv4() },
        "potluck_id"
    );
    return findById(id);
}

async function update(id, changes) {
    //grab the right potluck
    const potluck = await db("potlucks as p")
        .select("p.location", "p.timestamp", "p.potluck_id", "p.user_id")
        .where("p.potluck_id", id)
        .update(changes, ["p.location", "p.timestamp", "p.name"]);
    return potluck;
}

function remove(potluckId, userId) {
    return db("potlucks")
        .where("potluck_id", potluckId)
        .andWhere("user_id", userId)
        .del();
}
module.exports = {
    add,
    findById,
    find,
    update,
    findBy,
    remove,
};
