# Predicción de Demanda de Insumos mediante Machine Learning

## Descripción General

Este proyecto fue desarrollado como parte de la asignatura Inteligencia Artificial y Machine Learning de la Maestría en Sistemas Computacionales.

El objetivo consiste en desarrollar un modelo de Machine Learning capaz de predecir la demanda semanal de insumos utilizados en una empacadora de limón, con la finalidad de mejorar la gestión de inventarios y apoyar la toma de decisiones relacionadas con compras, abastecimiento y control de existencias.

La solución fue implementada utilizando Node.js y un modelo de Regresión Lineal Múltiple, complementado con la generación automática de métricas de desempeño y gráficas estadísticas para facilitar el análisis de resultados.

---

# Problema Planteado

La empresa requiere mejorar la administración de los insumos utilizados en sus procesos de maquila para reducir riesgos asociados con:

- Desabasto de materiales.
- Compras urgentes no planificadas.
- Exceso de inventario.
- Incremento en costos de almacenamiento.
- Planeación ineficiente de abastecimiento.

Para atender esta problemática se desarrolló un modelo predictivo capaz de estimar la demanda futura de insumos utilizando información histórica de operación.

---

# Objetivo General

Desarrollar un modelo de Machine Learning que permita predecir la demanda semanal de insumos a partir del análisis de variables históricas relacionadas con inventarios, consumo, pedidos pendientes y condiciones de operación.

---

# Tipo de Aprendizaje Utilizado

## Aprendizaje Supervisado

Se seleccionó este enfoque debido a que se dispone de una variable objetivo conocida (demanda_proxima_semana) y un conjunto de variables predictoras que permiten estimarla.

El modelo aprende a partir de ejemplos históricos donde se conoce tanto la información de entrada como los resultados observados.

---

# Modelo Seleccionado

## Regresión Lineal Múltiple

La Regresión Lineal Múltiple fue seleccionada porque:

- La variable objetivo es numérica.
- Permite modelar relaciones entre múltiples variables.
- Es fácil de interpretar.
- Presenta buen desempeño en problemas de predicción continua.
- Facilita el análisis de la influencia de las variables independientes.

---

# Fuente de Datos

Para esta actividad se utilizó una porción del histórico real de operaciones correspondiente al último año de actividad de la empresa.

Los datos empleados fueron autorizados exclusivamente para fines académicos y se utilizaron respetando las políticas de confidencialidad de la organización. Debido a ello, los registros publicados en este repositorio fueron anonimizados y no contienen información sensible de la empresa.

---

# Variables Utilizadas

## Variables Predictoras (X)

- inventario_actual
- consumo_semanal
- pedidos_pendientes
- dias_entrega
- precio_unitario
- temporada
- mercado
- temperatura_promedio

## Variable Objetivo (Y)

- demanda_proxima_semana

---

# Stack Tecnológico

## Lenguaje de Programación

- Node.js
- JavaScript

## Librerías Utilizadas

### csv-parser

Permite leer y procesar archivos CSV que contienen los registros históricos utilizados para el entrenamiento y evaluación del modelo.

### ml-regression-multivariate-linear

Implementa el algoritmo de Regresión Lineal Múltiple utilizado para generar las predicciones de demanda.

### chart.js

Biblioteca utilizada para generar las visualizaciones y análisis gráficos de los resultados.

### chartjs-node-canvas

Herramienta que permite renderizar las gráficas de Chart.js directamente desde Node.js y exportarlas como imágenes PNG.

### fs

Módulo nativo de Node.js utilizado para la lectura, escritura y gestión de archivos y directorios.

---

# Estructura del Proyecto

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

---

# Preprocesamiento de Datos

Antes del entrenamiento se realizaron las siguientes actividades:

## Conversión de Variables

Las variables numéricas fueron convertidas utilizando la función:

Number()

para garantizar que los datos fueran procesados correctamente por el algoritmo de Machine Learning.

## Codificación de Variables Categóricas

Las variables categóricas como temporada y mercado fueron transformadas a valores numéricos para permitir su utilización dentro del modelo de regresión.

## Selección de Características

Se seleccionaron las variables consideradas más relevantes para la predicción de la demanda semanal.

## División del Dataset

Los registros fueron divididos en:

- 80% para entrenamiento.
- 20% para prueba.

