
// funciones

const getCovid = (() => {
    const url = 'http://localhost:3000/api/total'; // Consumir la API http://localhost:3000/api/total con JavaScript o jQuery
    try {
        const covid = async () => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }
        // console.log(covid());
        return covid;
    } catch (err) {
        console.log(err);
    }
})();

const getCountry = ((country) => {
    console.log(country);
    const url = `http://localhost:3000/api/countries/${country}`; // para obtener esta información debes llamar a la API http://localhost:3000/api/countries/{country} 
    try {
        const covidCountry = async () => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }
        // console.log(covidCountry());
        return covidCountry();
    } catch (err) {
        console.log(err);
    }
});

// Desplegar la información de la API en un gráfico de barra que debe mostrar sólo los países con más de 10000 casos activos
const llenarCovid = async (buscar) => {
    const covid = await getCovid();
    //    console.log(covid.data);
    const resultado = covid.data
        .filter((a) => a.confirmed >= buscar) // buscar mayores al valoR de buscar
        .forEach((a) => {   // recorrer el nuevo arreglo para crear los datos del canvasjs
            //    console.log(a);
            // {location: "US", confirmed: 36306724, deaths: 619093, recovered: 0, active: 0}active: 0confirmed: 36306724deaths: 619093location: "US"recovered: 0[[Prototype]]: Object
            let confirmados = {
                label: a.location,
                y: a.confirmed
            };
            let muertos = {
                label: a.location,
                y: a.deaths
            };
            let recuperados = {
                label: a.location,
                y: a.recovered
            };

            dataConfirmados.push(confirmados);
            dataMuertos.push(muertos);
            dataRecuperados.push(recuperados);

        })
    // console.log(resultado);
    // console.log(dataConfirmados);
    // console.log(dataMuertos);
    // console.log(dataRecuperados); // recuperados siempre da 0 en el api   !!!!!!!

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Paises con Covid19"
        },
        axisY: {
            title: "Millones de Infectados",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },

        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "column",
            name: "infectados",
            legendText: "Paises Infectados",
            showInLegend: true,
            dataPoints: dataConfirmados
        },
        {
            type: "column",
            name: "muertos",
            legendText: "Muertos",
            showInLegend: true,
            dataPoints: dataMuertos
        },
        {
            type: "column",
            name: "recuperados",
            legendText: "recuperados",
            showInLegend: true,
            dataPoints: dataRecuperados
        },

        ]
    });
    chart.render();

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

    // {location: "US", confirmed: 36306724, deaths: 619093, recovered: 0, active: 0}active: 0confirmed: 36306724deaths: 619093location: "US"recovered: 0[[Prototype]]: Object
    //  console.log(covid.data);
    $('#tabla').DataTable({
        "data": covid.data,
        columns: [
            { data: "location" },
            { data: "confirmed" },
            { data: "deaths" },
            { data: "recovered." },
            { data: "active" },
        ]
    });
    var table = $('#tabla').DataTable();
    $('#tabla tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        //    console.log(data);

        let pais = data.location;
        //console.log("entramos en js");
        modalGrafico(pais);


      //  alert('You clicked on ' + data.location + '\'s row');
    });

};

let modalGrafico = (async (pais) => {
    const covidPais = await getCountry(pais);
    console.log(covidPais.data);

    // {location: "US", confirmed: 36306724, deaths: 619093, recovered: 0, active: 0}active: 0confirmed: 36306724deaths: 619093location: "US"recovered: 0[[Prototype]]: Object

    var chart2 = new CanvasJS.Chart("chartContainer2", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title: {
            text: `resumen ${covidPais.data.location}`
        },
        data: [
            {
                type: "column",
                dataPoints: [
                    { label: "Confirmados", y: covidPais.data.confirmed },
                    { label: "Muertos", y: covidPais.data.deaths },
                    { label: "Recuperados", y: covidPais.data.recovered },
                    { label: "Activos ", y: covidPais.data.active }
                ]
            }
        ]
    });
    chart2.render();
    $("#exampleModal").modal("toggle");
});


// main 

var dataConfirmados = [];
var dataMuertos = [];
var dataRecuperados = [];
llenarCovid(10000); // Desplegar la información de la API en un gráfico de barra que debe mostrar sólo los países con más de 10000 casos activos

// $("#exampleModal").modal("toggle");  // modal











