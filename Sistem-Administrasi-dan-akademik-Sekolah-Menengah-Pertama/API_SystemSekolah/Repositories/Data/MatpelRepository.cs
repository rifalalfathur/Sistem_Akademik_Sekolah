using API_SystemSekolah.Context;
using API_SystemSekolah.Models;
using API_SystemSekolah.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace API_SystemSekolah.Repositories.Data
{
    public class MatpelRepository : IMatpelRepository <Matpel, int>
    {
        private MyContext context;

        public MatpelRepository(MyContext myContext)
        {
            context = myContext;
        }
        public int Delete(int Id)
        {
            var data= context.Matpels.Find(Id);
            if (data != null)
            {
                context.Remove(data);
                var result = context.SaveChanges();
                return result;
            }
            return 0;
        }

        public IEnumerable<Matpel> Get()
        {
            return context.Matpels.ToList();
        }

        public Matpel Get(int Id)
        {
            return context.Matpels.Find(Id);
        }

        public int Create(Matpel matpel)
        {
            context.Matpels.Add(matpel);
            var result= context.SaveChanges();
            return result;
        }

        public int Update(Matpel matpel)
        {
            context.Entry(matpel).State = EntityState.Modified;
            var result = context.SaveChanges();
            return result;
        }
    }
}
