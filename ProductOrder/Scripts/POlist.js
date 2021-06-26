
ko.extenders.date = function (target, format) {
    return ko.computed({
        read: function () {
            var value = target();
            if (typeof value === "string") {
                value = new Date(value);
            }

            format = typeof format === "string" ? format : undefined;
            value = Globalize.format(value, format);

            return value;
        },
        write: target
    });
}

function ProductOrderViewModel() {

    //Make the self as 'this' reference
    var self = this;

    self.Order_No = ko.observable();
    self.Supplier = ko.observable("");
    self.Stock_Site = ko.observable("");
    self.Stock_Name = ko.observable("");
    self.Oder_Date = ko.observable();
    self.Last_Update = ko.observable();
    
  

    var Product = function (Order_No, Supplier, Stock_Site, Stock_Name, Order_Date, Last_Update)
    {
        self.Order_No = ko.observable(Order_No)
        self.Supplier = ko.observable(Supplier)
        self.Stock_Site = ko.observable(Stock_Site)
        self.Stock_Name = ko.observable(Stock_Name)
        self.Order_Date = ko.observable();
        self.Last_Update = Date()
    };

    self.Product = ko.observable();
    self.Products = ko.observableArray(); // Contains the list of products
    self.Productss = ko.observableArray();

    

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
            console.log(self.Products()[1])
            
        }
    });

    console.log(self.Products()[1])
    
}
var viewModel = new ProductOrderViewModel();
ko.applyBindings(viewModel);