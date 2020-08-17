const Customer = require("../models/customer.model")

exports.test = function(req, res) { 
    res.send("Test controller Work")
}
exports.customerDetails = (req, res) => {
    Customer.findById(req.params.id, (err, customer) =>  {
        if(err) return next(err)
        res.send(customer)
    })
}

exports.customerCreate = (req, res) => {
    let customer = new Customer({
        title: req.body.title,
        custName: req.body.custName,
        email: req.body.email,
        phone: req.body.phone,
    })

    customer.save((err => {
        if(err) return next(err)
        res.send("Customer Created Succssfuly")
    }))
}

exports.customerUpdate = (req,res,next) => {
    Customer.findByIdAndUpdate(req.params.id, {$set: req.body},(err, customer) => {
        if(err) return next(err)
        res.send("Customer Updated")
        console.log(customer)
    } )
}

exports.customerDelete = (req, res, next) => {
    Customer.findByIdAndRemove(req.params.id, (err) => {
        if(err) return next(err)
        res.send("Cusomer Deteted")
    })
}



