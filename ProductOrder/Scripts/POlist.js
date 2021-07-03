
function ProductOrderViewModel() {

    //Make the self as 'this' reference
    var self = this;

    self.Order_No = ko.observable();
    self.Supplier = ko.observable("");
    self.Stock_Site = ko.observable("");
    self.Stock_Name = ko.observable("");
    self.Order_Date = ko.observable();
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

    // Contains the list of products order head
    self.Product = ko.observable();
    self.Products = ko.observableArray(); 
    self.items = ko.observableArray();

    // Contains the list of products order Line
    self.PO_Line = ko.observable();
    self.PO_Lines = ko.observableArray();
    self.POitems = ko.observableArray();

    self.Part_Number = ko.observable();
    self.Part_Des = ko.observable();
    self.Manufacturer = ko.observable();
    self.Qty_Order = ko.observable();
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

    //Pick selected data in a row when clicked
    self.selected = ko.observable(self.items().data[0])
    self.select = function (item) {
        self.selected(item);
        window.open('/ProductOrder/EditPO?Order_No=' + self.selected().Order_No  + '  ').focus();
        //console.log(self.selected())
    }

    //Redirect to PO detail when clicked in main page
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const OrderNo = urlParams.get('Order_No')
    //console.log(OrderNo);
    self.getSeletedPO = ko.observable(self.items().data[OrderNo-1])


    //Go to main page
    self.GoToMain = function () { window.location.href = '/ProductOrder/ProductOrder';  }


    //Edit PO detail
    self.EditPO = function () {
        $.ajax({
            type: "POST",
            url: Edit_PO_URL.MyEdit_PO_URL,
            data: ko.toJSON(this.selected() ),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                self.Products.removeAll();
                self.Products(data); //Put the response in ObservableArray
                self.Product(null);
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
            self.POitems(data)
            for (var i = 0; i < self.PO_Lines().length; i++)
            {
                if (self.PO_Lines().data[i].Manufacturer == self.selected().Supplier)
                {
                    
                }
            }
            console.log(self.POitems())
        }
    });
   

    self.RemovePOline = function ()
    {

    }
}


var viewModel = new ProductOrderViewModel();
ko.applyBindings(viewModel);