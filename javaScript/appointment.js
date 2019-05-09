function appointmentRegistration(){
    //if ()
    var date = $('#txtDate').val();
    var detail = $('#txtdetail').val();
    var val = '';
    for (var i=1; i<=7; i++) {
        if (document.getElementById("RblExamination"+i).checked) {
            val = $('#RblExamination'+i).val();
            break;
        }
    }
    var client = {
        dateClient: date,
        valClient: val,
        detailClient: detail
    }
    var appointmentsString = localStorage.getItem('appointments');
    if (appointmentsString) {
        var appointments = JSON.parse(appointmentsString);
        var L = appointments.length;
        appointments[L] = client;
    } else {
        var appointments = [client]; 
    }
    appointmentsString = JSON.stringify(appointments);
    localStorage.setItem('appointments',appointmentsString);
    location.href='menu.html';
}