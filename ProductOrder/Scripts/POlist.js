
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

    var Product = function (Order_No, Supplier, Stock_Site, Stock_Name, Order_Date, Last_Update, Note, Supplier_name)
    {
        self.Order_No = ko.observable(Order_No)
        self.Supplier = ko.observable(Supplier)
        self.Stock_Site = ko.observable(Stock_Site)
        self.Stock_Name = ko.observable(Stock_Name)
        self.Order_Date = ko.observable();
        self.Last_Update = ko.observable();
        self.Note = ko.observable();
        self.Supplier_name = ko.observable();
    };

    self.Product = ko.observable();
    self.Products = ko.observableArray(); // Contains the list of products
    self.Productss = ko.observableArray();
    self.items = ko.observableArray();
    

    $.ajax({
        //url: '@Url.Action("GetData", "ProductOrder" )',
        async :false ,  
        url: MyAppUrlSettings.MyUsefulUrl,
        cache: false,
        type: 'GET',
        datatype: "json" ,
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            
            self.Products(data);
            self.items(data)
            
        }
    });
    console.log(self.items().data)
    self.selected = ko.observable(self.items().data[0])
    self.select = function (item)
    {
        self.selected(item);
    }
    



}
var viewModel = new ProductOrderViewModel();
ko.applyBindings(viewModel);