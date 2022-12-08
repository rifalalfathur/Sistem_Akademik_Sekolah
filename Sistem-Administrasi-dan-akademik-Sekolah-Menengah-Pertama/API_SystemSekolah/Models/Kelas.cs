using System.ComponentModel.DataAnnotations;

namespace API_SystemSekolah.Models
{
    public class Kelas
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
