const db = require("../data/db-config");
const { v4: uuidv4 } = require("uuid");

function find() {
  return db("potlucks");
}

async function findById(id) {
  const potluck = await db("potlucks as p")
    .select("p.location", "p.timestamp", "p.potluck_id", "p.user_id")
    .where("p.potluck_id", id);

  const guests = await db("guests")
    .select("guest_id", "accepted")
    .where("potluck_id", id);

  const items = await db("items as i")
    .join("users as u", "u.user_id", "i.user_id")
    .select("i.item_id", "i.user_id", "i.name", "i.potluck_id", "u.username");
  return { ...potluck, guests: guests, items: items };
}

async function add(newPotluck) {
  const [id] = await db("potlucks").insert(
    { ...newPotluck, potluck_id: uuidv4() },
    "potluck_id"
  );
  console.log(id);
  return findById(id);
}

async function findPotlucksByUserId(id) {
  const potluck = await db("potlucks").where({ user_id: id });
  return potluck;
}
async function addGuest(userId, newGuest, potluckId) {
    const newGuestId = uuidv4();
    const [foo] = await db("guests").insert({guest_id:newGuestId,user_id:newGuest, potluck_id:potluckId, accepted:false},"guest_id")
    return {guest_id:foo};
}
    
async function updateTime(id, changes) {
  //grab the right potluck
  const potluck = await db("potlucks as p")
    .select("p.location", "p.timestamp", "p.potluck_id", "p.user_id")
    .where("p.potluck_id", id)
    .update(changes, "p.location", "p.timestamp");
  console.log("after changes", potluck);
}

module.exports = {
  add,
  findById,
  findPotlucksByUserId,
  find,
  updateTime,
  addGuest,
};
