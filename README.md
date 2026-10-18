# Predicción de Inventario con Machine Learning

## Descripción del Proyecto

Este proyecto fue desarrollado como parte de la asignatura **Inteligencia Artificial y Machine Learning** de la Maestría en Sistemas Computacionales.

La finalidad del proyecto es implementar un modelo de **Machine Learning** capaz de predecir los niveles finales de inventario mediante técnicas de aprendizaje supervisado, utilizando información histórica relacionada con movimientos de almacén.

La solución fue desarrollada utilizando **Node.js** y un modelo de **Regresión Lineal Múltiple**, permitiendo estimar la existencia final de productos a partir de variables operativas relevantes.

---

## Problema Planteado

La empresa Maquiladora San José requiere mejorar el control y la planeación de inventarios para evitar:

- Exceso de existencias.
- Desabasto de materiales.
- Incremento de costos de almacenamiento.
- Interrupciones en la producción.

Mediante Machine Learning se busca generar predicciones que apoyen la toma de decisiones relacionadas con compras y abastecimiento.

---

## Objetivo General

Desarrollar un modelo de Machine Learning que permita predecir los niveles finales de inventario utilizando datos históricos de movimientos de almacén, contribuyendo a una administración más eficiente de los recursos disponibles.

---

## Tipo de Aprendizaje

**Aprendizaje Supervisado**

Se seleccionó este enfoque porque se cuenta con datos históricos donde las variables de entrada están asociadas con una variable objetivo conocida.

---

## Modelo Seleccionado

### Regresión Lineal Múltiple

La regresión lineal múltiple fue seleccionada debido a que:

- La variable objetivo es numérica.
- Existe una relación lineal entre las variables.
- Permite interpretar fácilmente los resultados.
- Es adecuada para problemas de predicción de inventarios.

---

## Conjunto de Datos

El conjunto de datos utilizado fue generado con fines académicos y simula registros de movimientos de inventario de una empresa manufacturera.

### Variables utilizadas

#### Variables predictoras (X)

- existencia_inicial
- cantidad_recibida
- cantidad_utilizada
- costo_unitario

#### Variable objetivo (Y)

- existencia_final

---

## Preprocesamiento de Datos

Antes del entrenamiento del modelo se realizaron las siguientes actividades:

- Validación de registros.
- Conversión de datos a formato numérico.
- Separación de variables predictoras y variable objetivo.
- División del conjunto de datos para entrenamiento y prueba.

Distribución utilizada:

- 80% Entrenamiento
- 20% Prueba

---

## Tecnologías Utilizadas

- Node.js
- JavaScript
- Git
- GitHub
- csv-parser
- ml-regression-multivariate-linear

---

## Estructura del Proyecto

```text
machine-learning-inventario
│
├── inventario_maquiladora_ml_realista.csv
├── train.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/TU-USUARIO/machine-learning-inventario.git
```

Entrar al proyecto:

```bash
cd machine-learning-inventario
```

Instalar dependencias:

```bash
npm install
```

---

## Ejecución

Ejecutar el entrenamiento del modelo:

```bash
node train.js
```

---

## Resultados Obtenidos

Durante la ejecución se obtuvieron los siguientes resultados:

```text
Registros Totales: 2920
Datos Entrenamiento: 2336
Datos Prueba: 584

MAE: 0.0000
R²: 1.0000

Valor Real: 6140
Predicción: 6140.00
```

### Interpretación

#### MAE (Mean Absolute Error)

El valor obtenido fue:

```text
MAE = 0.0000
```

Esto indica que el error promedio de las predicciones es prácticamente nulo.

#### R² (Coeficiente de Determinación)

El valor obtenido fue:

```text
R² = 1.0000
```

Lo anterior significa que el modelo explica el 100% de la variabilidad observada en los datos utilizados.

---

## Optimización del Modelo

Después de evaluar el modelo se observó un desempeño óptimo, por lo que no fue necesario realizar ajustes adicionales de hiperparámetros ni utilizar algoritmos más complejos.

Como trabajo futuro se podrían evaluar alternativas como:

- Árboles de Decisión.
- Random Forest.
- Redes Neuronales Artificiales.
- Gradient Boosting.

---

## Conclusiones

La implementación realizada demuestra cómo el Machine Learning puede utilizarse para apoyar procesos de gestión de inventarios mediante el análisis de datos históricos.

El modelo de Regresión Lineal Múltiple permitió predecir con precisión la existencia final de inventario, validando la utilidad de las técnicas de aprendizaje supervisado para problemas relacionados con logística, planeación y control de recursos.

---

## Autor

**Alejandro Calzada Rodríguez**

Maestría en Sistemas Computacionales  
Instituto Universitario Veracruzano (IUV)

Materia:
**Inteligencia Artificial y Machine Learning**

2026