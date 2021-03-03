const db = require("../data/db-config");
const { v4: uuidv4 } = require("uuid");

function findBy(filter) {
    return db("guests").where(filter);
}

async function add(guestObject) {
    const [addedGuest] = await db("guests").insert(
        {
            guest_id: uuidv4(),
            ...guestObject,
        },
        ["guest_id", "user_id", "potluck_id", "accepted"]
    );
    // const userData = await User.findByUserId(newGuest);
    return addedGuest;
}

function update(userId, potluckId) {
    return db("guests")
        .where("user_id", userId)
        .andWhere("potluck_id", potluckId)
        .update({ accepted: true }, "potluck_id");
}

function remove(guestId) {
    return db("guests").where({ guest_id: guestId }).del();
}

module.exports = { findBy, add, remove, update };
