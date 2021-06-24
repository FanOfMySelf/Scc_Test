
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
    self.Oder_Date = ko.observable("2013-06-17T11:56:18.4537687Z");
    self.Last_Update = ko.observable(); 
    
  

    var Product = function (Order_No, Supplier, Stock_Site, Stock_Name, Order_Date, Last_Update)
    {
        self.Order_No = ko.observable(Order_No)
        self.Supplier = ko.observable(Supplier)
        self.Stock_Site = ko.observable(Stock_Site)
        self.Stock_Name = ko.observable(Stock_Name)
        self.Oder_Date = ko.observable();
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
            console.log((data));
            
        }
    });
   // this.Productss=self.Products()
    //console.log(this.Productss());
    for (var i = 0; i < self.Products().length; i++)
    {
       
        //this.Productss.push(new Product(self.Products()[i].Order_No, self.Products()[i].Supplier, self.Products()[i].Stock_Site, self.Products()[i].Stock_Name, self.Products()[i].Order_Date, self.Products()[i].Last_Update))
    }
    //console.log(this.Productss());
}
var viewModel = new ProductOrderViewModel();
ko.applyBindings(viewModel);