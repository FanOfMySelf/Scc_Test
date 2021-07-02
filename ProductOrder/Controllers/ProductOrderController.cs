using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProductOrder.Models;
using System.Web.Script.Serialization;
using System.Data.Entity;

namespace ProductOrder.Controllers
{
    public class ProductOrderController : Controller
    {
        static readonly IProductRepository repository = new ProductRepository();
        private readonly POentity _db = new POentity();
        // GET: ProductOrder
        public ActionResult ProductOrder()
        {
            return View();
        }

        public JsonResult GetAllProducts()
        {
            return Json(repository.GetAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddProduct(ProductOrderList item)
        {
            item = repository.Add(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditProduct(int OrderNo, ProductOrderList product)
        {
            product.Order_No = OrderNo;
            if (repository.Update(product))
            {
                return Json(repository.GetAll(), JsonRequestBehavior.AllowGet);
            }

            return Json(null);
        }

        [HttpPost]
        public string UpdatePO(ProductOrderList product)
        {
            if (!ModelState.IsValid) return "Invalid model";
            _db.Entry(product).State = EntityState.Modified;
            _db.SaveChanges();
            return "Updated successfully";
        }

        public JsonResult DeleteProduct(int OrderNo)
        {

            if (repository.Delete(OrderNo))
            {
                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { Status = false }, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetData()
        {
            using (POentity db = new POentity())
            {
                List<ProductOrderList> POList = db.ProductOrderLists.ToList<ProductOrderList>();
                return Json(new { data = POList }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}