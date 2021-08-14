
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

// buscar valores mayores a buscar
const llenarCovid = async (buscar) => {
    const covid = await getCovid();
    console.log(covid.data);
    const resultado = covid.data
        .filter((a) => a.confirmed >= buscar) // buscar mayores al valoR de buscar
        .forEach((a) => {   // recorrer el nuevo arreglo para crear los datos del canvasjs
            console.log(a);
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



};


// main 
let pais = "Brazil";
//console.log("entramos en js");
//console.log(getCountry(pais));
var dataConfirmados = [];
    var dataMuertos = [];
    var dataRecuperados = [];
    llenarCovid(100000);

// $("#exampleModal").modal("toggle");  // modal

console.log(dataConfirmados)
window.onload = function () {
    
    

}






/**
    console.log(getCovid());
    getCovid.forEach((number) => {
        if (number[1] != "null") {
          let dato = {
            y: number[1],
            label: number[0]
          };
          dataPoints.push(dato);
          contador++;
        }

      });
  */
      // function addData(getCovid) {
    //     for (var i = 0; i < data.length; i++) {
    //         dataPoints.push({
    //             x: new Date(data[i].date),
    //             y: data[i].units
    //         });
    //     }
    //     $("#chartContainer").CanvasJSChart(options);

    // }

