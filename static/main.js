var app = app || {};

app.init = function () {
    app.dataManager.getPlanets()
    app.dom.displayPlanets()
};

app.init();