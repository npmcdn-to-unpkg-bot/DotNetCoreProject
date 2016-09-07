using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.Data.Interfaces;
using Core.Common.Data.Models;
using DotNetCoreWebApp.EditModels;
using DotNetCoreWebApp.ViewModels;
using DotNetCoreWebAppBusiness.Business.Interfaces;
using DotNetCoreWebAppModels.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreWebApp.Controllers
{

    public class ChinookController : BaseController
    {
        private readonly IArtistEntityBusiness _artistEntityBusiness;

        public ChinookController(
             IArtistEntityBusiness artistEntityBusiness, IHostingEnvironment hostingEnvironment)
        {
            _artistEntityBusiness = artistEntityBusiness;
            this.hostingEnvironment = hostingEnvironment;

        }

        public IActionResult Artists(
            int? pageNumber, int? pageSize, string sortCol,
            string sortDir, string searchTerms)
        {
            return ExecuteExceptionsHandledActionResult(() =>
            {
                OperationResult result = _artistEntityBusiness.ListItems(
                pageNumber, pageSize, sortCol, sortDir, searchTerms);

                ViewBag.offset = result.MessagesDictionary["offset"];
                ViewBag.pageIndex = result.MessagesDictionary["pageIndex"];
                ViewBag.sizeOfPage = result.MessagesDictionary["sizeOfPage"];
                ViewBag.offsetUpperBound = result.MessagesDictionary["offsetUpperBound"];
                ViewBag.totalRecords = result.MessagesDictionary["totalNumberOfRecords"];
                ViewBag.totalNumberOfPages = result.MessagesDictionary["totalNumberOfPages"];
                ViewBag.searchTerms = result.MessagesDictionary["searchTerms"];
                ViewBag.sortCol = result.MessagesDictionary["sortCol"];
                ViewBag.sortDir = result.MessagesDictionary["sortDir"];

                var model = new ArtistViewModel {ArtistsList = result.MessagesDictionary["list"] as IEnumerable<Artist>};

                return View(model);
            });
        }

        public IActionResult EditArtist(int id)
        {
            return ExecuteExceptionsHandledActionResult(() =>
          {
              return View();
          });
        }

        public IActionResult AddArtist()
        {
            return ExecuteExceptionsHandledActionResult(() =>
          {
              return View();
          });
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddArtist(ArtistEditModel model)
        {
            if (model == null) return View();

            return await ExecuteExceptionsHandledAsyncActionResult(async () =>
            {
                var artist = new Artist
                {
                    Name = model.Name,
                    ObjectState = ObjectState.Added,
                    Deleted = false
                };
                await _artistEntityBusiness.PersistEntity(artist);
                return View(model);
            });
        }

        public IActionResult ArtistsAngular()
        {
            return View();
        }

        public ActionResult AppPath()
        {
            string webRootPath = hostingEnvironment.WebRootPath;
            string contentRootPath = hostingEnvironment.ContentRootPath;

            return Content(webRootPath + "\n" + contentRootPath);
        }
    }
}