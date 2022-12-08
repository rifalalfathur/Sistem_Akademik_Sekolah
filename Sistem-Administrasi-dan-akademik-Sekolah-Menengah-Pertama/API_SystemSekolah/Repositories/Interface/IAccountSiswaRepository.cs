using API_SystemSekolah.Models;

namespace API_SystemSekolah.Repositories.Interface
{
    public interface IAccountSiswaRepository
    {
        public Siswa Login(string email, string password);
        //public int Register(string fullName, string email, string password, DateTime birthDate);
        public int ChangePassword(string email, string password, string baru);
        public int ForgotPassword(string email, string password, string baru);
    }
}
