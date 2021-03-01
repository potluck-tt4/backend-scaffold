const db = require("../data/db-config");
const { v4: uuidv4 } = require("uuid");

function findById(id) {
    return db("potlucks as p")
        .leftJoin("items as i", "i.potluck_id", "p.potluck_id")
        .leftJoin("guests as g", "p.potluck_id", "g.potluck_id")
        .leftJoin("users as u", "u.user_id", "g.user_id")
        .select("p.location", "p.timestamp", "p.potluck_id", "p.user_id")
        .where("p.potluck_id", id);
}

async function add(newPotluck) {
    const [id] = await db("potlucks").insert(
        { ...newPotluck, potluck_id: uuidv4() },
        "potluck_id"
    );
    console.log(id);
    return findById(id);
}

module.exports = {
    add,
    findById,
};
