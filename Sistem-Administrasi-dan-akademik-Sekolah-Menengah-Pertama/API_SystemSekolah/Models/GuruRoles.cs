using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API_SystemSekolah.Models
{
    public class GuruRoles
    {
        [Key]
        public int Id { get; set; }
        public int Id_Roles { get; set; }
        [ForeignKey("Id_Roles")]
        [JsonIgnore]
        public  Roles? Roless { get; set; }
        public int Id_Guru { get; set; }
        [ForeignKey("Id_Guru")]
        [JsonIgnore]
        public Guru? Gurus { get; set; }

    }
}
