var app = app || {};

app.dataManager = {
    getPlanets: function (page) {
        var request = new XMLHttpRequest();
        request.open("GET", page.replace("http", "https"), true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = JSON.parse(request.responseText);
                var planets = extractPlanets(data);
                var nextPage = data.next;
                var prevPage = data.previous;
                app.dom.changePage(nextPage, prevPage);
                app.dom.displayPlanets(planets);
            };
        };
        function extractPlanets(data) {
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
        request.send();
    },


    getResident: function (resPage) {
        var request = new XMLHttpRequest();
        request.open("GET", resPage.replace("http", "https"), true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = JSON.parse(request.responseText);
                var resident = extractResident(data);
                app.dom.displayResident(resident);
            };
        };
        function extractResident(data) {
            var residentData = [data.name,
            data.height,
            data.mass,
            data.hair_color,
            data.skin_color,
            data.eye_color,
            data.birth_year,
            data.gender];
            var resident = JSON.stringify(residentData);
            return resident
        };
        request.send();
    },


    sendVote: function (planetId, planetName) {
        var request = new XMLHttpRequest();
        var params = new FormData;
        params.append("planet_id", planetId);
        params.append("planet_name", planetName)
        request.open("POST", "/api/vote/", true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = JSON.parse(request.responseText);
                if (data === "success") {
                    console.log("added to database");
                    app.dom.disableVote(planetId);
                };
            };
        };
        request.send(params);
    },


    getStats: function () {
        var request = new XMLHttpRequest();
        request.open("GET", "/api/stats/", true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = JSON.parse(request.responseText);
                var stats = extractStats(data);
                app.dom.showStats(stats);
            };
        };
        function extractStats(data) {
            var statData = [];
            for (var i = 0; i < data.length; i++) {
                var planetVote = {
                    "planetName": i[0],
                    "vote": i[1]
                };
                statData.push(planetVote);
            };

            var stats = JSON.stringify(statData);
            return stats
        };
        request.send();
    }
}