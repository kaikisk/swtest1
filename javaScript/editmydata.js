$(function() {
    var keys = ['telFam', 'telAtten','bloodType','height',
    'weight','medi1','medi2','medi3','medi4','medi5',
    'anam','txtName','txtMail','txtPass'];
    for(var i = 0; i < keys.length; i++) {
        load(keys[i]);
    }
    $('#b').click(function(e){
        for(var i = 0; i < keys.length; i++) {
            save(keys[i]);
        }
        location.href="myData.html";
    });
});
function save(x) {
    localStorage.setItem(x, $('#'+x).val());
}
function load(download1) {
    $( "#"+download1 ).val(localStorage.getItem(download1));
}