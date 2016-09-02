using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.Data.Models;

using DotNetCoreTestWebProject.Models;
using Microsoft.AspNetCore.Mvc;
using DotNetCoreTestWebProject.Business.Interfaces;

namespace DotNetCoreTestWebProject.Controllers.Api
{
    [Route("api/[controller]")]
    public sealed class ArtistsController : BaseApiController
    {

        private readonly IArtistEntityBusiness _artistEntityBusiness;

        public ArtistsController(
            IArtistEntityBusiness artistEntityBusiness)
        {
            _artistEntityBusiness = artistEntityBusiness;
        }


        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> FindById(int id)
        {
            var artist = await _artistEntityBusiness.FindEntityById(id);
            return Json(artist);
        }
        


        [HttpGet]
        [Route("")]
        public IActionResult GetAll(
            int? pageNumber, int? pageSize, string sortCol,
            string sortDir, string searchTerms)
        {

            OperationResult result = _artistEntityBusiness.ListItems(
                pageNumber, pageSize, sortCol, sortDir, searchTerms);


            var paginationData = new PaginationData
            {
                OffsetFromZero = (int)result.MessagesDictionary["offset"],
                PageNumber = (int)result.MessagesDictionary["pageIndex"],
                PageSize = (int)result.MessagesDictionary["sizeOfPage"],
                OffsetUpperBound = (int)result.MessagesDictionary["offsetUpperBound"],
                TotalNumberOfRecords = (int)result.MessagesDictionary["totalNumberOfRecords"],
                TotalNumberOfPages = (int)result.MessagesDictionary["totalNumberOfPages"],
                SearchTermsCommaSeparated = result.MessagesDictionary["searchTerms"].ToString(),
                SortColumn = result.MessagesDictionary["sortCol"].ToString(),
                SortDirection = result.MessagesDictionary["sortDir"].ToString()
            };
            var list = result.MessagesDictionary["list"] as IEnumerable<Artist>;
            var toReturn = Json(new { list, paginationData });

            return toReturn;
        }

    }
}