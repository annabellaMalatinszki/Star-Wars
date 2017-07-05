var app = app || {};

app.init = function () {
    app.dataManager.getPlanets("https://swapi.co/api/planets/")
};

app.init();