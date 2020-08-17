const countryCustomers = require("../models/countryCustomers.model")

exports.countryCreate = (req, res, next) => {
    let country = new countryCustomers ({
        country: req.body.country,
        customers: []
    })
    country.save((err) => {
        if(err) return next(err)
        res.status(200).json({success: true, msg: "country created successfully"})
    })
}
exports.countriesDetails = (req, res, next) => {
    let query = countryCustomers.find(null) //return all data
    //query.find({field1: value1, generalfield2: value2 })
    //query.sort(field1: -1 or 1)
    //query.where("name.firstName").equals("value")
    //query.where("age").gt("17").lt(66) from to
    ////query.where("favorites").in(["value1", "value2"])
    query.select("country")
    query.exec((err, countries) => {
        if(err) return next(err)
        res.status(200).json({success: true, data: countries})
    }) 
}
exports.countryCustomersDetails = (req, res, next) => {
    countryCustomers.findById(req.params.id, (err, countryCustomers) => {
        if(err) return next(err)
        res.status(200).json({success: true, data: countryCustomers})
    })
}
exports.countryUpdate = (req, res, next) => {
    countryCustomers.findOneAndUpdate(
        {_id: req.params.id }, {$set: req.body}, (err,country) => {
            if(err) return next(err)
            res.status(200).json({success: true, data: country})
        })
}
exports.countryDelete = (req, res, next) => {
    countryCustomers.findOneAndRemove(
        {_id: req.params.id }, (err) => {
            if(err) return next(err)
            res.status(200).json({success: true, msg: "Country Deleted"})
        })
}
exports.customerCreate = (req, res, next) => {
    console.log(req.body)
    countryCustomers.updateOne({_id: req.params.id}, {$push: {customers: {custNo: req.body.custNo, custName: req.body.custName, title: req.body.title, email: req.body.email, gender: req.body.gerder, blocked: false, custImg: req.body.custImg, phone: req.body.phone}}}, (err) => {
            if(err) return next(err)
            res.status(200).json({success: true, msg: "Customer Created Successfully"})
    })
}
exports.customerDetails = (req, res, next) => {

}
exports.customerUpdate = (req, res, next) => {
    countryCustomers.updateOne({_id: req.params.id, "customers.custNo": req.params.custNo}, {$set: {
        //"customers.$.custNo": req.body.custNo,
        "customers.$.custName": req.body.custName,
        "customers.$.title": req.body.title,
        "customers.$.email": req.body.email,
        "customers.$.phone": req.body.phone,
        "customers.$.gender": req.body.gender,
        "customers.$.blocked": false,
    }}, (err, customers) => {
        if(err) return next(err)
            res.status(200).json({success: true, data: customers, msg: "Custome Update Successfully"})
            
    })
}
exports.customerDelete = (req, res, next) => {
    countryCustomers.updateOne({_id: req.params.id}, {$pull: {customers: {custNo: req.params.custNo}}}, {multi: false}, (err) => {
        if(err) return next(err)
            res.status(200).json({success: true, msg: "Custome Delete Successfully"})
            
    })
}
exports.customerAddImg = (req, res, next) => {
    console.log(req.files)
    if(req.files){
        //file upload :imageFile is name of input
        //uplaods folderName
        req.files.imageFile.mv('uploads/' + req.params.custNo + ".jpg", (err) => {
            if(err) 
            //return err
            return res.status(500).send(err)
        })
    countryCustomers.updateOne({_id: req.params.id, "customers.custNo": req.params.custNo}, {$set: {"customers.$.custImg": req.files.imageFile.data}}, (err) => {
        
    })
}else{
    
}
}


exports.customerDetails = (req, res, next) => {
    let query = countryCustomers.find({_id: req.params.id, "customers.custNo": req.params.custNo})
    query.exec((err, customer )=> {
        if(err) return next(err)
            res.status(200).json({success: true, data: customer})
    })
}


exports.countriesCustomersDetails = (req,res,next) => {
    let query = countryCustomers.find(null)
    query.exec((err , countries)=> {
        if(err) return next(err)
        res.status(200).json({success: true, customersData: countries})
    })
}
