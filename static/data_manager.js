var app = app || {};

app.dataManager = {
    getPlanets: function () {
        var request = new XMLHttpRequest();
        request.open("GET", "http://swapi.co/api/planets/", true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = JSON.parse(request.responseText);
                var planets = extractplanets(data);
                app.dom.displayPlanets(planets);
            };
        };
        function extractplanets(data) {
            var planetDatabase = [];
            for (var i = 0; i < data.results.length; i++) {
                var planetData = [data.results[i].name,
                data.results[i].diameter,
                data.results[i].climate,
                data.results[i].terrain,
                data.results[i].surface_water,
                data.results[i].population,
                data.results[i].residents.length,
                data.results[i].residents];
                planetDatabase.push(planetData);
            };
            var planets = JSON.stringify(planetDatabase);
            return planets
        }
        request.send();
    }
}