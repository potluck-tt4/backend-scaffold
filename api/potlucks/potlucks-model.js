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
    .select("i.item_id", "i.user_id", "i.name", "i.potluck_id")
    .where("i.potluck_id",id);
  return { ...potluck, guests: guests, items: items };
}

async function add(newPotluck) {
  const [id] = await db("potlucks").insert(
    { ...newPotluck, potluck_id: uuidv4() },
    "potluck_id"
  );
  return findById(id);
}

async function findPotlucksByUserId(id) {
  const potluck = await db("potlucks").where({ user_id: id });
  return potluck;
}
async function addGuest(userId, newGuest, potluckId) {
  const newGuestId = uuidv4();
  const [addedGuest] = await db("guests").insert(
    {
      guest_id: newGuestId,
      user_id: newGuest,
      potluck_id: potluckId,
      accepted: false,
    },
    "guest_id"
  );
  return { guest_id: addedGuest };
}

async function updateTime(id, changes) {
  //grab the right potluck
  const potluck = await db("potlucks as p")
    .select("p.location", "p.timestamp", "p.potluck_id", "p.user_id")
    .where("p.potluck_id", id)
    .update(changes, ["p.location", "p.timestamp","p.name"]);
    return potluck;
}

async function updateAccepted(id) {
  //can use filter instead of guest_id
  const guest = db("guests as g")
    .select("g.guest_id", "g.accepted")
    .where("g.guest_id", id)
    .update({
      ...guest,
      accepted: !guests.accepted,
    });
  return guest;
}
async function fetchItems(potluckId){
  return db("items as i").where("i.potluck_id",potluckId)
}
async function addItem(id, name, potluckId) {
  const [newItem] = await db("items as i")
    .where("i.potluck_id", id)
    .insert(
      {
        ...name,
        potluck_id:potluckId,
        user_id:null,
        item_id: uuidv4(),
      },
      "item_id","name"
    );
  return newItem;
}
async function updateItem(id,changes){
  const item = await db("items as i")
    .select("i.name")
    .where("i.item_id",id)
    .update(changes,"i.name");
    return item;
}

module.exports = {
  add,
  findById,
  findPotlucksByUserId,
  find,
  updateTime,
  addGuest,
  updateAccepted,
  addItem,
  updateItem,
  fetchItems
};
