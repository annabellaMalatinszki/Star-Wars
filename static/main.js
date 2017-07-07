var app = app || {};

app.init = function () {
    app.dataManager.getPlanets("http://swapi.co/api/planets/");
    $("#planets_table").on("click", ".vote", function () {
        var planetId = $(this).data("id");
        var planetName = $(this).data("planet_name");
        app.dataManager.sendVote(planetId, planetName);
    });
    $("#vote_stats").on("click", function () {
        app.dataManager.getStats();
    });
};

app.init();