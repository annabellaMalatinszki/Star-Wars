var app = app || {};

app.init = function () {
    app.dataManager.getPlanets("http://swapi.co/api/planets/")
};

app.init();