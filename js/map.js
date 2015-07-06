//Boris Pavlov #0841034 
//INFO 343 Challenge 4 Police Shooting Map 
//Instructor: Michael Freeman, sum2015
//Style Guide: http://www.w3schools.com/html/html5_syntax.asp

var drawMap = function() {   
	var	map = L.map('container'); 
	map.setView([42,-100],3);
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');   
	layer.addTo(map);
    getData(map);
}

var getData = function(map) {
	var data; 
	$.ajax({
    	url:'data/response.json', 
    	type: "get",
    	success:function(dat) {
    	   data = dat
  		   customBuild(map, data); 
   		}, 
        dataType:"json"
	}) 
}

var customBuild = function(map, data) { 
	data.map(function(d){ 
 	if (d['Hit or Killed?'] == "Killed") {
 		if (d['Armed or Unarmed?'] == "Unarmed") {
        	var circle = new L.circle([d.lat,d.lng], 200, {color:'red'}).addTo(map)  
     	}else {
     	 	var circle = new L.circle([d.lat,d.lng], 200, {color:'black'}).addTo(map)  
     	}
    } else {
    	var circle = new L.circle([d.lat,d.lng], 200, {color:'blue'}).addTo(map)   
    }
      var name = "<p> Victim: ".bold() +  d['Victim Name'] + "</p>";
      var summaryText = "<p> Summary: ".bold() + d.Summary + "</p>"; 
      var date = "<p> Date of Incident: ".bold() + d['Date Searched'] + "</p>"; 
      var location = "<p> State: ".bold() + d.State + ", County: ".bold() + d.County + ", City: ".bold() + d.City + "</p>";
      circle.bindPopup(name + summaryText + location + date);   
    })
}

