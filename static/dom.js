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
                var res = planetDatabase[i][6] + "residents(s)";
                var residents = `<td class="residents"><button type="button" href="#">${res}</td>`;
            };
            $("#planets_table_body").append(`<tr>
                                                <td class="planet_name">${name}</td>
                                                <td class="diameter">${diameter} km</td>
                                                <td class="climate">${climate}</td>
                                                <td class="terrain">${terrain}</td>
                                                <td class="surface_water">${surfaceWater}</td>
                                                <td class="population">${population}</td>
                                                ${residents}
                                                <td><button type=button class="vote" href="#">Vote</td>
                                            </tr>`);
        }
    }
}
