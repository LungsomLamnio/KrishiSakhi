const express = require("express");
const router = express.Router();
const farmerController = require("../controllers/farmerController");

// POST /api/farmers/check-or-create
router.post("/check-or-create", farmerController.checkOrCreateFarmer);

module.exports = router;
