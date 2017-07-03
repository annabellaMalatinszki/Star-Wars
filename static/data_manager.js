var app = app || {};

app.dataManager = {
    getPlanets: function (page) {
        var request = new XMLHttpRequest();
        request.open("GET", page, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = JSON.parse(request.responseText);
                var planets = extractplanets(data);
                var nextPage = getNextPage(data);
                var prevPage = getPrevPage(data);
                app.dom.displayPlanets(planets);
                app.dataManager.changePage(nextPage, prevPage);
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
        };
        function getNextPage(data) {
            var nextPage = data.next;
            return nextPage
        };
        function getPrevPage(data) {
            var prevPage = data.previous;
            return prevPage
        };
        request.send();
    },
    changePage: function (nextPage, prevPage) {
        $("#next").on("click", function () {
            if (nextPage != null) {
                app.dataManager.getPlanets(nextPage);
            };
        });
        $("#previous").on("click", function () {
            if (prevPage != null) {
                app.dataManager.getPlanets(prevPage);
            };
        });
    }
}