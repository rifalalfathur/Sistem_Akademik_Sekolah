using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API_SystemSekolah.Models
{
	public class Matpel
	{
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int Nilai_Harian { get; set; }

        public int Nilai_UTS { get; set; }
        public int Nilai_UAS { get; set; }

        public int Nilai_rata_rata { get; set; }
        public int Id_Jadwal { get; set; }

        [ForeignKey("Id_Jadwal")]
        [JsonIgnore]
        public JadwalMatpel? JadwalMatpels { get; set; }
    }
}

