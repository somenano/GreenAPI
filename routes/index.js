const express = require('express');
const router = express.Router();
const Snapshot = require('../models/snapshot.js');
const www = require('../bin/www');

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.send('Hello');
});

router.get('/snapshots', async function(req, res, next) {
  let json = {
    dtg: new Date(),
  }

  const key = req.query.key;

  const details = (req.query.details !== undefined && req.query.details.toLowerCase() == 'true' ? true : false);
  if (details == true && key != process.env.KEY) {
    json.success = false;
    json.error = 'This action requires a valid key';
    return res.json(json);
  }

  try {
    
    json.success = true;
    if (details) json.data = www.snapshots_cache.details;
    else json.data = www.snapshots_cache.counts;
    return res.json(json);

  } catch(e) {
    console.error('In router index.js -- /snapshots -- Error caught while quering snapshots db');
    console.error(e);
    json.success = false;
    json.error = 'Unable to complete request at this time';
    return res.json(json);
  }

});

module.exports = router;
