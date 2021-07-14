

function ProductOrderViewModel() {

    //Make the self as 'this' reference
    var self = this;
    

    self.Cancel = ko.observable(false)
   
    //// Contains the list of products order head
    self.Product = ko.observable();
    self.Products = ko.observableArray(); 
    self.items = ko.observableArray();

   

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

    self.PO_Line = ko.observable();
    self.PO_Lines = ko.observableArray();
 

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

            self.Products(data);
            self.items(data)

        }
    });

    //Pick selected data then go to link with that data
    self.selected = ko.observable(self.items().data[0])
    self.select = function (item) {

        self.selected(item);

        window.location.href = ('/ProductOrder/EditPO?Order_No=' + self.selected().Order_No );
        
    }



};

var viewModel = new ProductOrderViewModel();


ko.applyBindings(viewModel);