Resultados:

- Total de registros: 5000
- Entrenamiento: 4000
- Prueba: 1000

---

# Entrenamiento del Modelo

El modelo fue entrenado utilizando el conjunto de entrenamiento y posteriormente evaluado utilizando el conjunto de prueba.

Código principal utilizado:

const modelo = new MLR(
  Xtrain,
  Ytrain
);

Este proceso permitió identificar patrones existentes en los datos históricos y utilizarlos posteriormente para realizar predicciones sobre registros no observados durante el entrenamiento.

---

# Métricas de Evaluación

Para evaluar el desempeño del modelo se utilizaron las siguientes métricas:

## MAE (Mean Absolute Error)

Mide el error promedio absoluto existente entre los valores reales y las predicciones realizadas por el modelo.

## MSE (Mean Squared Error)

Calcula el promedio de los errores elevados al cuadrado, penalizando especialmente las predicciones con errores de gran magnitud.

## RMSE (Root Mean Squared Error)

Representa la raíz cuadrada del MSE y permite interpretar el error utilizando la misma escala que la variable objetivo.

## R² (Coeficiente de Determinación)

Mide la capacidad del modelo para explicar la variabilidad observada en los datos.

Valores cercanos a 1 indican un mejor ajuste del modelo.

---

# Resultados Obtenidos

La ejecución del modelo produjo los siguientes resultados:

Total registros: 5000

Entrenamiento: 4000

Prueba: 1000

MAE : 83.5934

MSE : 10322.4402

RMSE: 101.5994

R²  : 0.8634

---

# Interpretación de Resultados

## MAE = 83.5934

El modelo presenta un error promedio aproximado de 84 unidades por predicción respecto a la demanda real observada.

## MSE = 10322.4402

El análisis muestra la presencia de algunos errores de mayor magnitud, aunque sin afectar significativamente el desempeño general del modelo.

## RMSE = 101.5994

El error típico de predicción se mantiene cercano a 102 unidades, valor considerado aceptable para una primera implementación orientada a la gestión de inventarios.

## R² = 0.8634

El modelo es capaz de explicar aproximadamente el 86.34% de la variabilidad observada en la demanda semanal de insumos.

Este resultado evidencia una capacidad predictiva sólida y demuestra que las variables seleccionadas contienen información relevante para estimar el comportamiento futuro de la demanda.

---

# Archivos Generados

Durante la ejecución se generan automáticamente las siguientes visualizaciones:

./resultados/01_real_vs_prediccion.png

./resultados/02_demanda.png

./resultados/03_consumo_vs_demanda.png

---

# Ejecución

Instalar dependencias:

npm install

Ejecutar el proyecto:

node evaluacion_modelo.js

---

# Propuestas de Mejora

Como líneas futuras de trabajo podrían evaluarse:

- Random Forest.
- XGBoost.
- Gradient Boosting.
- Redes Neuronales Artificiales.
- Incorporación de variables climáticas.
- Inclusión de históricos de producción más amplios.
- Integración con sistemas ERP o plataformas de gestión de inventarios.
- Automatización periódica del entrenamiento y evaluación del modelo.

---

# Conclusiones

Los resultados obtenidos demuestran que el modelo posee una capacidad predictiva adecuada para apoyar la gestión de inventarios de una empacadora de limón.

El valor obtenido de R² (0.8634) indica que más del 86% de la variabilidad observada en la demanda semanal es explicada por las variables analizadas. Asimismo, los valores obtenidos en MAE, MSE y RMSE muestran un desempeño consistente y suficiente para apoyar procesos de planeación operativa.

La utilización de información histórica real permitió validar el comportamiento del modelo bajo condiciones operativas auténticas, obteniendo resultados útiles para futuras aplicaciones de inteligencia artificial orientadas a la optimización de inventarios y procesos de abastecimiento.

Aunque existen oportunidades de mejora mediante la incorporación de nuevas variables y algoritmos más avanzados, la solución desarrollada constituye una base sólida para futuros proyectos de analítica predictiva dentro de la organización.

---

# Autor

Alejandro Calzada Rodríguez

Maestría en Sistemas Computacionales

Instituto Universitario Veracruzano (IUV)

Asignatura:
Inteligencia Artificial y Machine Learning

Año:
2026