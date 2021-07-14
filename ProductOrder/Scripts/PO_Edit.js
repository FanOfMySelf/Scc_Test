ko.validation.rules.pattern.message = 'Invalid.';

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
}, true);

function PO_EditViewModel()
{
    var self = this;

    self.Order_No = ko.observable();
    self.Supplier = ko.observable();
    self.Stock_Site = ko.observable();
    self.Stock_Name = ko.observable();
    self.Order_Date = ko.observable();
    self.Last_Update = ko.observable();
    self.Note = ko.observable();
    self.Supplier_name = ko.observable();
    self.Address = ko.observable();
    self.Country = ko.observable()
    self.Post_Code = ko.observable()
    self.Cancel = ko.observable(false);

    self.CancelAll = ko.observable(false)
    //// Contains the list of products order Line
    self.PO_Line = ko.observable();
    self.PO_Lines = ko.observableArray();
    self.items = ko.observableArray();
    self.Product = ko.observable();
    self.Products = ko.observableArray(); 

    self.Part_Number = ko.observable();
    self.Part_Des = ko.observable();
    self.Manufacturer = ko.observable();
    self.Qty_Order = ko.observable();
    self.Buy_Price = ko.observable();
    self.Order_Date = ko.observable();
    self.Memo = ko.observable();
    self.POL_Order_No = ko.observable();

    var PO_Line = function (Part_Number, Part_Des, Manufacturer, Qty_Order, Buy_Price, Order_Date, Memo, POL_Order_No) {
        self.Part_Number = ko.observable(Part_Number);
        self.Part_Des = ko.observable(Part_Des);
        self.Manufacturer = ko.observable(Manufacturer);
        self.Qty_Order = ko.observable(Qty_Order);
        self.Buy_Price = ko.observable(Buy_Price);
        self.Order_Date = ko.observable(Order_Date);
        self.Memo = ko.observable(Memo);
        self.POL_Order_No = ko.observable(POL_Order_No)
        self.Total_Price = ko.computed(function () { })
    }

   

    //GET PO list
    $.ajax({
        async: false,
        url: MyAppUrlSettings.MyUsefulUrl,
        cache: false,
        type: 'GET',
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {

            self.Products(data);
            self.items(data)

        }
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const OrderNo = urlParams.get('Order_No')
    self.getSeletedPO = ko.observable(self.items().data[OrderNo - 1])

    var dateReg = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    self.validateADR = ko.observable(self.getSeletedPO().Address).extend({ required: true, minLength: 5, maxLength: 100 });
    self.validateCT = ko.observable(self.getSeletedPO().Country).extend({ required: true, minLength: 2, maxLength: 12 });
    self.validatePC = ko.observable(self.getSeletedPO().Post_Code).extend({ required: true, minLength: 2, maxLength: 10 });
    self.validateDATE = ko.observable(self.getSeletedPO().Order_Date).extend({
        required: true, 
        pattern: {         
            message: 'Date not valid',
            params: dateReg
        }
    });
   
    //Edit PO detail
    self.EditPO = function () {
        $.ajax({
            async: false,
            type: "POST",
            url: Edit_PO_URL.MyEdit_PO_URL,
            dataType: 'json',
            data: ko.toJSON({ Order_No: self.getSeletedPO().Order_No, Supplier: self.getSeletedPO().Supplier, Stock_Site: self.getSeletedPO().Stock_Site, Stock_Name: self.getSeletedPO().Stock_Name, Order_Date: self.getSeletedPO().Order_Date, Last_Update: self.getSeletedPO().Last_Update, Note: self.getSeletedPO().Note, Supplier_name: self.getSeletedPO().Supplier_name, Address: self.validateADR, Country: self.validateCT, Post_Code: self.validatePC }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                alert("Record Updated Successfully");
                self.GoToMain();
            },
            error: function (err) {
                alert(err.status + " - " + err.statusText);
            }
        });
    };

  

    //Show PO line
    $.ajax({
        async: false,
        url: POhead_URL.MyPOheadURL,
        cache: false,
        type: 'GET',
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {

            self.PO_Lines(data);

        }
    });

   
    //SEPERATE ITEMS AND DATA
    self.POitems = ko.observableArray(Array.from(self.PO_Lines().data))
  

    for (var i = self.POitems().length - 1; i >= 0; i--) {
        if (self.POitems()[i].Order_No != OrderNo) {
            self.POitems().splice(i, 1)
        }
    }

  

    //Edit POline
    self.EditPOline = function () {

        $.ajax({
            async: false,
            type: "POST",
            url: Edit_PO_line.EditPO_line,
            dataType: 'json',
            data: ko.toJSON({ Part_Number: self.POitems().Part_Number, Part_Des: self.POitems().Part_Des, Manufacturer: self.POitems().Manufacturer, Qty_Order: self.POitems().Qty_Order, Buy_Price: self.POitems().Buy_Price, Order_Date: self.POitems().Order_Date, Memo: self.POitems().Memo, Order_No: self.POitems().Order_No }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                alert("Record Updated Successfully");
                self.GoToMain();
            },
            error: function (err) {
                alert(err.status + " - " + err.statusText);
            }
        });
        //self.EditPO()
    };

    self.Cancel_Save_Visible = ko.observable(false)

  

    self.submit = function () {
        if (PO_EditViewModel.errors().length === 0) {
           
            var r = confirm("You can't edit if you press OK")
            if (r == true) {
                alert("Please press Save to update your Purchase order!")
                self.Cancel_Save_Visible(true)
                self.CancelAll(true)
                
            }
            
        }
        else {
            alert('Please fill all the fields.');
            self.Cancel_Save_Visible(false)
            PO_EditViewModel.errors.showAllMessages();
        }
    };


    self.RemovePOline = function (peo) {
        var index = self.POitems.indexOf(peo)
        if (index >= 0) { self.POitems.splice(index, 1) };

    };

    self.AddPOlines = function (a) {
        self.POitems = (Array.from(self.PO_Lines().data))


    };

    self.CancelPO = function () {
        var r = confirm("Do you want to Cancel this PO ?")
        if (r == true) {
            self.getSeletedPO().Cancel = 1;
            alert("This PO is now canceled Auto saving!");
            self.EditPO()
            window.location.href = '/ProductOrder/ProductOrder';
        }

    }

    

    self.PO_price = ko.computed(function () {
        var total = 0
        for (var i = 0; i < self.POitems().length; i++) {
            total += (self.PO_Lines().data[i].Buy_Price * self.PO_Lines().data[i].Qty_Order);
        }
        return total;
    });
};


var view = new PO_EditViewModel();
PO_EditViewModel.errors = ko.validation.group(view);
PO_EditViewModel.errors.showAllMessages(false);
ko.applyBindings(view);