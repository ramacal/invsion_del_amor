# Logo "invasion / del amor"

`src/assets/logos/logo.svg` se genera con `build-logo.js` a partir de la tipografía
Comfortaa, encajando cada letra en las posiciones medidas del logo original
(`src/assets/logos/logo-nuevo-original.png`, 150px). La n, la v, la s y las i se dibujan
a mano (más geométricas que Comfortaa) y la "o" es un disco con un corazón recortado.

## Regenerar

```powershell
npm install opentype.js@1
# Bajar Comfortaa-400.ttf y Comfortaa-700.ttf (Google Fonts) en tools/logo/fonts/
node tools/logo/build-logo.js src/assets/logos/logo.svg '{"sw1":4,"sw2":1,"heartW":0.52,"heartH":0.44,"heartDy":0}'
```

Opciones: `sw1`/`sw2` (grosor extra de cada línea), `stem1` (grosor de n/v/s/i),
`heartW`/`heartH`/`heartDy` (tamaño y posición del corazón).

El favicon (`favicon.png`, 192px) y `og-image.jpg` (1200×630) se renderizan desde el SVG
sobre fondo `#0D0D0D`.
