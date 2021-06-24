using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProductOrder.Models;

namespace ProductOrder.Models
{
    public class ProductRepository : IProductRepository
    {
        private List<ProductOrderList> products = new List<ProductOrderList>();
        private int _nextOrder_No = 1;

        public ProductRepository()
        {
            // Add products for the Demonstration
            Add(new ProductOrderList { Order_No = 3, Supplier = "Electronics", Stock_Site = "ss123ss", Stock_Name = "zxczxc", Order_Date = DateTime.Now, Last_Update = DateTime.Now });
            Add(new ProductOrderList { Order_No = 2, Supplier = "Electrasdasdonics", Stock_Site = "ssasdss", Stock_Name = "zxsdczxc", Order_Date = DateTime.UtcNow, Last_Update = DateTime.Now });
            Add(new ProductOrderList { Order_No = 1, Supplier = "Electxxxzzzzronics", Stock_Site = "ssss", Stock_Name = "zxcsdzxc", Order_Date = DateTime.UtcNow, Last_Update = DateTime.Now });
        }


        public ProductOrderList Add(ProductOrderList item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            // TO DO : Code to save record into database
            item.Order_No = _nextOrder_No++;
            products.Add(item);

            return item;
        }

        public bool Delete(int OrderNo)
        {
            products.RemoveAll(p => p.Order_No == OrderNo);

            return true;
        }

        public ProductOrderList Get(int OrderNo)
        {
            return products.Find(p => p.Order_No == OrderNo);
        }

        public IEnumerable<ProductOrderList> GetAll()
        {
            return products;
        }

        public bool Update(ProductOrderList item)
        {
            {
                if (item == null)
                {
                    throw new ArgumentNullException("item");
                }

                // TO DO : Code to update record into database
                int index = products.FindIndex(p => p.Order_No == item.Order_No);
                if (index == -1)
                {
                    return false;
                }
                products.RemoveAt(index);
                products.Insert(index, item);

                return true;//a
            }
        }


    }
 }