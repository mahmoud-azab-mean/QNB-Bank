const mongoose = require("mongoose")
const Schema = mongoose.Schema

let countryCustomersSchema = new Schema({
    country: {type: String, required: true, max: 50},
    customers: [
        {
            custName: String,
            custNo: String,
            title: {type: String, max: 5},
            email: {type: String, minLength: 15, maxLength: 60, required: [true, 'Email is Requored']},
            phone: {type: String, max: 15},
            gender: {type: String, max: 1, required: function(){return this.gender =='M' || this.gender =='F'}},
            custImg: {type: Buffer},
            blocked: {type: Boolean,}
        }
    ]
}) // end of Sehema

//expors.module

module.exports = mongoose.model("countryCustomers", countryCustomersSchema, "countryCustomers")