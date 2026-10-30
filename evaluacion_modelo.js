/*
========================================================
PROYECTO:
Predicción de Demanda de Insumos para Empacadora de Limón

AUTOR:
Alejandro Calzada Rodríguez

DESCRIPCIÓN:

1. Lee el dataset CSV.
2. Preprocesa los datos.
3. Entrena un modelo de regresión lineal.
4. Genera predicciones.
5. Calcula:
   - MAE
   - MSE
   - RMSE
   - R²
6. Genera gráficas PNG.

========================================================
*/

const fs = require("fs");
const csv = require("csv-parser");
const MLR = require("ml-regression-multivariate-linear");
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
// CARPETA DE RESULTADOS
// =====================================================

if (!fs.existsSync("./resultados")) {
  fs.mkdirSync("./resultados");
}

// =====================================================
// ALMACÉN DE DATOS
// =====================================================

const rows = [];

// =====================================================
// LEER CSV
// =====================================================

fs.createReadStream("./inventario_limon_2024.csv")
  .pipe(csv())

  .on("data", (row) => {
    rows.push(row);
  })

  .on("end", async () => {

    console.log("=================================");
    console.log("ARCHIVO CARGADO");
    console.log("=================================");
    console.log("Registros encontrados:", rows.length);

    const X = [];
    const Y = [];

    rows.forEach((row) => {

      // Codificación de variables categóricas

      const temporada =
        row.temporada === "Alta"
          ? 3
          : row.temporada === "Media"
          ? 2
          : 1;

      const mercado =
        row.mercado === "Europa"
          ? 4
          : row.mercado === "USA"
          ? 3
          : row.mercado === "Canada"
          ? 2
          : 1;

      // Variables predictoras

      X.push([
        Number(row.inventario_actual),
        Number(row.consumo_semanal),
        Number(row.pedidos_pendientes),
        Number(row.dias_entrega),
        Number(row.precio_unitario),
        temporada,
        mercado,
        Number(row.temperatura_promedio)
      ]);

      // Variable objetivo

      Y.push([
        Number(row.demanda_proxima_semana)
      ]);
    });

    // =================================================
    // DIVISIÓN TRAIN / TEST
    // =================================================

    const split = Math.floor(X.length * 0.80);

    const Xtrain = X.slice(0, split);
    const Ytrain = Y.slice(0, split);

    const Xtest = X.slice(split);
    const Ytest = Y.slice(split);

    console.log("Entrenamiento:", Xtrain.length);
    console.log("Prueba:", Xtest.length);

    // =================================================
    // ENTRENAMIENTO
    // =================================================

    const modelo =
      new MLR(Xtrain, Ytrain);

    // =================================================
    // PREDICCIÓN
    // =================================================

    const predicciones =
      Xtest.map(
        fila => modelo.predict(fila)[0]
      );

    // =================================================
    // MAE
    // =================================================

    let sumaMAE = 0;

    for (let i = 0; i < predicciones.length; i++) {

      sumaMAE += Math.abs(
        Ytest[i][0] -
        predicciones[i]
      );

    }

    const mae =
      sumaMAE /
      predicciones.length;

    // =================================================
    // MSE
    // =================================================

    let sumaMSE = 0;

    for (let i = 0; i < predicciones.length; i++) {

      sumaMSE += Math.pow(
        Ytest[i][0] -
        predicciones[i],
        2
      );

    }

    const mse =
      sumaMSE /
      predicciones.length;

    // =================================================
    // RMSE
    // =================================================

    const rmse =
      Math.sqrt(mse);

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
      1 -
      (ssRes / ssTot);

    // =================================================
    // RESULTADOS
    // =================================================

    console.log("");
    console.log("=================================");
    console.log("RESULTADO DEL MODELO");
    console.log("=================================");
    console.log("Total registros:", rows.length);
    console.log("Entrenamiento:", Xtrain.length);
    console.log("Prueba:", Xtest.length);
    console.log("");
    console.log("MAE :", mae.toFixed(4));
    console.log("MSE :", mse.toFixed(4));
    console.log("RMSE:", rmse.toFixed(4));
    console.log("R²  :", r2.toFixed(4));
    console.log("=================================");

    // =================================================
    // GRÁFICA 1
    // REAL VS PREDICCIÓN
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
            label: "Real",
            data: Ytest
              .slice(0, 100)
              .map(x => x[0]),
            borderColor: "blue",
            borderWidth: 2
          },

          {
            label: "Predicción",
            data: predicciones
              .slice(0, 100),
            borderColor: "red",
            borderWidth: 2
          }
        ]
      }
    };

    const imagen1 =
      await chartJSNodeCanvas.renderToBuffer(grafica1);

    fs.writeFileSync(
      "./resultados/01_real_vs_prediccion.png",
      imagen1
    );

    // =================================================
    // GRÁFICA 2
    // DEMANDA
    // =================================================

    const demanda =
      rows
        .slice(0, 150)
        .map(
          r => Number(r.demanda_proxima_semana)
        );

    const grafica2 = {
      type: "line",

      data: {
        labels:
          demanda.map(
            (_, i) => i + 1
          ),

        datasets: [
          {
            label:
              "Demanda Semanal",

            data:
              demanda,

            borderColor:
              "green",

            borderWidth: 2
          }
        ]
      }
    };

    const imagen2 =
      await chartJSNodeCanvas.renderToBuffer(grafica2);

    fs.writeFileSync(
      "./resultados/02_demanda.png",
      imagen2
    );

    // =================================================
    // GRÁFICA 3
    // CONSUMO VS DEMANDA
    // =================================================

    const grafica3 = {

      type: "scatter",

      data: {
        datasets: [
          {
            label:
              "Consumo vs Demanda",

            data:
              rows
                .slice(0, 300)
                .map(r => ({
                  x:
                    Number(r.consumo_semanal),

                  y:
                    Number(r.demanda_proxima_semana)
                })),

            backgroundColor:
              "orange",

            pointRadius: 4
          }
        ]
      }
    };

    const imagen3 =
      await chartJSNodeCanvas.renderToBuffer(grafica3);

    fs.writeFileSync(
      "./resultados/03_consumo_vs_demanda.png",
      imagen3
    );

    console.log("");
    console.log("=================================");
    console.log("GRÁFICAS GENERADAS");
    console.log("=================================");
    console.log("./resultados/01_real_vs_prediccion.png");
    console.log("./resultados/02_demanda.png");
    console.log("./resultados/03_consumo_vs_demanda.png");
    console.log("=================================");
  })

  .on("error", (error) => {

    console.error("Error leyendo CSV");

    console.error(error);

  });