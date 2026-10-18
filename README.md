# Predicción de Inventario con Machine Learning

## Descripción General

Este proyecto fue desarrollado como parte de la asignatura **Inteligencia Artificial y Machine Learning** de la Maestría en Sistemas Computacionales.

El objetivo principal consiste en implementar un modelo de Machine Learning capaz de predecir los niveles finales de inventario utilizando datos históricos de movimientos de almacén, permitiendo apoyar la toma de decisiones relacionadas con compras, abastecimiento y control de existencias.

La solución fue desarrollada utilizando **Node.js** y un modelo de **Regresión Lineal Múltiple**, complementado con la generación automática de gráficas para analizar visualmente el comportamiento de los datos y validar el desempeño del modelo.

---

# Problema Planteado

La empresa Maquiladora San José requiere mejorar la gestión de sus inventarios para minimizar problemas asociados con:

- Exceso de existencias.
- Costos elevados de almacenamiento.
- Desabasto de materiales.
- Interrupciones en la producción.
- Planeación ineficiente de compras.

El uso de técnicas de Machine Learning permite analizar datos históricos y generar predicciones que apoyen la toma de decisiones empresariales.

---

# Objetivo General

Desarrollar un modelo de Machine Learning capaz de predecir el inventario final de productos mediante el análisis de variables históricas relacionadas con movimientos de almacén.

---

# Tipo de Aprendizaje Utilizado

## Aprendizaje Supervisado

Se seleccionó este enfoque porque se dispone de una variable objetivo conocida (**existencia_final**) y de un conjunto de variables predictoras que permiten estimarla.

El modelo aprende a partir de ejemplos históricos donde se conoce tanto la entrada como el resultado esperado.

---

# Modelo Seleccionado

## Regresión Lineal Múltiple

La Regresión Lineal Múltiple fue seleccionada debido a que:

- La variable objetivo es numérica.
- Existe una relación directa entre las variables del inventario.
- Es un modelo sencillo de interpretar.
- Presenta un excelente desempeño en problemas de predicción continua.
- Permite evaluar fácilmente la influencia de las variables independientes sobre la variable objetivo.

---

# Dataset Utilizado

Se trabajó con un conjunto de datos sintético generado para fines académicos.

## Variables Predictoras (X)

- existencia_inicial
- cantidad_recibida
- cantidad_utilizada
- costo_unitario

## Variable Objetivo (Y)

- existencia_final

---

# Tecnologías Utilizadas

## Lenguaje de Programación

- Node.js
- JavaScript

## Librerías Utilizadas

### csv-parser

Permite leer y procesar archivos CSV.

### ml-regression-multivariate-linear

Implementa el algoritmo de Regresión Lineal Múltiple.

### chart.js

Biblioteca para la generación de visualizaciones.

### chartjs-node-canvas

Permite generar gráficos Chart.js directamente desde Node.js.

---

# Estructura del Proyecto

```text
machine-learning-inventario
│
├── inventario_maquiladora.csv
├── train.js
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
│
└── resultados
    │
    ├── 01_real_vs_prediccion.png
    ├── 02_inventario.png
    └── 03_existencia_vs_final.png
```

---

# Preprocesamiento de Datos

Antes del entrenamiento se realizaron las siguientes actividades:

## Conversión de Datos

Las variables fueron transformadas a formato numérico utilizando la función:

```javascript
Number()
```

## Selección de Características

Se eligieron únicamente las variables relevantes para el problema:

```text
existencia_inicial
cantidad_recibida
cantidad_utilizada
costo_unitario
```

## Definición de Variable Objetivo

```text
existencia_final
```

## División del Conjunto de Datos

Los registros fueron separados en:

- 80% Entrenamiento
- 20% Prueba

Resultados:

```text
Datos de entrenamiento: 2336
Datos de prueba: 584
```

---

# Entrenamiento del Modelo

El modelo fue entrenado utilizando los registros pertenecientes al conjunto de entrenamiento.

Posteriormente se utilizaron los registros del conjunto de prueba para verificar la capacidad de predicción del sistema.

Código principal utilizado:

```javascript
const modelo = new MLR(
  Xtrain,
  Ytrain
);
```

---

# Métricas de Evaluación

