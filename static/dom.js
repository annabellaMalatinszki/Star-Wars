var app = app || {};

app.dom = {
    displayPlanets: function (planets) {
        $("#planets_table_body").empty();
        var planetDatabase = JSON.parse(planets);
        for (var i = 0; i < planetDatabase.length; i++) {
            var name = planetDatabase[i][0];
            var diameter = planetDatabase[i][1];
            var climate = planetDatabase[i][2];
            var terrain = planetDatabase[i][3];
            if (planetDatabase[i][4] != "unknown") {
                var surfaceWater = planetDatabase[i][4] + "%";
            } else {
                var surfaceWater = planetDatabase[i][4];
            };
            if (planetDatabase[i][5] != "unknown") {
                var population = planetDatabase[i][5] + " people";
            } else {
                var population = planetDatabase[i][5];
            };
            if (planetDatabase[i][6] === 0) {
                var residents = `<td class="residents">No known residents</td>`;
            } else {
                var res = planetDatabase[i][6] + " residents(s)";
                var residents = `<td class="residents">
                                <button type="button" class="btn btn-info modal-button" data-toggle="modal" data-target="#myModal" data-planet="${name}">${res}</td>`;
            };
            $("#planets_table_body").append(`<tr>
                                                <td class="planet_name">${name}</td>
                                                <td class="diameter">${diameter} km</td>
                                                <td class="climate">${climate}</td>
                                                <td class="terrain">${terrain}</td>
                                                <td class="surface_water">${surfaceWater}</td>
                                                <td class="population">${population}</td>
                                                ${residents}
                                                <td><button type=button class="vote" id="vote_button" href="#">Vote</td>
                                            </tr>`);

            if ($("#account_name").text() === "Not signed in") {
                $(".vote").hide()
            };
        };
        app.dom.modalPop(planets);
    },


    modalPop: function (planets) {
        $("#myModal").on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            var planetDatabase = JSON.parse(planets)
            var residentList = [];
            var planetName = $(event.relatedTarget).data("planet");
            var modalTitle = "Residents of " + planetName;
            $("#myModal").find(".modal-title").text(modalTitle);
            $("#myModal").find("#residents_table_body").empty();
            app.dom.getResidentList(planetDatabase, planetName);
        });
    },


    getResidentList: function (planetDatabase, planetName) {
        for (var i = 0; i < planetDatabase.length; i++) {
            if (planetDatabase[i][0] === planetName) {
                var res = planetDatabase[i][7] || [];
            };
        };
        for (var i = 0; i < res.length; i++) {
            var resPage = res[i].replace("http", "https");
            app.dataManager.getResident(resPage);
        };
    },


    displayResident: function (residentData) {
        var resident = JSON.parse(residentData);
        var name = resident[0];
        var height = resident[1];
        var mass = resident[2];
        var hairColor = resident[3];
        var skinColor = resident[4];
        var eyeColor = resident[5];
        var birthYear = resident[6];
        var gender = resident[7];
        $("#myModal").find("#residents_table_body").append(`<tr>
                                                            <td>${name}</td>
                                                            <td>${height}</td>
                                                            <td>${mass}</td>
                                                            <td>${hairColor}</td>
                                                            <td>${skinColor}</td>
                                                            <td>${eyeColor}</td>
                                                            <td>${birthYear}</td>
                                                            <td>${gender}</td>
                                                        </tr>`);
    },
    changePage: function (nextPage, prevPage) {
        if (nextPage === "null") {
            $("#next").off("click");
        } else {
            $("#next").on("click", function () {
                $("#next").off("click");
                app.dataManager.getPlanets(nextPage);
            });
        }
        if (prevPage === "null") {
            $("#previous").off("click");
        } else {
            $("#previous").on("click", function () {
                $("#previous").off("click");
                app.dataManager.getPlanets(prevPage);
            });
        }
    }
}