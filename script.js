function getRanking() {

    var year = getParameterByName('year');

    var endpoint = "https://sheets.googleapis.com/v4/spreadsheets/1dzbcLzJlxPBLIKuP7BDI0xFqm3Wy-jozFHbIeY7T8bU/values/2020!G3:N12?key=AIzaSyBdJupU1WrSW8B0dhIxVi-PqLtFZDkGFFY";

    if (year == 'GERAL') {
        endpoint = "https://sheets.googleapis.com/v4/spreadsheets/1dzbcLzJlxPBLIKuP7BDI0xFqm3Wy-jozFHbIeY7T8bU/values/'RANKING GERAL'!G3:N12?key=AIzaSyBdJupU1WrSW8B0dhIxVi-PqLtFZDkGFFY";
    } else {
        if (year == undefined) {
            
            endpoint = "https://sheets.googleapis.com/v4/spreadsheets/1dzbcLzJlxPBLIKuP7BDI0xFqm3Wy-jozFHbIeY7T8bU/values/"+year+"!G3:N12?key=AIzaSyBdJupU1WrSW8B0dhIxVi-PqLtFZDkGFFY";
        }
        
    }

    fetch(endpoint)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Displaying it to the DOM
      output = '<br><br><br><br><br>';
      data['values'].forEach(element => {
        if (element[1] != '#N/A') {

            if (element[0] == '1') {
                output+='<div class="course" style="border-style: solid; border-color: gold;">';
            } else {
                if (element[0] == '2') {
                    output+='<div class="course" style="border-style: solid; border-color: silver;">';
                } else {
                    if (element[0] == '3') {
                        output+='<div class="course" style="border-style: solid; border-color: #a17419;">';
                    } else {
                        output+='<div class="course">';
                    }
                }
                
            }

            //output+='<div class="course">';
            output+='<div class="course-preview"><h1>' + element[0] + '</h1></div>';
            output+='<div class="course-info"><div class="progress-container"><div class="progressbg"><div class="progress" style="width: '+ ((element[4]/element[3])*100).toFixed(2) +'%"></div></div><span class="progress-text">';
            output+= element[4] + ' ganhos / ' + element[5] + ' perdas ('+((element[4]/element[3])*100).toFixed(2)+'%)</span><br><br>'
            if (parseFloat(element[2]) >= 0) {
                output+= '<h3 style="color:#27C188">R$</h3> <h2 style="color:#27C188">';
            } else {
                output+= '<h3 style="color:#EA184B">R$</h3> <h2 style="color:#EA184B">';
                
            }
            
            output+= element[2] + '</h2></div><h1>';
            output+= element[1] + '</h1><h6>';
            output+= element[3] + ' jogos';
            output+= ' +R$'+element[6]+' -R$'+element[7]+'</h6></div></div>';
        }
      });
      
      document.getElementById('ranking').innerHTML = output;  
      if (year == undefined) {
        document.getElementById('ano').innerHTML = "RANKING 2020";
      } else {
        document.getElementById('ano').innerHTML = "RANKING " + year;
      }
      

    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

getRanking();

