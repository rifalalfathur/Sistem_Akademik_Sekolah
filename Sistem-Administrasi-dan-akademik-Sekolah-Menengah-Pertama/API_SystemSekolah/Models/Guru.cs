using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API_SystemSekolah.Models
{
    public class Guru
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Place_Of_Birth { get; set; }
        public string Date_Of_Birth { get; set; }
        public string Address { get; set; }
        public string NoTelp { get; set; }
        public string Email { get; set; }
        public string NIP { get; set; }
        public string Password { get; set; }


        public int Id_Matpel { get; set; }
        [ForeignKey("Id_Matpel")]
        [JsonIgnore]
        public Matpel? Matpels { get; set; }
    }
}
