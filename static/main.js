var app = app || {};

app.init = function () {
    app.dataManager.getPlanets("http://swapi.co/api/planets/");
    $('#planets_table').on('click', '.vote', function () {
        var planetId = $(this).data("id");
        var planetName = $(this).data("planet_name");
        console.log(planetId, planetName);
        app.dataManager.sendVote(planetId, planetName);
    });
};

app.init();