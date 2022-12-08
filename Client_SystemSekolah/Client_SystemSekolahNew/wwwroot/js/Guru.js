//get data kelas untuk guru
$(document).ready(function () {
    $('#GuruTable').DataTable({
        ajax: {
            url: 'https://localhost:7215/api/JadwalGuru/3',
            // url : 'https://localhost:7215/api/JadwalGuru/${IdGuru}',
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("token"),
            },
        },
        columns: [
            { data: 'matpel', },
            { data: 'kelas', },
            { data: 'jadwal_day', },
            { data: 'jadwal_hours', },
        ],
        dom: 'Bfrtip',
        buttons:['colvis', 'pdf','excel']
    });
});


//get kelas untuk update nilai
$(document).ready(function () {

    $('#UpdateNilaiTable').DataTable({
        ajax: {
            url: `https://localhost:7215/api/UpdateNilai/1`,
            //url: `https://localhost:7215/api/UpdateNilai/${IdGuru}`,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("token"),
            },
        },
        columns: [

            { data: 'nama', },
            { data: 'kelas', },
            { data: 'matpel', },
            { data: 'nilai_harian', },
            { data: 'nilai_Uts', },
            { data: 'nilai_Uas', },
            { data: 'nilai_ratarata', },
            {
                data: null,
                "render": function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-primary" onclick="editNilai(${data.id_siswa},${data.id_nilai},${data.id_guru})" data-bs-toggle="modal" data-bs-target="#editNilai">EDIT</button>`;
                }
            }
        ],
        
        dom: 'Bfrtip',
        buttons: ['colvis', 'pdf', 'excel']
        
    });
});


//Edit nilai
function editNilai(id_siswa,id_nilai, id_guru) {
    //console.log(id,nama)
    $.ajax({
        url: `https://localhost:7215/api/UpdateNilai/siswa/${id_siswa}/${id_guru}`,
        //url: 'https://localhost:7215/api/UpdateNilai/${idGuru},${Name}',
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `
            <input type="hidden" class="form-control" id="hideId" readonly placeholder="" value="0">
            <p>Nilai Harian: </p><input type="text" class="form-control" id="nilaiHarian" placeholder="${res.data[0].nilai_harian}" value="${res.data[0].nilai_harian}">
            <p>Nilai UTS: </p><input type="text" class="form-control" id="nilaiUTS" placeholder="${res.data[0].nilai_Uts}" value="${res.data[0].nilai_Uts}">
            <p>Nilai UAS: </p><input type="text" class="form-control" id="nilaiUAS" placeholder="${res.data[0].nilai_Uas}" value="${res.data[0].nilai_Uas}">
            <p>Nilai Rata-Rata: </p><input type="text" class="form-control" id="nilaiRata" placeholder="${res.data[0].nilai_ratarata}" value="${res.data[0].nilai_ratarata}">

            <button type= "button" class= "btn-primary" id= "editButton" onclick="saveNilai(${res.data[0].id_matpel},${res.data[0].id_siswa},${res.data[0].id_nilai})">Save Changes</button>
            `;
        $("#editData").html(temp);
        console.log(res)
    }).fail((err) => {
        console.log(err);
    });
}

function saveNilai(id_Matpel,id_siswa,id_nilai) {
    
    const Nilai_Harian = $('#nilaiHarian').val();
    const Nilai_UTS = $('#nilaiUTS').val();
    const Nilai_UAS = $('#nilaiUAS').val();
    const Nilai_rata_rata = $('#nilaiRata').val();


    
    //var res = {  Nilai_Harian, Nilai_UTS, Nilai_UAS, Nilai_rata_rata };
    console.log(id_siswa, id_Matpel, id_nilai)
    $.ajax({
        url: `https://localhost:7215/api/Nilai`,
        type: "PUT",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            id: id_nilai,
            nilai_Harian: Nilai_Harian,
            nilai_UTS: Nilai_UTS,
            nilai_UAS: Nilai_UAS,
            nilai_rata_rata: Nilai_rata_rata,
            id_Matpel: id_Matpel,
            niS_Siswa: id_siswa
        }),
        success: function () {
            console.log('data berhasil di simpan')
            Swal.fire(
                'Good job!',
                'Data Berhasil Diedit!',
                'success'
            ); setTimeout(function () {
                location.reload();
            }, 3000);
        },
        error: function () {
            console.log('gagal')
        }
    });
}


