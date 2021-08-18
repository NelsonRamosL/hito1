
localStorage.setItem('esta-mi-llave', 'valor-asignado')

// funciones de hito2
const apiLogin = async (email2, password2) => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email2,
                password: password2
            })
        });
        const { token } = await response.json(); // Obtener el JWT a través del formulario de login entregado.
        // console.log(token);
        localStorage.setItem('my-token', token); //Persistir el token utilizando localStorage.
        return token;
    } catch (error) {
        console.log(error);
    }

}

/** 5. Al hacer click en la opción Situación Chile, se debe llamar a las siguientes APIs */
const getConfirmados = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/confirmed', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        const { data } = await response.json()

        return data

    } catch (error) {

    }
}

const getMuertos = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/deaths', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        const { data } = await response.json()

        return data

    } catch (error) {

    }
}

const getRecuperados = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/recovered', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        const { data } = await response.json()

        return data

    } catch (error) {

    }
}

// Funciones de hito1
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
var covidConfirmadosArray = [];
var covidMuertosArray = [];
var covidRecuperadosArray = [];

const formulario = document.getElementById("formulario");
const inicio = document.getElementById("inicio");
const chile = document.getElementById("chile");
const contenidoWeb = document.getElementById("contenidoWeb");
llenarCovid(10000); // Desplegar la información de la API en un gráfico de barra que debe mostrar sólo los países con más de 10000 casos activos

inicio.addEventListener('click', () => {
    if (inicio.innerHTML == 'Cerrar sesión') {
        localStorage.clear(); // elimina el JWT almacenado.
        location.reload(true); // Recarga pagina
    } else {
        $('#modalLogin').modal('toggle') // hace visible el modal con el login
    }


})

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()
    let email = formulario.email.value;
    let password = formulario.password.value;


    token = await apiLogin(email, password);
    console.log(token);

    if (token) {   // si existe el JWT se ejecuta todo lo que esta dentro del if
        $('#modalLogin').modal('toggle'); // Oculta el modal
        inicio.innerHTML = 'Cerrar sesión'  // cambiar el nombre a Cerrar sesion 
        chile.style.display = "block"; // hace visible el link a Situación Chile..




    } else {
        alert("usuario o contraseña invalido")

    }

});


chile.addEventListener('click', async () => {
    console.log("entramos en Chile esperar la carga de los datos de chile demora algunos segundos");
    contenidoWeb.innerHTML = ""; // limpiar pagina para contenido de situacion Chile

    /** 
             5. Al hacer click en la opción Situación Chile, se debe llamar a las siguientes APIs.
            http://localhost:3000/api/confirmed
            http://localhost:3000/api/deaths
            http://localhost:3000/api/recovered
             */
    const covidConfirmados = await getConfirmados(token);
    const covidMuertos = await getMuertos(token);
    const covidRecuperados = await getRecuperados(token);

    //  console.log(covidConfirmados);
    //  console.log(covidMuertos);
    //  console.log(covidRecuperados);

    //   0: {date: "1/22/20", total: 0}
    covidConfirmados.forEach((a) => {   // recorrer el nuevo arreglo para crear los datos del canvasjs
        //    console.log(a);
        let confirmados = {
            label: a.date,
            y: a.total
        };
        covidConfirmadosArray.push(confirmados);
    });

    covidMuertos.forEach((a) => {   // recorrer el nuevo arreglo para crear los datos del canvasjs
        //    console.log(a);
        let muertos = {
            label: a.date,
            y: a.total
        };
        covidMuertosArray.push(muertos);
    });


    covidRecuperados.forEach((a) => {   // recorrer el nuevo arreglo para crear los datos del canvasjs
        //    console.log(a);
        let recuperados = {
            label: a.date,
            y: a.total
        };
        covidRecuperadosArray.push(recuperados);
    });


    //  console.log(covidConfirmadosArray);
    var chart = new CanvasJS.Chart("contenidoWeb", {
        animationEnabled: true,
        title: {
            text: "Situacion Chile"
        },
        axisY: {
            title: "Infectados"
            //            valueFormatString: "#0,.",
            //          suffix: "k"
        },
        axisX: {
            title: "Fecha"
        },
        toolTip: {
            shared: true
        },
        data: [{
            type: "line",
            showInLegend: true,
            // toolTipContent: "<span style=\"color:#4F81BC\"><strong>{name}: </strong></span> {y}",
            name: "infectados",
            color: "#F08080",
            dataPoints: covidConfirmadosArray
        },
        {
            type: "line",
            name: "Muertos",
            // toolTipContent: "<span style=\"color:#C0504E\"><strong>{name}: </strong></span> {y}<br><b>Total:<b> #total",
            showInLegend: true,
            color: "red",
            dataPoints: covidMuertosArray
        },
        {
            type: "line",
            name: "Recuperados",
            // toolTipContent: "<span style=\"color:#C0504E\"><strong>{name}: </strong></span> {y}<br><b>Total:<b> #total",
            showInLegend: true,
            color: "green",
            dataPoints: covidRecuperadosArray
        }
        ]
    });
    chart.render();






});















