$(function() {
    var keys = ['telFam', 'telAtten','bloodType','height',
    'weight','medi1','medi2','medi3','medi4','medi5',
    'anam','txtName','txtMail','txtPass'];
    for(var i = 0; i < keys.length; i++) {
        load(keys[i]);
    }
});
function load(download1) {
    $( "#"+download1 ).text(localStorage.getItem(download1));
}