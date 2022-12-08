using API_SystemSekolah.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace API_SystemSekolah.Context
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> dbContextOptions) : base(dbContextOptions)
            
        {

        }
        public DbSet<Guru> Gurus { get; set; }
        public DbSet<GuruRoles> GuruRoless { get; set; }
        public DbSet<JadwalMatpel> JadwalMatpels { get; set; }
        public DbSet<Kelas> Kelass { get; set; }
        public DbSet<Matpel> Matpels { get; set; }
        public DbSet<Roles> Roless { get; set; }
        public DbSet<Siswa> Siswas { get; set; }

    }
}
