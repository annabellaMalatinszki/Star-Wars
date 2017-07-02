var app = app || {};

app.dataManager = {
    planetDatabase: [],
    getPlanets: function () {
        var request = new XMLHttpRequest();
        request.open("GET", "http://swapi.co/api/planets/", true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                for (var i = 0; i < data.results.length; i++) {
                    var planetData = [data.results[i].name,
                    data.results[i].diameter,
                    data.results[i].climate,
                    data.results[i].terrain,
                    data.results[i].surface_water,
                    data.results[i].population,
                    data.results[i].residents.length,
                    data.results[i].residents];
                    app.dataManager.planetDatabase.push(planetData);
                };
            };
        };
        request.send();
    }
}