// Profile Guru

    $.ajax({
        url: `https://localhost:7215/api/Guru/4`,
        // url : 'https://localhost:7215/api/JadwalGuru/${IdGuru}',
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': "Bearer " + sessionStorage.getItem("token"),
        },

    }).done((res) => {
        let temp = "";
        
        temp += `
        <p>nama: </p><input type="text" class="form-control"  value="${res.data.name}" readonly >
        
        <p>Jenis Kelamin: </p><input type="text" class="form-control"  value="${res.data.gender}" readonly >
        <p>Tempat Lahir: </p><input type="text" class="form-control" value="${res.data.place_Of_Birth}"readonly >
        <p>Tanggal Lahir: </p><input type="text" class="form-control" value="${res.data.date_Of_Birth}"readonly >
        <p>Alamat: </p><input type="text" class="form-control"  value="${res.data.address}"readonly >
        <p>No.Telepon: </p><input type="text" class="form-control" value="${res.data.noTelp}"readonly >
        <p>Email: </p><input type="text" class="form-control"  value="${res.data.email}"readonly >
        <p>NIP: </p><input type="text" class="form-control"  value="${res.data.nip}" readonly >

        <button type="button" class="btn btn-outline-primary" onclick="editProfile(${res.data.id})" data-bs-toggle="modal" data-bs-target="#editProfileModal">EDIT PROFILE</button>
        <button type="button" class="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#changePasswordModal">CHANGE PASSWORD</button>
            `;
        $("#ProfilGuru").html(temp);
    }).fail((err) => {
        console.log(err);
    });


//Edit Profile

function editProfile(id) {
        //console.log(id,nama)
        $.ajax({
            url: `https://localhost:7215/api/Guru/4`,
            
            type: "GET"
        }).done((res) => {
            let temp = "";
            temp += `
            <input type="hidden" class="form-control" id="hideId" readonly placeholder="" value="0">
            <p>Nama: </p><input type="text" class="form-control" id="nama" placeholder="${res.data.name}" value="${res.data.name}">
            
            <p>Jenis Kelamin: </p><input type="text" class="form-control" id="gender" value="${res.data.gender}" value="${res.data.gender}" >
            <p>Tempat Lahir: </p><input type="text" class="form-control" id="tempat" placeholder="${res.data.place_Of_Birth}" value="${res.data.place_Of_Birth}">
            <p>Tanggal Lahir: </p><input type="text" class="form-control" id="tanggal" placeholder="${res.data.date_Of_Birth}" value="${res.data.date_Of_Birth}">
            <p>Alamat: </p><input type="text" class="form-control" id="alamat" placeholder="${res.data.address}" value="${res.data.address}">
            <p>No.Telepon: </p><input type="text" class="form-control" id="noTelp" placeholder="${res.data.noTelp}" value="${res.data.noTelp}">
            <p>Email: </p><input type="text" class="form-control" id="email" placeholder="${res.data.email}" value="${res.data.email}">
            <p>NIP: </p><input type="text" class="form-control" id="nip" placeholder="${res.data.nip}" value="${res.data.nip}">
            <button type= "button" class= "btn-primary" id= "editButton" onclick="saveProfile(${res.data.id})">Save Changes</button>

            `;
            $("#editProfile").html(temp);
            console.log(res)
        }).fail((err) => {
            console.log(err);
        });
}

function saveProfile(id) {
    console.log(id)
    const Nama = $('#nama').val();
    const NIP = $('#nip').val();
    const Gender = $('#gender').val();
    const Tempat_Lahir = $('#tempat').val();
    const Tanggal_Lahir = $('#tanggal').val();
    const Alamat = $('#alamat').val();
    const NoTelp = $('#noTelp').val();
    const Email = $('#email').val();

    console.log(Nama, NIP, Gender, Tempat_Lahir, Tanggal_Lahir, Alamat,NoTelp,Email)
    $.ajax({
        url: `https://localhost:7215/api/Guru/${id}`,
        type: "PUT",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            id: id,
            name: Nama,
            gender: Gender,
            place_Of_Birth: Tempat_Lahir,
            date_Of_Birth: Tanggal_Lahir,
            address: Alamat,
            noTelp: NoTelp,
            email: Email,
            nip: NIP,
        }),
        
        success: function (data) {
            if (data.message == 'Change Password Failed') {
                
                Swal.fire(
                    'LOL!',
                    'Data GAGAL Diedit!',
                    'error'
                ); setTimeout(function () {
                    location.reload();
                }, 3000);
            }
            console.log('data berhasil di simpan')
            Swal.fire(
                'Good job!',
                'Data Berhasil Diedit!',
                'success'
            ); setTimeout(function () {
                location.reload();
            }, 3000);
            console.log(data)
        },
        error: function () {
            console.log('gagal')
        }
    });
}

