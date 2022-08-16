const router = require('express').Router();
let Item_List = require('../models/item-list.model');

router.route('/').get((req, res) => {
  Item_List.find()
  .then(result => res.json(result))
});

router.route('/init').post((req, res) => {
    const item_list = req.body.item_list;

    Item_List.insertMany([...item_list])
    .then(res.json("POST successfully!"))
});

module.exports = router;