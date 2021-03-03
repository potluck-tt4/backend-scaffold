const db = require("../data/db-config");
const { v4: uuidv4 } = require("uuid");

function findBy(filter) {
    return db("items").where(filter);
}

async function add(itemObject) {
    const [newItem] = await db("items as i").insert(
        {
            ...itemObject,
            item_id: uuidv4(),
        },
        "item_id",
        "name"
    );
    return newItem;
}

async function update(itemId, newUserID) {
    const item = await db("items as i")
        .select("i.name")
        .where("i.item_id", itemId)
        .update({ user_id: newUserID }, [
            "i.name",
            "i.item_id",
            "i.user_id",
            "i.potluck_id",
        ]);
    return item;
}

function remove(itemId) {
    return db("items").where({ item_id: itemId }).del();
}

module.exports = { findBy, add, update, remove };
