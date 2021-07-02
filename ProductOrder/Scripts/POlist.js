
function ProductOrderViewModel() {

    //Make the self as 'this' reference
    var self = this;

    self.Order_No = ko.observable();
    self.Supplier = ko.observable("");
    self.Stock_Site = ko.observable("");
    self.Stock_Name = ko.observable("");
    self.Oder_Date = ko.observable();
    self.Last_Update = ko.observable();
    self.Note = ko.observable();
    self.Supplier_name = ko.observable();
    self.Address = ko.observable();
    self.Country = ko.observable();
    self.Post_Code = ko.observable();

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
        self.Post_Code = ko.observable(Post_Code);
    };

    self.Product = ko.observable();
    self.Products = ko.observableArray(); // Contains the list of products
    self.Productss = ko.observableArray();
    self.items = ko.observableArray();
    var testObj = {
        OrderNo : 1, product : self.Product

    } 

    //Show PO list
    $.ajax({
        //url: '@Url.Action("GetData", "ProductOrder" )',
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

    //Pick selected data in a row when clicked
    self.selected = ko.observable(self.items().data[0])
    self.select = function (item) {
        self.selected(item);
    }

    //Reload page
    self.ReloadPage = function () { location.reload() }


    //Edit PO detail
    self.EditPO = function () {
        $.ajax({
            type: "POST",
            url: Edit_PO_URL.MyEdit_PO_URL,
            data: ko.toJSON(testObj),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                self.Products.removeAll();
                self.Products(data); //Put the response in ObservableArray
                self.Product(null);
                alert("Record Updated Successfully");
            },
            error: function (err) {
                alert(err.status + " - " + err.statusText);
            }
        });
    };

   

}


var viewModel = new ProductOrderViewModel();
ko.applyBindings(viewModel);