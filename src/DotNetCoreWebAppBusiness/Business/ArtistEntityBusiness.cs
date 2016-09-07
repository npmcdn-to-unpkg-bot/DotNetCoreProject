using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common.Data.Models;
using Core.Common.Extensions;
using Core.Common.Utilities;
using DotNetCoreWebApp.Business;
using DotNetCoreWebAppBusiness.Business.Interfaces;
using DotNetCoreWebAppDataAccess.Repositories;
using DotNetCoreWebAppModels.Models;

namespace DotNetCoreWebAppBusiness.Business
{
    public class ArtistEntityBusiness : EntityBusinessBase<Artist>, IArtistEntityBusiness
    {
        private readonly IArtistsRepository _artistsRepository;
        public ArtistEntityBusiness(IArtistsRepository artistsRepository)
        {
            _artistsRepository = artistsRepository;
        }

        public async Task<Artist> FindEntityById(int id)
        {
            Artist artist = await _artistsRepository.FindEntityById(id);
            return artist;
        }

        public OperationResult ListItems(
            int? pageNumber, int? pageSize, string sortCol, string sortDir, string searchTerms)
        {
            var result = new OperationResult();

            int pageIndex = pageNumber ?? 1;
            int sizeOfPage = pageSize ?? 10;
            sortCol = sortCol ?? "Name";
            sortDir = sortDir ?? "ASC";
            searchTerms = searchTerms.IsNullOrWhiteSpace() ? string.Empty: searchTerms;

            int totalNumberOfRecords;
            int totalNumberOfPages;
            int offset;
            int offsetUpperBound;
            
            var list = FindAllEntitiesByCriteria(
                        pageNumber,
                         pageSize,
                         out totalNumberOfRecords,
                         sortCol,
                        sortDir,
                        out offset,
                        out offsetUpperBound,
                        out totalNumberOfPages,
                        result,
                        searchTerms);
            result.MessagesDictionary.Add("list", list);
            result.MessagesDictionary.Add("searchTerms", searchTerms);
            result.MessagesDictionary.Add("sortCol", sortCol);
            result.MessagesDictionary.Add("sortDir", sortDir);
            return result;
        }

        public async Task<bool> PersistEntity(Artist entity)
        {
            return await _artistsRepository.PersistEntity(entity);
        }

        protected override IEnumerable<Artist> FindAllEntitiesByCriteria(
                    int? pageNumber,
                    int? pageSize,
                    out int totalRecords,
                    string sortColumn,
                    string sortDirection,
                     out int offset,
                    out int offsetUpperBound,
                    out int totalNumberOfPages,
                    OperationResult result,
                    params string[] keywords)
        {
            if (_artistsRepository == null) throw new Exception(nameof(_artistsRepository));
            if (sortColumn.IsNullOrWhiteSpace()) Error.ArgumentNull(nameof(sortColumn));
            if (sortDirection.IsNullOrWhiteSpace()) Error.ArgumentNull(nameof(sortDirection));

            int pageIndex = pageNumber ?? 1;
            int sizeOfPage = pageSize ?? 10;

            var items = _artistsRepository.FindAllEntitiesByCriteria(
                 pageIndex, sizeOfPage, out totalRecords, sortColumn, sortDirection, keywords);

            totalNumberOfPages = (int)Math.Ceiling((double)totalRecords / sizeOfPage);

            offset = (pageIndex - 1) * sizeOfPage + 1;
            offsetUpperBound = offset + (sizeOfPage - 1);
            if (offsetUpperBound > totalRecords) offsetUpperBound = totalRecords;

            result.MessagesDictionary.Add("offset", offset);
            result.MessagesDictionary.Add("pageIndex", pageIndex);
            result.MessagesDictionary.Add("sizeOfPage", sizeOfPage);
            result.MessagesDictionary.Add("offsetUpperBound", offsetUpperBound);
            result.MessagesDictionary.Add("totalNumberOfRecords", totalRecords);
            result.MessagesDictionary.Add("totalNumberOfPages", totalNumberOfPages);

            return items;
        }
    }
}