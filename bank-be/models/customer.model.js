const mongoose = require("mongoose")

const Schema = mongoose.Schema
const customerSechema = new Schema({
    title: {type: String, require: false, max: 3},
    custName: {type: String, require: true, max: 100},
    email: {type: String, require: true, max: 50},
    phone: {type: String, require: true, max: 15},

})

module.exports = mongoose.model("customer", customerSechema, "customers")





