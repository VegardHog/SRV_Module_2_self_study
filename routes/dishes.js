const express = require("express");
const router = express.Router();
const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let dishes = db.collection('dishes')

router.get('/', async function(req, res, next) {
    let dishlist = await dishes.list();
    res.send(dishlist);
  });

  router.get('/:dishKey', async function(req, res, next) {
    let dishitem = await dishes.get(req.params.dishKey);
    res.send(dishitem);
  });
  

  router.post('/', async function(req, res, next) {
    const { name, country } = req.body;
    await dishes.set(name, {
      name: name,
      country: country
    });
    res.end();
  });

  router.delete('/:dishKey', async function(req, res, next) {
    await dishes.delete(req.params.dishKey);
    res.end();
  });


module.exports = router;