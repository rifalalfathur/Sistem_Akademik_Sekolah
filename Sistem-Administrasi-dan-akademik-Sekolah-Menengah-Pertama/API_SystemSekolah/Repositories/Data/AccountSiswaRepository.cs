using API.Handlers;
using API_SystemSekolah.Context;
using API_SystemSekolah.Models;
using API_SystemSekolah.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace API_SystemSekolah.Repositories.Data
{
    public class AccountSiswaRepository : IAccountSiswaRepository
    {
        private MyContext context;
        public AccountSiswaRepository(MyContext context)
        {
            this.context = context;
        }
        public int ChangePassword(string email, string password, string baru)
        {
            var data = context.Siswas.FirstOrDefault(option => option.Email.Equals(email));
            var has = Hashing.validatePassword(password, data.Password);
            if (data != null)
            {
                data.Password = Hashing.HashPassword(baru);
                context.Entry(data).State= EntityState.Modified;
                var result = context.SaveChanges();
                return result;
            }
            return 0;

        }

        public int ForgotPassword(string email, string password, string baru)
        {
            var data = context.Siswas.FirstOrDefault(option => option.Email.Equals(email) );
            if (data != null && password==baru)
            {
                data.Password = Hashing.HashPassword(password);
                context.Entry(data).State= EntityState.Modified;
                var result = context.SaveChanges();
                return result;


            }
            return 0;
        }

        public Siswa Login(string email, string password)
        {
            var data = context.Siswas.FirstOrDefault(option =>
            option.Email.Equals(email));
            if (data !=null && Hashing.validatePassword(password, data.Password))
            {
                return data;
            }
            return null;
        }
    }
}
