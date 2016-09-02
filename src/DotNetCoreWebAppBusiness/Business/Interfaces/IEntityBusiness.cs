
using Core.Common.Data.Models;
using Core.Common.Data.Interfaces;
using System.Threading.Tasks;

namespace DotNetCoreTestWebProject.Business.Interfaces
{
    public interface IEntityBusiness<TEntity>
        where TEntity : BaseObjectWithState, IObjectWithState, new()
    {

        OperationResult ListItems(
            int? pageNumber, int? pageSize, string sortCol,
            string sortDir, string searchTerms);

        Task<TEntity> FindEntityById(int id);

        Task<bool> PersistEntity(TEntity entity);
    }
}