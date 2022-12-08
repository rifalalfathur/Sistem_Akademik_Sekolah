$(document).ready(function saveChangePassword() {
    $("#btn_save_password").click(function () {
        const Id = 5;
        const OldPassword = $("#OldPassword-guru").val();
        const RetypePassword = $("#confirmPassword-guru").val();
        const Password = $("#Password-guru").val();



        $.ajax({
            url: `https://localhost:7215/api/Guru/ChangePassword`,
            method: "PUT",
            dataType: "JSON",
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("token"),
            },
            data: JSON.stringify({
                id: Id,
                oldPassword: OldPassword,
                retypePassword: RetypePassword,
                password: Password,

            }),
            
            success: function (data) {
                console.log(data)
                if (data.message == "Change Password Failed") {
                    Swal.fire("Error!", `${data.message}`, "error")
                } else if (data.message == "Retype Password Failed") {
                    Swal.fire("Error!", `${data.message}`, "error")
                }
                else {
                    Swal.fire({ title: "Done!", text: `${data.message}`, icon: "success", confirmButtonText: "Ok" }).then((result) => {
                        if (result.isConfirmed) {
                            $('#detailModal').modal('hide')
                            location.reload();
                        }
                    })
                }

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr, ajaxOptions, thrownError)
            }
        })

    })
})
        
   