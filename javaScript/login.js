$(function () {
    if (localStorage.getItem("txtName") == null) {
        //$('#signin').prop("disabled",true);
        document.getElementById("signin").disabled = true;
    } else {
        //$('#signup').prop("disabled",true);
        document.getElementById("signup").disabled = true;
    }
})
function clickLoginButton () {
        if ($('#txtUserName').val()!=localStorage.getItem("txtName")) {
            alert('Not registered');
            return;
        }
        if ($('#txtPass').val()!=localStorage.getItem("txtPass")) {
            alert('Password is not confirmed');
            return;
        }
        location.href='menu.html';
}
