const db = require("../data/db-config");
const { v4: uuidv4 } = require("uuid");

async function findById(id) {
    return (
        db("potlucks as p")
            // .leftJoin("items as i", "i.potluck_id", "p.potluck_id")
            .join("users as u", "u.user_id", "p.user_id")
            .leftJoin("guests as g", "g.potluck_id", "p.potluck_id")
            .select(
                "p.location",
                "p.timestamp",
                "p.potluck_id",
                "p.user_id",
                "g.accepted"
            )
            .where("p.potluck_id", id)
    );
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
