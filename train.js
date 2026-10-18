/*
========================================================
PROYECTO:
Predicción de Inventarios con Machine Learning

AUTOR:
Alejandro Calzada Rodríguez

MATERIA:
Inteligencia Artificial y Machine Learning

DESCRIPCIÓN:
Este programa:

1. Lee un archivo CSV.
2. Preprocesa los datos.
3. Entrena un modelo de Regresión Lineal Múltiple.
4. Evalúa el desempeño mediante MAE y R².
5. Genera automáticamente gráficas en formato PNG.

========================================================
*/

// =====================================================
// IMPORTACIÓN DE LIBRERÍAS
// =====================================================

// Librería para manejo de archivos
const fs = require("fs");

// Librería para leer CSV
const csv = require("csv-parser");

// Modelo de Machine Learning
const MLR = require("ml-regression-multivariate-linear");

// Librerías para generar gráficas
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

// =====================================================
// CONFIGURACIÓN DE GRÁFICAS
// =====================================================

const width = 1200;
const height = 800;

const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  backgroundColour: "white",
});

// =====================================================
// CREACIÓN DE CARPETA RESULTADOS
// =====================================================

if (!fs.existsSync("./resultados")) {
  fs.mkdirSync("./resultados");
}

// =====================================================
// ARREGLO PARA ALMACENAR LOS DATOS
// =====================================================

const rows = [];

// =====================================================
// LECTURA DEL ARCHIVO CSV
// =====================================================

