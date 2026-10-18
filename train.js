const fs = require("fs");
const csv = require("csv-parser");
const MLR = require("ml-regression-multivariate-linear");

const rows = [];

fs.createReadStream("./inventario_maquiladora.csv")
  .pipe(csv())

  .on("data", (row) => {
    rows.push(row);
  })

  .on("end", () => {

    console.log("=================================");
    console.log("ARCHIVO CARGADO");
    console.log("=================================");
    console.log("Registros encontrados:", rows.length);

    const X = [];
    const Y = [];

    rows.forEach((row) => {

      X.push([
        Number(row.existencia_inicial),
        Number(row.cantidad_recibida),
        Number(row.cantidad_utilizada),
        Number(row.costo_unitario)
      ]);

      Y.push([
        Number(row.existencia_final)
      ]);

    });

    const split = Math.floor(X.length * 0.8);

    const Xtrain = X.slice(0, split);
    const Ytrain = Y.slice(0, split);

    const Xtest = X.slice(split);
    const Ytest = Y.slice(split);

    console.log("Entrenamiento:", Xtrain.length);
    console.log("Prueba:", Xtest.length);

    const modelo = new MLR(
      Xtrain,
      Ytrain
    );

    const predicciones = Xtest.map(
      fila => modelo.predict(fila)[0]
    );

    let sumaError = 0;

    for (let i = 0; i < predicciones.length; i++) {

      sumaError += Math.abs(
        Ytest[i][0] - predicciones[i]
      );

    }

    const mae =
      sumaError / predicciones.length;

    const promedioReal =
      Ytest.reduce(
        (acc, item) => acc + item[0],
        0
      ) / Ytest.length;

    let ssRes = 0;
    let ssTot = 0;

    for (let i = 0; i < predicciones.length; i++) {

      ssRes += Math.pow(
        Ytest[i][0] - predicciones[i],
        2
      );

      ssTot += Math.pow(
        Ytest[i][0] - promedioReal,
        2
      );

    }

    const r2 =
      1 - (ssRes / ssTot);

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
    console.log(
      "Predicción:",
      predicciones[0].toFixed(2)
    );

  })

  .on("error", (error) => {

    console.error(
      "Error leyendo CSV:"
    );

    console.error(error);

  });