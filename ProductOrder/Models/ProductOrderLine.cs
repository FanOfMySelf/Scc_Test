//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProductOrder.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ProductOrderLine
    {
        public string Part_Number { get; set; }
        public string Part_Des { get; set; }
        public string Manufacturer { get; set; }
        public int Qty_Order { get; set; }
        public decimal Buy_Price { get; set; }
        public string Order_Date { get; set; }
        public string Memo { get; set; }
        public int Order_No { get; set; }
    
        public virtual ProductOrderList ProductOrderList { get; set; }
    }
}
