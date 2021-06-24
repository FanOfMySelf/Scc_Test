using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductOrder.Models
{
    interface IProductRepository
    {

        IEnumerable<ProductOrderList> GetAll();
        ProductOrderList Get(int id);
        ProductOrderList Add(ProductOrderList item);
        bool Update(ProductOrderList item);
        bool Delete(int id);
    }
}
