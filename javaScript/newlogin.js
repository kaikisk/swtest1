$(function() {
    $('#registration').click(function(e){
        if ($('#txtName').val()==""||$('#txtMail').val()==""||
            $('#txtPass').val()=="") {
            alert(`名前, メールアドレス, パスワードを全て入力してください
                Please, input your name, e-mail and password`);
            return;
        }
        if ($('#txtPass').val()!=$('#txtPassCheck').val()) {
            alert(`パスワードが一致していません
                Password is not confirmed`);
            return;
        }
        var keys = ['txtName','txtMail','txtPass'];
        for(var i = 0; i < keys.length; i++) {
            save(keys[i]);
        }
        alert(`ユーザーを登録しました
            Registered new account`);
        location.href='menu.html';
    });
});
function save(x) {
    localStorage.setItem(x, $('#'+x).val());
}
function load(download1) {
    $( "#"+download1 ).val(localStorage.getItem(download1));
}
