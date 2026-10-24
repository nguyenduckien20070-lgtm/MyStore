using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using MyStore.Models;

namespace MyStore.Areas.Admin.Controllers
{
    public class ProductsController : Controller
    {
        private MyStoreEntities db = new MyStoreEntities();

        public ActionResult Index(string keyword, decimal? minPrice, decimal? maxPrice, string sort = "name_asc")
        {
            var query = db.Products.Include(p => p.Category).AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                keyword = keyword.Trim();
                query = query.Where(p => p.ProductName.Contains(keyword)
                                      || p.ProductDescription.Contains(keyword)
                                      || p.Category.CategoryName.Contains(keyword));
            }
            if (minPrice.HasValue) query = query.Where(p => p.ProductPrice >= minPrice.Value);
            if (maxPrice.HasValue) query = query.Where(p => p.ProductPrice <= maxPrice.Value);

            switch (sort)
            {
                case "name_desc": query = query.OrderByDescending(p => p.ProductName); break;
                case "price_asc": query = query.OrderBy(p => p.ProductPrice); break;
                case "price_desc": query = query.OrderByDescending(p => p.ProductPrice); break;
                default: query = query.OrderBy(p => p.ProductName); break;
            }

            ViewBag.Keyword = keyword;
            ViewBag.MinPrice = minPrice;
            ViewBag.MaxPrice = maxPrice;
            ViewBag.Sort = sort;

            return View(query.ToList());
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}