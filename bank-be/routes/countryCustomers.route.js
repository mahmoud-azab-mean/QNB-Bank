const express = require("express")
const router = express.Router()

const countryCustomersController = require("../controllers/countryCustomers.controller")

router.post('/countryCreate', countryCustomersController.countryCreate )
router.get('/getCountries/:criteria', countryCustomersController.countriesDetails )
router.get('/:id', countryCustomersController.countryCustomersDetails )
router.put('/:id/update', countryCustomersController.countryUpdate )
router.delete('/:id/delete', countryCustomersController.countryDelete )

router.get('/getAllCustomers/:criteria/', countryCustomersController.countriesCustomersDetails)
router.get('/getCustomer/:id/', countryCustomersController.customerDetails)
router.put('/addCustomer/:id/', countryCustomersController.customerCreate)
router.put('/updateCustomer/:id/:custNo/update', countryCustomersController.customerUpdate )
router.delete('/deleteCustomer/:id/:custNo/delete', countryCustomersController.customerDelete )
router.put('/addCustomerImg/:id/:custNo', countryCustomersController.customerAddImg)



module.exports = router