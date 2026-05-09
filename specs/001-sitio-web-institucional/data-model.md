# Data Model: Sitio Web Institucional

Al ser un sitio web estático y puramente informativo para esta primera iteración, **no se requiere una base de datos ni modelos de datos dinámicos**.

Toda la información (textos, listas de integrantes, descripciones de actividades) estará embebida directamente en el HTML o, de ser necesario para limpieza de código, estructurada en simples objetos JSON estáticos dentro de `src/js/main.js` o archivos de configuración.

Las "entidades" mencionadas en la especificación (Integrantes, Actividades) serán representadas mediante bloques HTML/CSS (tarjetas/cards) usando la información provista en la carpeta `docs`.
