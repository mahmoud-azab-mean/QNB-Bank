customerViewModel = {
    customersData: ko.observableArray ([])
};
var apiMainURL = 'http://localhost:3000/'

function convertBinaryData2Url(binaryData) {
    //binarData images videos doucuments etc
    var base64 = btoa(String.fromCharCode.apply(null, binaryData))
    var url = 'data:image/jpeg;base64/'+ base64
    return url
}
refreshData = () => {
$.getJSON(apiMainURL + "countryCustomers/getAllCustomers/all ", (data) =>{
    data.customersData.forEach( country => {
        country.customers.forEach(customer => {
            if(customer.custImg != undefined){
            //customer.custImg = convertBinaryData2Url(customer.custImg.data)
            // if we work with upload images as files
            customer.custImg = 'http://localhost:3000/images/' + customer.custNo + ".jpg"
            }
            else{
                customer.custImg = apiMainURL + "images/default.png"
            }
        })
    })

    customerViewModel.customersData(data.customersData)
})
}

// add  new Country
// edit   Country 
$("#countryForm").submit((event) => {
    event.preventDefault()
    var $form = $(this),
        country = $("#country").val(),
        notes = $("#notes").val(),
        countryId = $("#countryId").val(),
        opType = $("#formOperationType").val(),
        url = apiMainURL + 'countryCustomers/'
        url += (opType == 'add') ?  'countryCreate': countryId + '/update';
        $.ajax({
            url: url,
            type: (opType == "add") ? "POST" : "PUT",
            dataType: "json",
            data: {_id: countryId , country: country},
            success: (res, textStatus, xhr) => {
                $("#msg").empty().append(res.msg)
                refreshData()
                $("#countryModal").modal("toggle")
                
            },
            error: (xhr, textStatus, error) => {
                $("#msg").empty().append("No data Save Please try again !!!")
            }
        })        
    
})

//remove record or country
$("#removeEntry").submit((event) => {
    event.preventDefault()
    var id = $("#deleteId").val(),
        parentId =$("#parentId").val(),
        type = $("#deleteType").val(),
        url = apiMainURL;
    if(type == "country")
        url = url + 'countryCustomers/' + id + "/delete"
    else if (type == "customer")
        url = url + "countryCustomers/deleteCustomer/" + parentId + "/" + id + "/delete"
    $.ajax({
        url: url,
        type: "DELETE",
        dataType: "json",
        data: "NoDataSent",
        success: (res, textStatus, xhr) => {
            refreshData()
            $("#deleteModal").modal("toggle")
            
        },
        error: (xhr, textStatus, error) => {
            $("#removeMsg").val("No Data Reomoved Please try again : (<br/>" + error)
        }
    })    

}) 
// add new Customer
$("#customerForm").submit((event) => {
    event.preventDefault()
    var $form = $(this),
        opType = $("#cf_formOperationType").val(),
        countryId = $("#cf_countryId").val(),
        customerId = $("#cf_customerId").val(),
        customerCountry = $("#customerCountry").val()
        custNo = $("#custNo").val(),
        custName = $("#custName").val(),
        title = $("#title").val(),
        phone = $("#phone").val(),
        email = $("#email").val(),
        gender = $("#gender").val(),
        imageFile = $("#imageFile").val(),
        jsonData = {custNo: custNo, custName: custName,title: title, phone: phone, email: email, gender: gender},
        url = apiMainURL + 'countryCustomers/',
        url += (opType == 'add') ?  'addCustomer/'+ customerCountry : 'updateCustomer/' + customerCountry + '/'+ custNo + '/update',
        
       // alert(url)
        $.ajax({
            url: url,
            type:  "PUT",
            dataType: "json",
            data: jsonData,
            success: (res, textStatus, xhr) => {
                $("#custMsg").empty().append(res.msg)
                imgForm = new FormData()
                //upload Image
               
                if($("#imageFile").prop("files").length >0 ) {
                    let file = $("#imageFile").prop("files")[0]
                    imgForm.append("imageFile", file)
                    let imgUrl = apiMainURL + "countryCustomers/addCustomerImg/" + customerCountry + "/" + custNo
                    $.ajax({
                        url: imgUrl,
                        type:    "PUT",
                        processData: false,
                        contentType: false,
                        //dataType: "json",
                        data: imgForm,
                        success: (res, textStatus, xhr) => {
                            $("#custMsg").append("<br/>" + res.msg)
                            refreshData()
                            $("#customerModal").modal("toggle")
                        },
                        error: (xhr, textStatus, error) => {
                            $("#custMsg").append("image not save please try again !!!")
                            $("#custMsg").append("<br/>"+ error)
                        }
                    })// end of sending image

                } //end if image exists 
                refreshData()
                
            },
            error: (xhr, textStatus, error) => {
                $("#custMsg").empty().append("No data Save Please try again !!!")
                $("#custMsg").append(error)

            }
        })        
    
})
let setAddCountryModal = () => {
    $("#countryModalTitle").empty().append("Add Country Data");
    $("#formOperationType").val("add");
    $("#countryId").val("")
    $("#country").val("")
}
let setEditCountryModal = (id, country) => {
    $("#countryModalTitle").empty().append("Edit Country Data");
    $("#formOperationType").val("update");
    $("#countryId").val(id)
    $("#country").val(country)
}

let setRemoveModal = (type,id,parentId) => {
    $("#deleteType").val(type)
    $("#deleteId").val(id)
    $("#parentId").val(parentId)
}

let setAddCustomerModal = () => {
    $("#customerModalTitle").empty().append("Add Customer Data");
    $("#formOperationType").val("add");
    $("#cf_countryId").val("")
    $("#cf_customerId").val("")
}
let setEditCustomerModal = (countryId ,custId, custNo, custName, title, phone, email, gender,img ) => {
        $("#cf_formOperationType").val('edit'),
        $("#cf_countryId").val(countryId),
        $("#cf_customerId").val(custId),
        $("#customerCountry").val(countryId)
        $("#custNo").val(custNo),
        $("#custName").val(custName),
        $("#title").val(title),
        $("#phone").val(phone),
        $("#email").val(email),
        $("#gender").val(gender)
}


refreshData()

ko.applyBindings(customerViewModel)

//$.getJSON("../models/customers.json", (data) =>{
//http://localhost:3000/countryCustomers/getAllCustomers/all    