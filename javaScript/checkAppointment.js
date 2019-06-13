var appointments;
$(function() {
    var appointmentsString = localStorage.getItem('appointments');
    if (appointmentsString) {
        appointments = JSON.parse(appointmentsString);
        for(var i = 0; i < appointments.length; i++) {
            $('#Table1').append( '<tr><td>' + appointments[i].dateClient + 
'</td><td>' + appointments[i].valClient + '</td><td>' + appointments[i].detailClient 
+ '</td><td><button type="button" class="btn pull-left" onclick="clickRegister('+
i+')">Register the result</button></td></tr>')
        }
    }
})
function clickRegister(index) {
    recordString = JSON.stringify(appointments[index]);
    localStorage.setItem('tempAppointment',recordString);
    location.href='result.html';
}
