using API_SystemSekolah.Models;

namespace API_SystemSekolah.Repositories.Interface
{
    public interface IMatpelRepository<Entity, Key> where Entity : class
    {
        public IEnumerable<Matpel> Get();
        public Entity Get(int Id);
        public int Create(Entity entity);
        public int Update(Entity entity);
        public int Delete(int Id);
    }
}
