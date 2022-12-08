using API_SystemSekolah.Context;
using API_SystemSekolah.Models;
using API_SystemSekolah.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace API_SystemSekolah.Repositories.Data
{
    public class JadwalMatpelRepository : IJadwalMatpelRepository <JadwalMatpel,int>
    {
        private MyContext context;
        public JadwalMatpelRepository(MyContext context)
        {
            this.context = context;
        }

        public int Create(JadwalMatpel jadwal)
        {
            context.JadwalMatpels.Add(jadwal);
            var result = context.SaveChanges();
            return result;
        }

        public int Delete(int Id)
        {
            var data= context.JadwalMatpels.Find(Id);
            if (data != null)
            {
                context.JadwalMatpels.Remove(data);
                var result = context.SaveChanges();
                return result;
            }
            return 0;
        }

        public IEnumerable<JadwalMatpel> Get()
        {
            return context.JadwalMatpels.ToList();
        }

        public JadwalMatpel Get(int Id)
        {
            return context.JadwalMatpels.Find(Id);
        }

        public int Update(JadwalMatpel jadwal)
        {
            context.Entry(jadwal).State= EntityState.Modified;
            var result=context.SaveChanges();
            return result;
        }
    }
}
