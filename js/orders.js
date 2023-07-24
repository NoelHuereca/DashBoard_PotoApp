let cIE = 0
let cTa = 0
let cEF = 0
let cES = 0
let cCI = 0
let cLI = 0
let cKI = 0
let cMA = 0
let cVE = 0
let cEP = 0
let cCA = 0
let cRE = 0
let cER = 0
let cEN = 0
let cPC = 0
const historialPedidos = []
/* Functions */
const consultaPedidos = async () => {
    const url = `https://app-potogas2.azurewebsites.net/potogas/api/historialPedidosAdmin`;
    const token = `757774694072296F3FD555F8626EE0F5715305AF4A142BEF2911221456DE2518`;
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token,
        }),
    };
    try {
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        const pedidos = data[0].data
        calcularVentasTotales(pedidos)
        calcularPorcentajeVentas(pedidos)
        calcularImporteVentas(pedidos)
        calcularIngresos(pedidos)
        calcularPerdidas(pedidos)
        calcularPorcetajePerdidas(pedidos)
        calcularTypeOrder(pedidos)
        calcularTypeService(pedidos)
        calcularTypeUnit(pedidos)
        calcularTimeOrder(pedidos)
        calcularEstatus(pedidos)
        registrarFechas(pedidos)
    } catch (error) {
        console.log("No se pueden consumir los datos: ", error);
    }
};
const calcularVentasTotales = (pedidos) => {
    const fullOrders = []
    try {
        console.log("Numero de pedidos totales: ", pedidos.length);
        pedidos.map((pedido) => {
            fullOrders.push(pedido)
        })
        ventasCard.innerHTML = `${fullOrders.length}`

    } catch (error) {
        console.error("Ups, algo salio mal", error)
    }
}
const calcularPorcentajeVentas = (pedidos) => {
    const ordersDelivered = [];
    try {
        pedidos.forEach((pedido) => {
            if (pedido.estatus == 5) {
                ordersDelivered.push(pedido)
            }
        })
        console.log("Pedidos entregados: ", ordersDelivered.length);
        PorcentajeingresosCard.innerHTML = `${((ordersDelivered.length / pedidos.length * 100)).toFixed(0)}%`
    } catch (error) {
        console.log("Algo salio mal", error);
    }
};
const calcularImporteVentas = (pedidos) => {
    const importeArray = []
    let importe = 0
    try {
        pedidos.forEach((pedido) => {
            if (!isNaN(parseFloat(pedido.precioExt))) {
                importeArray.push(parseFloat(pedido.precioExt))
            }
        })
        importe = importeArray.reduce((acc, num) => {
            return acc + num
        })
        importeVentasCard.innerHTML = `$${importe.toLocaleString()}`

    } catch (error) {
        console.error("Ups, algo salio mal", error)
    }
}
const calcularIngresos = (pedidos) => {
    const succesfulSales = []
    const importeArray = []
    const ingresosArray = []
    let importe = 0
    let ingresos = 0
    try {
        pedidos.forEach((pedido) => {
            if (!isNaN(parseFloat(pedido.precioExt))) {
                importeArray.push(parseFloat(pedido.precioExt))
            }
        })
        importe = importeArray.reduce((acc, num) => {
            return acc + num
        })
        console.log(`importe total`, importe)
        pedidos.forEach((pedido) => {
            if (pedido.estatus == 5) {
                succesfulSales.push(pedido)
            }
        })
        succesfulSales.forEach((pedido) => {
            if (!isNaN(parseInt(pedido.precioExt))) {
                ingresosArray.push(parseFloat(pedido.precioExt))
            }
        })
        ingresos = ingresosArray.reduce((total, ingreso) => {
            return total + ingreso
        }, 0)
        console.log("Ingresos", ingresos)
        ingresosPorcentajeCard.innerHTML = `${((ingresos / importe) * 100).toFixed(0)}%`
        cIE = ingresos
    } catch (error) {
        console.error("Ups, algo salio mal", error)
    }
}
const calcularPerdidas = (pedidos) => {
    const perdidasArray = []
    try {
        pedidos.forEach((pedido) => {
            if (pedido.estatus == 2) {
                perdidasArray.push(pedido)
            }
        })
        perdidasCard.innerHTML = `${perdidasArray.length}`
    } catch (error) {
        console.error("Ups, algo salio mal", error)
    }
}
const calcularPorcetajePerdidas = (pedidos) => {
    const perdidasArray = []
    try {
        pedidos.forEach((pedido) => {
            if (pedido.estatus == 2) {
                perdidasArray.push(pedido)
            }
        })
        perdidasPorcentajeCard.innerHTML = `${((perdidasArray.length / pedidos.length) * 100).toFixed(0)}%`
    } catch (error) {
        console.error("Ups, algo salio mal", error)
    }
}
const calcularTypeOrder = (pedidos) => {
    const tarjeta = []
    const efectivo = []
    const tarjetaImport = []
    const efectivoImport = []
    try {
        pedidos.forEach((pedido) => {
            if (pedido.tipoPago == "Efectivo") {
                efectivo.push(pedido)
            } else {
                tarjeta.push(pedido)
            }
        })
        tarjeta.forEach((tarjeta) => {
            if (!isNaN(parseFloat(tarjeta.precioExt))) {
                tarjetaImport.push(parseFloat(tarjeta.precioExt))
            }
        })
        cTA = tarjetaImport.reduce((total, num) => {
            return total + num
        })
        efectivo.forEach((efectivo) => {
            if (!isNaN(parseFloat(efectivo.precioExt))) {
                efectivoImport.push(parseFloat(efectivo.precioExt))
            }
        })
        cEF = efectivoImport.reduce((total, num) => {
            return total + num
        })
        console.log("tarjeta: ", tarjeta.length, " efectivo: ", efectivo.length)
        console.log("tarjetaImportArray: ", tarjetaImport)
        console.log("efectivoImportArray: ", efectivoImport)
        console.log("tarjetaImport: ", cTA.toLocaleString())
        console.log("efectivoImport: ", cEF.toLocaleString())
    } catch (error) {
        console.error("Ups, algo salio mal", error)
    }
}
const calcularTypeService = (pedidos) => {
    const estacionario = []
    const cilindro = []
    try {
        pedidos.forEach((pedido) => {
            if (pedido.producto == "Estacionario") {
                estacionario.push(pedido)
            } else {
                cilindro.push(pedido)
            }
        })
        console.log("estacionario: ", estacionario.length, " cilindro: ", cilindro.length)
        cES = estacionario.length
        cCI = cilindro.length
    } catch (error) {
        console.error("Ups, algo salio mal", error)
    }
}
const calcularTypeUnit = (pedidos) => {
    const lts = []
    const kgs = []
    try {
        pedidos.forEach((pedido) => {
            if (pedido.unidadMed == "LTS") {
                lts.push(pedido)
            } else {
                kgs.push(pedido)
            }
        })
        console.log("Unidad LTS: ", lts.length, " Unidad KGS: ", kgs.length)
        cLI = lts.length
        cKI = kgs.length
    } catch (error) {
        console.error("Ups, algo salio mal", error)
    }
}
const calcularTimeOrder = (pedidos) => {
    const mat = []
    const ves = []
    try {
        pedidos.forEach((pedido) => {
            if (pedido.horario == "Matutino") {
                mat.push(pedido)
            } else {
                ves.push(pedido)
            }
        })
        console.log("Horario matutino: ", mat.length, " Horario vespertino: ", ves.length)
        cMA = mat.length
        cVE = ves.length
    } catch (error) {
        console.error("Ups, algo salio mal", error)
    }
}

