$(function() {
    var resultsString = localStorage.getItem('results');
    if (resultsString) {
        var results = JSON.parse(resultsString);
        for(var i = 0; i < results.length; i++) {
            $('#Table1').append( '<tr><td>' + results[i].dateClient + 
'</td><td>' + results[i].valClient + '</td><td>' + results[i].resClient + 
'</td><td>' + results[i].detailClient + '</td></tr>')
        }
    }
})