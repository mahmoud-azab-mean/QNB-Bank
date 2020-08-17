const express = require("express")
const router = express.Router()

const customerController = require("../controllers/customer.controller")




router.get("/test", customerController.test)
router.get("/:id", customerController.customerDetails)
router.post("/create", customerController.customerCreate)
router.put("/:id/update", customerController.customerUpdate)
router.delete("/:id/delete", customerController.customerDelete)
module.exports  = router