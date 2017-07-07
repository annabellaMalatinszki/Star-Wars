var app = app || {};

app.dom = {
    displayPlanets: function (planets) {
        $("#planets_table_body").empty();
        var planetDatabase = JSON.parse(planets);
        for (var i = 0; i < planetDatabase.length; i++) {
            var id = i + 2;
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
                                                <td><button type=button class="vote" id="vote_button${id}" data-id="${id}" data-planet_name="${name}">Vote</td>
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
            var planetDatabase = JSON.parse(planets);
            var residentList = [];
            var planetName = $(event.relatedTarget).data("planet");
            var modalTitle = "Residents of " + planetName;
            $("#myModal").find(".modal-title").empty();
            $("#myModal").find(".modal-title").text(modalTitle);
            $("#myModal").find("#modal_table_head").empty();
            $("#myModal").find("#modal_table_head").append(`<tr>
                                                                <th>Name</th>
                                                                <th>Height</th>
                                                                <th>Mass</th>
                                                                <th>Hair color</th>
                                                                <th>Skin color</th>
                                                                <th>Eye color</th>
                                                                <th>Birth year</th>
                                                                <th>Gender</th>
                                                            </tr>`);
            $("#myModal").find("#modal_table_body").empty();
            app.dom.getResidentList(planetDatabase, planetName);
        });
    },


    getResidentList: function (planetDatabase, planetName) {
        for (var i = 0; i < planetDatabase.length; i++) {
            if (planetDatabase[i][0] === planetName) {
                var res = planetDatabase[i][7] || [];
            };
        };
        if (res != undefined) {
            for (var i = 0; i < res.length; i++) {
                var resPage = res[i];
                app.dataManager.getResident(resPage);
            };
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
        $("#myModal").find("#modal_table_body").append(`<tr>
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
        $("#next").off("click");
        $("#previous").off("click");
        if (nextPage != null) {
            $("#next").on("click", function () {
                app.dataManager.getPlanets(nextPage);
            });
        };
        if (prevPage != null) {
            $("#previous").on("click", function () {
                app.dataManager.getPlanets(prevPage);
            });
        };
    },


    disableVote: function (planetId) {
        $("#vote_button" + planetId).off("click");
        $("#vote_button" + planetId).text("Voted");
    },


    showStats: function (stats) {
        $("#myModal").on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            var statData = JSON.parse(stats);
            var modalTitle = "Voting Statistics";
            $("#myModal").find(".modal-title").empty();
            $("#myModal").find(".modal-title").text(modalTitle);
            $("#myModal2").find("#modal_table_head").empty();
            $("#myModal2").find("#modal_table_head").append(`<tr>
                                                                <th>Planet Name</th>
                                                                <th>Received Votes</th>
                                                            </tr>`);
            $("#myModal").find("#modal_table_body").empty();
            for (var i = 0; i < statData.length; i++) {
                var planetName = [i][0];
                var votes = [i][1];
                $("#myModal2").find("#modal_table_body").append(`<tr>
                                                                    <td>${planetName}</td>
                                                                    <td>${votes}</td>
                                                                </tr>`);
            };
        });
    }
}