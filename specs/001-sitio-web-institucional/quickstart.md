# Quickstart: Sitio Web Institucional

Este es un sitio web estático. No requiere dependencias de backend complejas.

## Desarrollo Local

1. Navegar a la carpeta raíz del proyecto.
2. Si tienes Node.js instalado, puedes usar `npx serve .` para iniciar un servidor local rápido.
   Alternativamente, puedes usar la extensión "Live Server" en VS Code.
3. El sitio estará disponible en `http://localhost:3000` (o el puerto que indique el servidor).

## Estructura

- `src/index.html`: Punto de entrada principal.
- `src/styles/`: Archivos CSS organizados lógicamente (variables, reset, componentes).
- `src/js/main.js`: Lógica de interactividad y animaciones.
- `src/assets/`: Imágenes y logos provenientes de la carpeta `docs`.

## Despliegue

Dado que es un sitio web estático puro, puede desplegarse arrastrando la carpeta `src/` o el repositorio completo a servicios como GitHub Pages, Vercel, o Netlify.
