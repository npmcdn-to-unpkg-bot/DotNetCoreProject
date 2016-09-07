using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Common.Data.Interfaces;
using Core.Common.Data.Repositories;
using DotNetCoreWebAppModels.Models;
using LinqKit;

namespace DotNetCoreWebAppDataAccess.Repositories
{
    public class ArtistsRepository : EfDataRepositoryBase<Artist, ChinookSqliteDbContext>,
     IArtistsRepository
    {
        public ArtistsRepository()
        { }

        public ArtistsRepository(ChinookSqliteDbContext context)
        {
            _context = context;
        }

        protected override IEnumerable<Artist> FindAllByCriteria(            
            int? pageNumber,
            int? pageSize,
            out int totalRecords,
            string sortColumn,
            string sortDirection,
            params string[] keywords)
        {
            int pageIndex = pageNumber ?? 1;
            int sizeOfPage = pageSize ?? 10;
            if (pageIndex < 1) pageIndex = 1;
            if (sizeOfPage < 1) sizeOfPage = 5;
            int skipValue = (sizeOfPage * (pageIndex - 1));

            Expression<System.Func<Artist, bool>> filterExpression = a => true;
            var predicate = PredicateBuilder.New(filterExpression);
            bool isFilteredQuery = keywords.Any();

            if (isFilteredQuery)
            {
                predicate = filterExpression = a => false;
                foreach (var keyword in keywords)
                {
                    var temp = keyword;
                    if (temp == null) continue;
                    predicate = predicate.Or(p => p.Name.ToLower().Contains(temp.ToLower()));
                }
            }

            totalRecords =
               _context.Artist.AsExpandable().Where(predicate).OrderBy(am => am.Name).Count();

            var artists =
                _context.Artist.AsExpandable()
                    .Where(predicate)
                    .OrderBy($"{sortColumn} {sortDirection}")
                    .Skip(skipValue)
                    .Take(sizeOfPage)
                    .ToList();
            return artists;

        }

        override protected async  Task<Artist> FindSingleEntityById(int id)
        {
            return await  Task.FromResult(_context.Set<Artist>().SingleOrDefault(x => x.ArtistId == id));
        }

        protected override void AddOrUpdate(Artist entity)
        {
            if (entity.ArtistId == default(int) && entity.ObjectState == ObjectState.Added)
            {
                _context.Add(entity);
            }
            else
            {
                _context.Attach(entity);
            }
        }
    }
}