Para evaluar el desempeño del modelo se utilizaron dos métricas ampliamente utilizadas en Machine Learning.

## MAE (Mean Absolute Error)

Mide el error promedio absoluto existente entre los valores reales y las predicciones realizadas por el modelo.

Un valor cercano a cero indica una mayor precisión.

## R² (Coeficiente de Determinación)

Mide la capacidad del modelo para explicar la variabilidad de los datos.

Su valor oscila entre:

```text
0 = Sin capacidad explicativa
1 = Capacidad explicativa perfecta
```

---

# Resultados Obtenidos

La ejecución del modelo produjo los siguientes resultados:

```text
Registros Totales: 2920
Datos Entrenamiento: 2336
Datos Prueba: 584

MAE: 0.0000
R²: 1.0000

Valor Real: 6140
Predicción: 6140.00
```

## Interpretación

### MAE = 0.0000

El error promedio es prácticamente nulo.

### R² = 1.0000

El modelo logra explicar el 100% de la variación observada en los datos utilizados.

### Predicción

El valor predicho coincide exactamente con el valor real registrado, demostrando la capacidad predictiva del modelo.

---

# Visualización de Resultados

El programa genera automáticamente tres gráficas en formato PNG.

---

## Gráfica 1
### 01_real_vs_prediccion.png

**Objetivo:**

Comparar visualmente los valores reales del inventario contra las predicciones generadas por el modelo.

**Interpretación:**

Si ambas líneas permanecen superpuestas o muy cercanas, significa que el modelo está realizando predicciones precisas.

**Importancia:**

Esta es la gráfica más relevante para validar el desempeño del modelo.

---

## Gráfica 2
### 02_inventario.png

**Objetivo:**

Mostrar la evolución histórica del inventario final.

**Interpretación:**

Permite identificar tendencias, incrementos y disminuciones en los niveles de inventario.

**Importancia:**

Facilita comprender el comportamiento operativo del almacén a través del tiempo.

---

## Gráfica 3
### 03_existencia_vs_final.png

**Objetivo:**

Representar la relación entre la existencia inicial y la existencia final.

**Interpretación:**

Cada punto representa un registro del conjunto de datos.

Mientras más alineados se encuentren los puntos, mayor será la relación entre ambas variables.

**Importancia:**

Permite visualizar la correlación existente entre las variables utilizadas por el modelo.

---

# Optimización del Modelo

Tras evaluar los resultados obtenidos se determinó que el modelo alcanzó un desempeño óptimo:

```text
MAE = 0.0000
R² = 1.0000
```

Debido a este nivel de precisión no fue necesario aplicar técnicas adicionales de optimización tales como:

- Grid Search
- Random Search
- Ajuste de hiperparámetros
- Selección adicional de características

Sin embargo, como trabajo futuro podrían evaluarse modelos de mayor complejidad:

- Árboles de Decisión
- Random Forest
- Redes Neuronales Artificiales
- Gradient Boosting

---

# Instalación

Instalar dependencias:

```bash
npm install
```

O individualmente:

```bash
npm install csv-parser
npm install ml-regression-multivariate-linear
npm install chart.js
npm install chartjs-node-canvas
```

---

# Ejecución

Ejecutar:

```bash
node train.js
```

---

# Archivos Generados

Tras la ejecución del programa se generan automáticamente:

```text
./resultados/01_real_vs_prediccion.png

./resultados/02_inventario.png

./resultados/03_existencia_vs_final.png
```

---

# Conclusiones

La implementación de un modelo de Regresión Lineal Múltiple permitió predecir correctamente el inventario final utilizando variables históricas relacionadas con los movimientos de almacén.

La solución desarrollada demuestra cómo las técnicas de Machine Learning pueden apoyar procesos empresariales relacionados con planificación de compras, control de inventarios y optimización de recursos.

Los resultados obtenidos evidencian la capacidad de los modelos supervisados para identificar patrones y generar predicciones de alta precisión cuando los datos poseen relaciones claramente definidas.

---

# Autor

**Alejandro Calzada Rodríguez**

Maestría en Sistemas Computacionales

Instituto Universitario Veracruzano (IUV)

Materia:
**Inteligencia Artificial y Machine Learning**

Año:
**2026**