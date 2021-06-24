

function ProductOrderViewModel() {

    //Make the self as 'this' reference
    var self = this;

    self.Order_No = ko.observable("");
    self.Supplier = ko.observable("");
    self.Stock_Site = ko.observable("");
    self.Stock_Name = ko.observable("");
    self.Order_Date = ko.observable("");
    self.Last_Update = ko.observable(""); 
    

    var Product = function (Order_No, Supplier, Stock_Site, Stock_Name, Order_Date, Last_Update)
    {
        self.Order_No = ko.observable(Order_No)
        self.Supplier = ko.observable(Supplier)
        self.Stock_Site = ko.observable(Stock_Site)
        self.Stock_Name = ko.observable(Stock_Name)
        self.Order_Date = ko.observable(Order_Date)
        self.Last_Update = ko.observable(Last_Update)
    };

    self.Product = ko.observable();
    self.Products = ko.observableArray(); // Contains the list of products
    this.Productss = ko.observableArray();
    

    $.ajax({
        //url: '@Url.Action("GetData", "ProductOrder")',
        async :false ,  
        url: MyAppUrlSettings.MyUsefulUrl,
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            self.Products(data); 
            console.log(self.Products());
            
        }
    });
   // this.Productss=self.Products()
   //console.log(self.Products());
    //self.Products.push(new Product(data[i].Order_No, data[i].Supplier, data[i].Stock_Site, data[i].Stock_Name, data[i].Order_Date, data[i].Last_Update))
    
}
var viewModel = new ProductOrderViewModel();
ko.applyBindings(viewModel);