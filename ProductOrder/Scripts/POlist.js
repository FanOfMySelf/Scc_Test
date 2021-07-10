ko.validation.rules.pattern.message = 'Invalid.';

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
}, true);

function ProductOrderViewModel() {

    //Make the self as 'this' reference
    var self = this;

    self.Order_No = ko.observable();
    self.Supplier = ko.observable();
    self.Stock_Site = ko.observable();
    self.Stock_Name = ko.observable();
    self.Order_Date = ko.observable();
    self.Last_Update = ko.observable();
    self.Note = ko.observable();
    self.Supplier_name = ko.observable();
    self.Address = ko.observable()
    self.Country = ko.observable()
    self.Post_Code = ko.observable().extend({ required: true, minLength: 2, maxLength: 10 });
    
    
   

   
    // Contains the list of products order head
    self.Product = ko.observable();
    self.Products = ko.observableArray(); 
    self.items = ko.observableArray();

    // Contains the list of products order Line
    self.PO_Line = ko.observable();
    self.PO_Lines = ko.observableArray();
   

    self.Part_Number = ko.observable();
    self.Part_Des = ko.observable();
    self.Manufacturer = ko.observable();
    self.Qty_Order = ko.observable().extend({ required: true, min: 0, max: 10 });;
    self.Buy_Price = ko.observable();
    self.Order_Date = ko.observable();
    self.Memo = ko.observable();

    var PO_Line = function (Part_Number,Part_Des,Manufacturer,Qty_Order,Buy_Price,Order_Date,Memo)
    {
        self.Part_Number = ko.observable(Part_Number);
        self.Part_Des = ko.observable(Part_Des);
        self.Manufacturer = ko.observable(Manufacturer);
        self.Qty_Order = ko.observable(Qty_Order);
        self.Buy_Price = ko.observable(Buy_Price);
        self.Order_Date = ko.observable(Order_Date);
        self.Memo = ko.observable(Memo);
        self.Total_Price = ko.computed(    function () { }     )
    }

    var Product = function (Order_No, Supplier, Stock_Site, Stock_Name, Order_Date, Last_Update, Note, Supplier_name, Address, Country, Post_Code) {
        self.Order_No = ko.observable(Order_No)
        self.Supplier = ko.observable(Supplier)
        self.Stock_Site = ko.observable(Stock_Site)
        self.Stock_Name = ko.observable(Stock_Name)
        self.Order_Date = ko.observable(Order_Date);
        self.Last_Update = ko.observable(Last_Update);
        self.Note = ko.observable(Note);
        self.Supplier_name = ko.observable(Supplier_name);
        self.Address = ko.observable(Address);
        self.Country = ko.observable(Country);
        self.Post_Code = ko.observable(Post_Code)
    };

    self.submit = function () {
        if (ProductOrderViewModel.errors().length === 0) {
            alert('Thank you.');
        }
        else {
            alert('Please check your submission.');
            ProductOrderViewModel.errors.showAllMessages();
        }
    };

    //Show PO list
    $.ajax({
        async: false,
        url: MyAppUrlSettings.MyUsefulUrl,
        cache: false,
        type: 'GET',
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            debugger
            Product = data;
            self.Products(Product);
            self.items(Product)
            console.log(Product)
        }
    });
    console.log(self.Products())
    //Pick selected data in a row when clicked
    self.selected = ko.observable(self.items().data[0])
    self.select = function (item) {
        self.selected(item);
        window.location.href = ('/ProductOrder/EditPO?Order_No=' + self.selected().Order_No + '&Supplier=' + self.selected().Supplier +' ');
        
    }
    //self.Products.push(new Product(self.selected().Order_No, self.selected().Supplier, self.selected().Stock_Site, self.selected().Stock_Name, self.selected().Order_Date, self.selected().Last_Update, self.selected().Note, self.selected().Supplier_name, self.validate_Address, self.validate_Country, self.validate_Postcode))

    //Redirect to PO detail when clicked in main page
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const OrderNo = urlParams.get('Order_No')
    self.getSeletedPO = ko.observable(self.items().data[OrderNo - 1])
    //self.getSeletedPO_Country = ko.observable(self.items().data[OrderNo - 1].Country).extend({ required: true, minLength: 2, maxLength: 20 });
    

    //Go to main page
    self.GoToMain = function () { window.location.href = '/ProductOrder/ProductOrder';  }

    self.validate_Country = ko.observable(self.selected().Country).extend({ required: true, minLength: 2, maxLength: 20 });
    self.validate_Address = ko.observable(self.selected().Address).extend({ required: true, minLength: 2, maxLength: 100 });
    self.validate_Postcode = ko.observable(self.selected().Post_Code).extend({ required: true, minLength: 2, maxLength: 10 });

  
    //Edit PO detail
    self.EditPO = function () {
      
        $.ajax({
            async: false,
            type: "POST",
            url: Edit_PO_URL.MyEdit_PO_URL,
            dataType: 'json',
            data: ko.toJSON(self.selected()),
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
    console.log(self.POitems())
    //filter Supplier and Manufacturer
    const Supplier = urlParams.get('Supplier')
    for (var i = self.POitems().length - 1; i >= 0; i--) {
        if (self.POitems()[i].Manufacturer != Supplier && self.POitems()[i].Order_No != OrderNo) {
            self.PO_Lines().data.splice(i, 1)          
            self.POitems().splice(i, 1)  
        }
      
    }
    
    self.RemovePOline = function (peo) {
        var index = self.POitems.indexOf(peo)
        if (index >= 0) { self.POitems.splice(index, 1) };     
       
    };

    self.AddPOlines = function (a) {
        self.POitems = (Array.from(self.PO_Lines().data))
        console.log(self.POitems)
        
    };

    self.PO_price = ko.computed(function () {
        var total  = 0
        for (var i = 0; i < self.POitems().length; i++)
        {
            total += (self.POitems()[i].Buy_Price * self.POitems()[i].Qty_Order);
        }
        return total;
    });   
};

var viewModel = new ProductOrderViewModel();
ProductOrderViewModel.errors = ko.validation.group(viewModel);

ko.applyBindings(viewModel);