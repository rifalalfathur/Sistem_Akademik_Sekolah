using System.ComponentModel.DataAnnotations;

namespace API_SystemSekolah.ViewModels
{
    public class LoginSiswaViewModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
