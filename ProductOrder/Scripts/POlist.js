

function ProductOrderViewModel() {

    //Make the self as 'this' reference
    var self = this;

    self.Order_No = ko.observable("");
    self.Supplier = ko.observable("");
    self.Stock_Site = ko.observable("");
    self.Stock_Name = ko.observable("");
    self.Order_Date = ko.observable("");
    self.Last_Update = ko.observable(""); 
    

    var Product = {
        Order_No: self.Order_No,
        Supplier: self.Supplier,
        Stock_Site: self.Stock_Site,
        Stock_Name: self.Stock_Name,
        Order_Date: self.Order_Date,
        Last_Update: self.Last_Update
    };

    self.Product = ko.observable();
    self.Products = ko.observableArray(); // Contains the list of products

    var url = MyAppUrlSettings.MyUsefulUrl;

    $.ajax({
        //url: '@Url.Action("GetAllProducts", "ProductOrder")',
        url: MyAppUrlSettings, MyUsefulUrl,
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            self.Products(data); //Put the response in ObservableArray
            console.log(data);
        }
    });
  
  
    
}
var viewModel = new ProductOrderViewModel();
ko.applyBindings(viewModel);