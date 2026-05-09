# Research: Sitio Web Institucional

## Decisiones Técnicas

### 1. Stack Tecnológico
- **Decision**: HTML5, Vanilla CSS, y Vanilla JavaScript sin frameworks pesados.
- **Rationale**: El sitio es puramente informativo (misión, visión, acciones, equipo) y no requiere estado complejo ni reactividad avanzada. Usar Vanilla JS y CSS asegura el máximo rendimiento, menor tamaño de carga (cumpliendo el SC-002 de <3s) y alineación con las guidelines del proyecto.
- **Alternatives considered**: React/Next.js (excesivo para un sitio estático de una sola página o pocas vistas simples), TailwindCSS (descartado por guidelines a menos que el usuario lo pida explícitamente).

### 2. Estructura de Archivos
- **Decision**: Una estructura simple de archivos estáticos (index.html, styles.css, script.js) con una carpeta para `assets/`.
- **Rationale**: Facilita el despliegue en cualquier hosting gratuito (como GitHub Pages o Vercel) y es muy fácil de mantener para un equipo que no sea técnico.
- **Alternatives considered**: Generador de sitios estáticos (Astro, Hugo). Considerado pero descartado por simplicidad, ya que el contenido actual es muy acotado.

### 3. Contacto por WhatsApp
- **Decision**: Enlace directo a `wa.me` usando la API oficial de WhatsApp.
- **Rationale**: Es la forma más directa, nativa y ligera de cumplir con el FR-004 sin depender de widgets de terceros que ralentizan el sitio.