fs.createReadStream("./inventario_maquiladora.csv")
  .pipe(csv())

  .on("data", (row) => {
    rows.push(row);
  })

  .on("end", async () => {

    console.log("=================================");
    console.log("ARCHIVO CARGADO");
    console.log("=================================");
    console.log("Registros encontrados:", rows.length);

    // =================================================
    // PREPROCESAMIENTO
    // =================================================

    const X = [];
    const Y = [];

    rows.forEach((row) => {

      // Variables de entrada
      X.push([
        Number(row.existencia_inicial),
        Number(row.cantidad_recibida),
        Number(row.cantidad_utilizada),
        Number(row.costo_unitario),
      ]);

      // Variable objetivo
      Y.push([
        Number(row.existencia_final),
      ]);
    });

    // =================================================
    // DIVISIÓN DE DATOS
    // =================================================

    const split = Math.floor(X.length * 0.8);

    const Xtrain = X.slice(0, split);
    const Ytrain = Y.slice(0, split);

    const Xtest = X.slice(split);
    const Ytest = Y.slice(split);

    console.log("Entrenamiento:", Xtrain.length);
    console.log("Prueba:", Xtest.length);

    // =================================================
    // ENTRENAMIENTO DEL MODELO
    // =================================================

    const modelo = new MLR(
      Xtrain,
      Ytrain
    );

    // =================================================
    // PREDICCIONES
    // =================================================

    const predicciones = Xtest.map(
      fila => modelo.predict(fila)[0]
    );

    // =================================================
    // MAE
    // =================================================

    let sumaError = 0;

    for (let i = 0; i < predicciones.length; i++) {

      sumaError += Math.abs(
        Ytest[i][0] -
        predicciones[i]
      );
    }

    const mae =
      sumaError / predicciones.length;

    // =================================================
    // R²
    // =================================================

    const promedioReal =
      Ytest.reduce(
        (acc, item) => acc + item[0],
        0
      ) / Ytest.length;

    let ssRes = 0;
    let ssTot = 0;

    for (let i = 0; i < predicciones.length; i++) {

      ssRes += Math.pow(
        Ytest[i][0] -
        predicciones[i],
        2
      );

      ssTot += Math.pow(
        Ytest[i][0] -
        promedioReal,
        2
      );
    }

    const r2 =
      1 - (ssRes / ssTot);

    // =================================================
    // RESULTADOS
    // =================================================

    console.log("");
    console.log("=================================");
    console.log("RESULTADO DEL MODELO");
    console.log("=================================");
    console.log("Registros Totales:", rows.length);
    console.log("Datos Entrenamiento:", Xtrain.length);
    console.log("Datos Prueba:", Xtest.length);
    console.log("MAE:", mae.toFixed(4));
    console.log("R²:", r2.toFixed(4));
    console.log("=================================");
    console.log("");
    console.log("Ejemplo");
    console.log("Real:", Ytest[0][0]);
    console.log("Predicción:", predicciones[0].toFixed(2));

    // =================================================
    // GRÁFICA 1
    // VALORES REALES VS PREDICCIONES
    // =================================================

    const grafica1 = {
      type: "line",

      data: {
        labels: Array.from(
          { length: 100 },
          (_, i) => i + 1
        ),

        datasets: [

          {
            label: "Valor Real",

            data: Ytest
              .slice(0, 100)
              .map(x => x[0]),

            borderColor: "blue",
            borderWidth: 3
          },

          {
            label: "Predicción",

            data: predicciones
              .slice(0, 100),

            borderColor: "red",
            borderWidth: 3
          }

        ]
      },

      options: {

        plugins: {

          title: {

            display: true,

            text:
              "Comparación entre Valores Reales y Predicciones"

          }

        }

      }

    };

    const imagen1 =
      await chartJSNodeCanvas.renderToBuffer(
        grafica1
      );

    fs.writeFileSync(
      "./resultados/01_real_vs_prediccion.png",
      imagen1
    );

    // =================================================
    // GRÁFICA 2
    // COMPORTAMIENTO DEL INVENTARIO
    // =================================================

    const inventario =
      rows
        .slice(0, 150)
        .map(
          r => Number(r.existencia_final)
        );

    const grafica2 = {

      type: "line",

      data: {

        labels:
          inventario.map(
            (_, i) => i + 1
          ),

        datasets: [

          {

            label:
              "Existencia Final",

            data:
              inventario,

            borderColor:
              "green",

            borderWidth: 3

          }

        ]

      },

      options: {

        plugins: {

          title: {

            display: true,

            text:
              "Evolución Histórica del Inventario"

          }

        }

      }

    };

    const imagen2 =
      await chartJSNodeCanvas.renderToBuffer(
        grafica2
      );

    fs.writeFileSync(
      "./resultados/02_inventario.png",
      imagen2
    );

    // =================================================
    // GRÁFICA 3
    // EXISTENCIA INICIAL VS FINAL
    // =================================================

    const grafica3 = {

      type: "scatter",

      data: {

        datasets: [

          {

            label:
              "Existencia Inicial vs Existencia Final",

            data:
              rows
                .slice(0, 300)
                .map(r => ({

                  x:
                    Number(
                      r.existencia_inicial
                    ),

                  y:
                    Number(
                      r.existencia_final
                    )

                })),

            backgroundColor:
              "orange",

            pointRadius: 4

          }

        ]

      },

      options: {

        plugins: {

          title: {

            display: true,

            text:
              "Relación Entre Inventario Inicial e Inventario Final"

          }

        }

      }

    };

    const imagen3 =
      await chartJSNodeCanvas.renderToBuffer(
        grafica3
      );

    fs.writeFileSync(
      "./resultados/03_existencia_vs_final.png",
      imagen3
    );

    // =================================================
    // CONFIRMACIÓN
    // =================================================

    console.log("");
    console.log("=================================");
    console.log("GRÁFICAS GENERADAS");
    console.log("=================================");
    console.log(
      "./resultados/01_real_vs_prediccion.png"
    );
    console.log(
      "./resultados/02_inventario.png"
    );
    console.log(
      "./resultados/03_existencia_vs_final.png"
    );
    console.log("=================================");

  })

  .on("error", (error) => {

    console.error(
      "Error al leer el archivo CSV"
    );

    console.error(error);

  });