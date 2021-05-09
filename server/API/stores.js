const express = require("express");
const router = express.Router();
const { Store, validateStore } = require("../models/store");

router.get("/", async (req, res) => {
  const stores = await Store.find().sort("number");
  res.status(200).send(stores);
  //get all stores
});

router.get("/:storeNumber", async (req, res) => {
  const store = await Store.findOne({ number: req.params.storeNumber });
  if (!store) return res.status(404).send("store not found");

  res.status(200).send(store);
});

router.get("/users/:id", async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (store.users === [])
    return res.status(200).send({ message: "no users logged in this store" });
  res.status(200).send(store.users);
  //get stores users by store id
});

router.post("/", async (req, res) => {
  const { error } = validateStore(req.body);
  if (error) return res.status(404).send(`${error.details[0].message}`);

  let store = await Store.findOne({ number: req.body.number });
  if (store) return res.status(400).send("store number already exists");

  store = new Store({
    number: req.body.number,
    location: req.body.location,
    name: req.body.name,
  });

  const result = await store.save();
  res.status(200).send(result);
  //creat a new store
});

router.put("/users/:id", async (req, res) => {
  // const { error } = validateStore(req.body)
  // if(error) return res.status(400).send(error.details[0].message)
  // in here, validate driver numbers instead ^^^^

  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(400).send("store id not found");

    const result = await Store.findByIdAndUpdate(
      store.id,
      {
        $set: {
          users: req.body.users,
        },
      },
      { new: true }
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
  //update store users by store id
});

router.delete("/:id", async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).send("store id not found");

    const result = await Store.findByIdAndRemove(req.params.id);
    res.send({ deleted: result });
  } catch (err) {
    res.status(404).send(err);
  }
  //delete store by id
});

module.exports = router;
