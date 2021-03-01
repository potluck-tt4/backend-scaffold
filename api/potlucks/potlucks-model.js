const db = require("../data/db-config");
const { v4: uuidv4 } = require('uuid');


function findById(id) {
    return db("potlucks as p")
    .join("items as i","p.potluck_id","i.potluck_id")
    .join("guests as g","p.potluck_id","g.potluck_id")
    .join("users as u","u.user_id","g.user_id")
    .select("p.location","p.timestamp","i.name","g.accepted","u.username")
    .where("p.potluck_id",id)
};

async function add(newPotluck) {
    const [id] = await db("potlucks").insert({...newPotluck,potluck_id:uuidv4()}, "potluck_id");
    return findById(id);
};

module.exports = {
    add,
    findById
};
