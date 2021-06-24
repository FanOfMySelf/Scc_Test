namespace ProductOrder.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ProductOrderList")]
    public partial class ProductOrderList
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Order_No { get; set; }

        [Required]
        [StringLength(10)]
        public string Supplier { get; set; }

        [Required]
        [StringLength(10)]
        public string Stock_Site { get; set; }

        [Required]
        [StringLength(50)]
        public string Stock_Name { get; set; }

        public DateTime Order_Date { get; set; }

        public DateTime Last_Update { get; set; }
    }
}
