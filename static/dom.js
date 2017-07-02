var app = app || {};

app.dom = {
    displayPlanets: function (planets) {
        var planetDatabase = JSON.parse(planets);
        console.log(planetDatabase[0][0]);
        for (var i = 0; i < planetDatabase.length; i++) {
            var name = planetDatabase[i][0];
            var diameter = planetDatabase[i][1];
            var climate = planetDatabase[i][2];
            var terrain = planetDatabase[i][3];
            var surfaceWater = planetDatabase[i][4];
            var population = planetDatabase[i][5];
            var residents = planetDatabase[i][6];

            $("#planets_table_body").append(`<tr>
                                                <td>${name}</td>
                                                <td>${diameter}</td>
                                                <td>${climate}</td>
                                                <td>${terrain}</td>
                                                <td>${surfaceWater}</td>
                                                <td>${population}</td>
                                                <td>${residents}</td>
                                            </tr>`);
        }
    }
}