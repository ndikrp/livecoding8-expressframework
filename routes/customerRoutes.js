const express = require('express')
const router = express.Router()

const customerController = require('../controllers/customerController')

router.route("/").get(customerController.getCustomerData).post(customerController.insertUser)
router
    .route("/:id")
    .get(customerController.getCustomerbyId)
    .patch(customerController.updateUser)
    .delete(customerController.deleteUser)

module.exports = router;