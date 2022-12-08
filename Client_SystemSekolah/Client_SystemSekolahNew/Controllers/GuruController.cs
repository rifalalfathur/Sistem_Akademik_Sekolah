using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Client_SystemSekolahNew.Controllers
{
    public class GuruController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult UpdateNilai()
        {
            return View();
        }
        public IActionResult ProfileGuru()
        {
            return View();
        }
    }
}

