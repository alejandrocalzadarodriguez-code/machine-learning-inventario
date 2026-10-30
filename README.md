Predicción de Demanda de Insumos mediante Machine Learning
Descripción General

Este proyecto fue desarrollado como parte de la asignatura Inteligencia Artificial y Machine Learning de la Maestría en Sistemas Computacionales.

El objetivo consiste en desarrollar un modelo de Machine Learning capaz de predecir la demanda semanal de insumos utilizados en una empacadora de limón, con la finalidad de mejorar la gestión de inventarios y apoyar la toma de decisiones relacionadas con compras, abastecimiento y control de existencias.

La solución fue implementada utilizando Node.js y un modelo de Regresión Lineal Múltiple, complementado con la generación automática de métricas de desempeño y gráficas estadísticas para facilitar el análisis de resultados.

Problema Planteado

La empresa requiere mejorar la administración de los insumos utilizados en sus procesos de maquila para reducir riesgos asociados con:

Desabasto de materiales.
Compras urgentes no planificadas.
Exceso de inventario.
Incremento en costos de almacenamiento.
Planeación ineficiente de abastecimiento.

Para atender esta problemática se desarrolló un modelo predictivo capaz de estimar la demanda futura de insumos utilizando información histórica de operación.

Objetivo General

Desarrollar un modelo de Machine Learning que permita predecir la demanda semanal de insumos a partir del análisis de variables históricas relacionadas con inventarios, consumo, pedidos pendientes y condiciones de operación.

Tipo de Aprendizaje Utilizado
Aprendizaje Supervisado

Se seleccionó este enfoque debido a que se dispone de una variable objetivo conocida (demanda_proxima_semana) y un conjunto de variables predictoras que permiten estimarla.

El modelo aprende a partir de ejemplos históricos donde se conoce tanto la información de entrada como los resultados observados.

Modelo Seleccionado
Regresión Lineal Múltiple

La Regresión Lineal Múltiple fue seleccionada porque:

La variable objetivo es numérica.
Permite modelar relaciones entre múltiples variables.
Es fácil de interpretar.
Presenta buen desempeño en problemas de predicción continua.
Facilita el análisis de la influencia de las variables independientes.
Fuente de Datos

Para esta actividad se utilizó una porción del histórico real de operaciones correspondiente al último año de actividad de la empresa.

Los datos empleados fueron autorizados exclusivamente para fines académicos y se utilizaron respetando las políticas de confidencialidad de la organización.

Variables Utilizadas
Variables Predictoras (X)
inventario_actual
consumo_semanal
pedidos_pendientes
dias_entrega
precio_unitario
temporada
mercado
temperatura_promedio
Variable Objetivo (Y)
demanda_proxima_semana
Stack Tecnológico
Lenguaje de Programación
Node.js
JavaScript
Librerías Utilizadas
csv-parser

Lectura y procesamiento de archivos CSV.

ml-regression-multivariate-linear

Implementación del algoritmo de Regresión Lineal Múltiple.

chart.js

Generación de gráficas estadísticas.

chartjs-node-canvas

Renderizado de gráficas directamente desde Node.js.

fs

Manejo de archivos y directorios.

Estructura del Proyecto
Plain Text
machine-learning-inventario
│
├── evaluacion_modelo.js
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
│
└── resultados
│
├── 01_real_vs_prediccion.png
├── 02_demanda.png
└── 03_consumo_vs_demanda.png
Preprocesamiento de Datos

Antes del entrenamiento se realizaron las siguientes actividades:

Conversión de Variables

Conversión de todos los valores numéricos mediante:

JavaScript
Number()
 
Codificación de Variables Categóricas

Variables como temporada y mercado fueron transformadas a valores numéricos para permitir su utilización dentro del modelo.

Selección de Características

Se seleccionaron únicamente las variables relevantes para el problema de predicción de demanda.

División del Dataset

Los registros fueron divididos en:

Plain Text
80% Entrenamiento
20% Prueba

Resultados:

Plain Text
Total de registros: 5000
Entrenamiento: 4000
Prueba: 1000
 
Entrenamiento del Modelo

El modelo fue entrenado utilizando el conjunto de entrenamiento y posteriormente evaluado utilizando el conjunto de prueba.

Implementación principal:

JavaScript
const modelo = new MLR(
Xtrain,
Ytrain
);
Métricas de Evaluación

Para evaluar el desempeño del modelo se utilizaron las siguientes métricas:

MAE (Mean Absolute Error)

Mide el error promedio absoluto entre los valores reales y las predicciones.

MSE (Mean Squared Error)

Mide el promedio del cuadrado de los errores.

RMSE (Root Mean Squared Error)

Expresa el error promedio utilizando las mismas unidades de la variable objetivo.

R² (Coeficiente de Determinación)

Mide la capacidad del modelo para explicar la variabilidad de los datos observados.

Resultados Obtenidos

La ejecución del modelo produjo los siguientes resultados:

Plain Text
Total registros: 5000
 
Entrenamiento: 4000
 
Prueba: 1000
 
MAE : 83.5934
 
MSE : 10322.4402
 
RMSE: 101.5994
 
R² : 0.8634
Interpretación de Resultados
MAE = 83.5934

El modelo presenta un error promedio de aproximadamente 84 unidades por predicción.

MSE = 10322.4402

Existen algunos errores de mayor magnitud, aunque se mantienen dentro de rangos aceptables.

RMSE = 101.5994

El error típico de predicción es de aproximadamente 102 unidades.

R² = 0.8634

El modelo explica aproximadamente el 86.34% de la variabilidad observada en la demanda semanal de insumos.

Archivos Generados

Durante la ejecución se generan automáticamente las siguientes visualizaciones:

Plain Text
./resultados/01_real_vs_prediccion.png
 
./resultados/02_demanda.png
 
./resultados/03_consumo_vs_demanda.png
Ejecución

Instalar dependencias:

Shell
npm install

Ejecutar:

Shell
node evaluacion_modelo.js
Propuestas de Mejora

Como líneas futuras de trabajo podrían evaluarse:

Random Forest.
XGBoost.
Gradient Boosting.
Redes Neuronales Artificiales.
Incorporación de variables climáticas.
Inclusión de históricos de producción más amplios.
Conclusiones

Los resultados obtenidos demuestran que el modelo posee una capacidad predictiva adecuada para apoyar la gestión de inventarios de una empacadora de limón. El valor obtenido de R² (0.8634) indica que más del 86% de la variabilidad observada en la demanda semanal es explicada por las variables analizadas.

La utilización de información histórica real permitió validar el comportamiento del modelo bajo condiciones operativas auténticas, obteniendo resultados útiles para futuras aplicaciones de inteligencia artificial orientadas a la optimización de inventarios y procesos de abastecimiento.

Autor

Alejandro Calzada Rodríguez

Maestría en Sistemas Computacionales

Instituto Universitario Veracruzano (IUV)

Asignatura: Inteligencia Artificial y Machine Learning

2026