const calcularEstatus = (pedidos) => {
    const enProceso = []
    const cancelado = []
    const reprogramado = []
    const enRuta = []
    const entregado = []
    const porCancelar = []
    try {
        pedidos.forEach((pedido) => {
            if (pedido.estatus == 1) {
                enProceso.push(pedido)
            } else if (pedido.estatus == 2) {
                cancelado.push(pedido)
            } else if (pedido.estatus == 3) {
                reprogramado.push(pedido)
            } else if (pedido.estatus == 4) {
                enRuta.push(pedido)
            } else if (pedido.estatus == 5) {
                entregado.push(pedido)
            } else if (pedido.estatus == 6) {
                porCancelar.push(pedido)
            }
        })
        console.log("estatus en proceso", enProceso.length)
        console.log("estatus cancelado", cancelado.length)
        console.log("estatus reprogramado", reprogramado.length)
        console.log("estatus En Ruta", enRuta.length)
        console.log("estatus Entregado", entregado.length)
        console.log("estatus Por Cancelar", porCancelar.length)
        cEP = enProceso.length
        cCA = cancelado.length
        cRE = reprogramado.length
        cER = enRuta.length
        cEN = entregado.length
        cPC = porCancelar.length
    } catch (error) {
        console.error("Ups, algo salio mal", error)
    }
}
const registrarFechas = (pedidos) => {
    let cPedidos = 0, mesIndex = 0, cDia = 0
    const meses = [ //array de meses para indexarlos
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
    try {
        pedidos.forEach((fecha, indice) => {
            //desgloce de fecha tipo string para uso en formato date
            let fechaString = fecha.fechaPedido
            let [fechaParte, horaParte] = fechaString.split(" ");
            let [anio, mes, dia] = fechaParte.split("-");

            if (mesIndex == "0") { //condicion de un solo uso, inicializa la variable mesIndex
                mesIndex = mes
            }
            if (indice == pedidos.length -1) { //compara si ya se recorrieron todos los elementos del array pedidos
                //puchea un nuevo arreglo en array historialPedidos
                historialPedidos.push(
                    [new Date(anio, mes -1, dia), 
                    cPedidos, `${meses[mes-1]} de ${anio}<br>`, `${cPedidos} pedidos`
                    ]
                )
            }
            if (mesIndex < mes) { //compara si hubo un cambio de mes
                //puchea un nuevo arreglo en array historialPedidos
                if (mes == 12) {
                    mesIndex = 1
                }
                historialPedidos.push(
                    [new Date(anio, mes - 2, cDia), 
                        cPedidos, `${meses[mes-2]} de ${anio}<br>`, `${cPedidos} pedidos`
                    ]
                )
                mesIndex = mes
                //Reinicia contadores
                cPedidos = 0
            } else {
                //Aumenta el contador de pedidos
                cPedidos += 1
            }
            cDia = dia //hace un respaldo del dia del pedido actual, por si se requiere el ultimo pedido del mes
        })
    } catch (error) {
        console.error("Ups, algo salio mal")
    }
}

/* GRAFICAS */
function generarGraficas() {
    const timeOrders = document.getElementById("timeOrders");
    const datato = {
        labels: [`Vespertino: ${((cVE / (cVE + cMA)) * 100).toFixed(1)}%`, `Matutino: ${((cMA / (cVE + cMA)) * 100).toFixed(1)}%`],
        datasets: [
            {
                label: `Total de ventas`,
                data: [cVE, cMA],
                backgroundColor: ["rgba(127, 179, 213, 0.9)", "rgba(192, 57, 43, 0.7)"],
                borderColor: [
                    'rgba(0 ,0 ,0 , 0.2)',
                ],
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };
    const configto = {
        type: "pie",
        data: datato,
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var label = context.label || '';
                            var value = context.raw || 0;
                            var dataset = context.dataset;

                            if (label) {
                                label += ': ';
                            }

                            if (dataset.data && dataset.data.length > 0) {
                                var datasetValue = dataset.data[context.dataIndex];
                                var percentage = ((datasetValue / dataset.data.reduce((a, b) => a + b)) * 100).toFixed(2);

                                label += value + ' (' + percentage + '%)';
                            }

                            return label;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'VENTAS POR TURNO'
                },

            }
        }
    };
    const gTimeOrders = new Chart(timeOrders, configto);

    const typeService = document.getElementById("typeService");
    const datats = {
        labels: [`Estacionario: ${(cES / (cES + cCI) * 100).toFixed(1)}%`, `Cilindro: ${(cCI / (cES + cCI) * 100).toFixed(1)}%`],
        datasets: [
            {
                label: "Total de servicios",
                data: [cES, cCI],
                backgroundColor: ["rgba(127, 179, 213, 0.9)", "rgba(192, 57, 43, 0.7)"],
                borderColor: [
                    'rgba(0 ,0 ,0 , 0.2)',
                ],
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };
    const configts = {
        type: "pie",
        data: datats,
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var label = context.label || '';
                            var value = context.raw || 0;
                            var dataset = context.dataset;

                            if (label) {
                                label += ': ';
                            }

                            if (dataset.data && dataset.data.length > 0) {
                                var datasetValue = dataset.data[context.dataIndex];
                                var percentage = ((datasetValue / dataset.data.reduce((a, b) => a + b)) * 100).toFixed(2);

                                label += value + ' (' + percentage + '%)';
                            }

                            return label;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'SERVICIOS'
                },
            }
        }
    }
    const gTypeService = new Chart(typeService, configts)

    const typePayment = document.getElementById("typePayment")
    const datatp = {
        labels: [`Efectivo: $${cEF.toLocaleString()}`, `Tarjeta: $${cTA.toLocaleString()}`],
        datasets: [
            {
                label: "total de pagos",
                data: [cEF, cTA],
                backgroundColor: [`rgba(127, 179, 213, 0.9)`, "rgba(192, 57, 43, 0.7)"],
                borderColor: [
                    'rgba(0 ,0 ,0 , 0.2)',
                ],
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };
    const configtp = {
        type: "pie",
        data: datatp,
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var label = context.label || '';
                            var value = context.raw || 0;
                            var dataset = context.dataset;

                            if (label) {
                                label += ': ';
                            }

                            if (dataset.data && dataset.data.length > 0) {
                                var datasetValue = dataset.data[context.dataIndex];
                                var percentage = ((datasetValue / dataset.data.reduce((a, b) => a + b)) * 100).toFixed(2);

                                label += value + ' (' + percentage + '%)';
                            }

                            return label;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'PAGOS REALIZADOS'
                },

            }
        }
    }
    const gTypePayment = new Chart(typePayment, configtp)

    const typeUnit = document.getElementById("typeUnit")
    const datatu = {
        labels: [`Litros vendidos: ${(cLI / (cLI + cKI) * 100).toFixed(1)}%`, `Kilos vendidos: ${(cKI / (cLI + cKI) * 100).toFixed(1)}%`],
        datasets: [
            {
                label: "total de pagos",
                data: [cLI, cKI],
                backgroundColor: ["rgba(127, 179, 213, 0.9)", "rgba(192, 57, 43, 0.7)"],
                borderColor: [
                    'rgba(0 ,0 ,0 , 0.2)',
                ],
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };
    const configtu = {
        type: "pie",
        data: datatu,
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var label = context.label || '';
                            var value = context.raw || 0;
                            var dataset = context.dataset;

                            if (label) {
                                label += ': ';
                            }

                            if (dataset.data && dataset.data.length > 0) {
                                var datasetValue = dataset.data[context.dataIndex];
                                var percentage = ((datasetValue / dataset.data.reduce((a, b) => a + b)) * 100).toFixed(2);

                                label += value + ' (' + percentage + '%)';
                            }

                            return label;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'UNIDADES'
                },
            }
        }
    }
    const gTypeUnit = new Chart(typeUnit, configtu)

    const orderStatus = document.getElementById("orderStatus");
    const data = {
        labels: [`ESTATUS DE PEDIDOS`],
        datasets: [{
            axis: 'y',
            label: `ENTREGADOS ${((cEP / (cEP + cCA + cRE + cER + cEN + cPC)) * 100).toFixed(0)}%`,
            data: [cEP],
            fill: false,
            backgroundColor: [
                'rgba(20, 90, 50, 0.7)',
            ],
            borderColor: [
                'rgb(20, 90, 50)',
            ],
            borderWidth: 2
        }, {
            axis: 'y',
            label: `CANCELADOS ${((cCA / (cEP + cCA + cRE + cER + cEN + cPC)) * 100).toFixed(0)}%`,
            data: [cCA],
            fill: false,
            backgroundColor: [
                'rgba(192, 57, 43, 0.7)',
            ],
            borderColor: [
                'rgb(192, 57, 43)',
            ],
            borderWidth: 2
        }]
    };

    const config = {
        type: 'bar',
        data,
        options: {
            indexAxis: 'x',
            interactions: {
                mode: 'index',
                intersect: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var currentValue = dataset.data[tooltipItem.index];
                        var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                        return dataset.label + ': ' + percentage + '%';
                    }
                }
            }
        }
    };
    const gOrderStatus = new Chart(orderStatus, config);

    google.charts.load('current', { 'packages': ['annotationchart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        let data = new google.visualization.DataTable();
        data.addColumn(`date`, 'Date');
        data.addColumn('number', 'PEDIDOS');
        data.addColumn('string', 'Entregado title');
        data.addColumn('string', 'Entregado text');
        data.addRows(historialPedidos);
        let chart = new google.visualization.AnnotationChart(document.getElementById('orderHistory'));
        let options = {
            displayAnnotations: true,
            allowHtml: true,
            colors: ['rgb(127, 179, 213)'],
            allValuesSuffix: " pedidos",
            annotationsWidth: 30,
            displayAnnotationsFilter: true,
            fill: 15,
            legendPosition: "newRow",
            thickness: 2,
        };
        chart.draw(data, options);
    }
}

async function graficarDatos() {
    await consultaPedidos()
    generarGraficas()
}
graficarDatos()

