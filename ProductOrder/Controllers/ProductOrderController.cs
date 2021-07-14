using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProductOrder.Models;
using System.Web.Script.Serialization;
using System.Data.Entity;
using System.Net;

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

        public ActionResult EditPO()
        {
            return View();
        }

        public ActionResult Test()
        {
            return View(_db.ProductOrderLists.ToList());
        }

        public ActionResult GetPODetail(int? Order_No)
        {
            if (Order_No == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ProductOrderList POL = _db.ProductOrderLists.Find(Order_No);
            if (POL == null)
            {
                return HttpNotFound();
            }
            return View(POL);
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
        public string Update(ProductOrderList polist)
        {
            if (!ModelState.IsValid) return "Invalid model";
            _db.Entry(polist).State = EntityState.Modified;
            _db.SaveChanges();
            return "Updated successfully";
        }

        [HttpPost]
        public string UpdatePOline(ProductOrderLine poline)
        {
            if (!ModelState.IsValid) return "Invalid model";
            _db.Entry(poline).State = EntityState.Modified;
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

        public ActionResult GetPOheadData()
        {
            using (POentity db = new POentity())
            {
                List<ProductOrderLine> POLine = db.ProductOrderLines.ToList<ProductOrderLine>();
                return Json(new { data = POLine }, JsonRequestBehavior.AllowGet);
            }
        }

      
    }
}