//function changePassword(id) {
//    $.ajax({
//        url: `https://localhost:7215/api/Guru/4`,

//        type: "GET"
//    }).done((res) => {
//        let temp = "";
//        temp = `
//        <p>Password Lama: </p><input type="password" class="form-control" id="oldPass"  >
//        <p>Password Baru: </p><input type="password" class="form-control" id="newPass" >
//        <p>Ketik Ulang Password Baru: </p><input type="password" class="form-control" id="retypePass"  >
//        <button type= "button" class= "btn-primary" onclick="savePassword()">Save Changes</button>
  
//        `;
//        $("#ChangePassword").html(temp);
//        console.log(res)
//    }).fail((err) => {
//        console.log(err);
//    });
//}

//function savePasswordGuru() {
//    const formData = {
//        id: 4,
//        oldPassword: $('#OldPassword-guru').val(),
//        password: $('#Password-guru').val(),
//        retypePassword: $('#confirmPassword-guru').val(),
//    }
//    //const Old = $('#oldPass').val();
//    //const New = $('#newPass').val();
//    //const retype = $('#retypePass').val();

//    //console.log(id, Old, New, retype)
//    $.ajax({
//        url: `https://localhost:7215/api/Guru/ChangePassword`,
//        method: "PUT",

//        dataType: "json",
//        data: formData,
        
//        success: function (data) {
            
//            if (data.message == 'Failed Update Data') {
//                console.log(data)
//                Swal.fire(
//                    'LOL!',
//                    'Data GAGAL Diedit!',
//                    'error'
//                ); setTimeout(function () {
//                    location.reload();
//                }, 3000);
//            }
//            else if (data.message == 'Retype Password Failed') {
//                console.log(data)
//                Swal.fire(
//                    'LOL!',
//                    'Data TYPO!',
//                    'error'
//                ); setTimeout(function () {
//                    location.reload();
//                }, 3000);
//            }
//            console.log('data berhasil di simpan')
//            Swal.fire(
//                'Good job!',
//                'Data Berhasil Diedit!',
//                'success'
//            ); setTimeout(function () {
//                location.reload();
//            }, 3000);
//            console.log(data)
//        },
//        error: function () {
//            console.log('gagal')
//        }
//    });
//}
//function SavePasswordGuru() {
//    //const formData = {
//    //    id: 5,
//    //    oldPassword: $("#OldPassword-guru").val(),
//    //    retypePassword: $("#confirmPassword-guru").val(),
//    //    password: $("#Password-guru").val(),
//    //};
//    //console.log(formData)
//    const id= 5;
//    const oldPassword= $("#OldPassword-guru").val();
//    const retypePassword= $("#confirmPassword-guru").val();
//    const password = $("#Password-guru").val();
//    $.ajax({
//        url: `https://localhost:7215/api/Guru/ChangePassword`,
//        method: "PUT",
//        dataType: "JSON",
//        data: {
//            id: id,
//            oldPassword: oldPassword,
//            retypePassword: retypePassword,
//            password: password,
            
//            },
//        success: function (data) {
//            if (data.message == "Change Password Failed") {
//                Swal.fire("Error!", `${data.message}`, "error")
//            } else if (data.message == "Retype Password Failed") {
//                Swal.fire("Error!", `${data.message}`, "error")
//            }
//            else {
//                Swal.fire({ title: "Done!", text: `${data.message}`, icon: "success", confirmButtonText: "Ok" }).then((result) => {
//                    if (result.isConfirmed) {
//                        $('#detailModal').modal('hide')
//                        location.reload();
//                    }
//                })
//            }

//        },
//        error: function (xhr, ajaxOptions, thrownError) {
//            console.log(xhr, ajaxOptions, thrownError)
//        }
//    })
