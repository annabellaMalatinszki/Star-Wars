var app = app || {};

app.init = function () {
    app.dataManager.getPlanets("http://swapi.co/api/planets/");
    $('#planets_table').on('click', '.vote', function () {
        alert($(this).data("id"));
    });
};

app.init();