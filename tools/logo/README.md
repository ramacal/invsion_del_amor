# Logo "invasion / del amor"

`src/assets/logos/logo.svg` se genera con `build-logo.js` a partir de la tipografía
Comfortaa, encajando cada letra en las posiciones medidas del logo original
(`src/assets/logos/logo-nuevo-original.png`, 150px). La n, la v, la s, las i y la l se dibujan
a mano (más geométricas que Comfortaa) y la "o" es un disco con un corazón recortado.

## Regenerar

```powershell
npm install opentype.js@1
# Bajar Comfortaa-400.ttf y Comfortaa-700.ttf (Google Fonts) en tools/logo/fonts/
node tools/logo/build-logo.js src/assets/logos/logo.svg '{"font2":"reg","sw1":7,"sw2":3,"heartW":0.46,"heartH":0.42,"heartDy":0.03,"vStem":15,"sStem":14,"vFlat":6,"vExt":0.5}'
```

Opciones: `sw1`/`sw2` (grosor extra de cada línea), `font2` (`reg`/`bold` para "del amor"),
`stem1`, `vStem`, `sStem` (grosor de n/i, v y s), `vFlat`/`vExt` (base y puntas de la v),
`heartW`/`heartH`/`heartDy` (tamaño y posición del corazón). Los valores actuales se eligieron
midiendo la diferencia píxel a píxel contra el original.

El favicon (`favicon.png`, 192px) y `og-image.jpg` (1200×630) se renderizan desde el SVG
sobre fondo `#0D0D0D`.
