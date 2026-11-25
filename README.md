# Web personal · Jorge García

Página única en HTML, CSS y JavaScript sin frameworks ni dependencias externas.

```
index.html          Estructura y textos de Inicio, Sobre mí e introducciones de sección
css/styles.css      Estilos (paleta oscura en :root, clara en :root[data-theme="light"])
js/config.js        Correo, enlaces, foto y ubicación  ← editar aquí
js/content.js       Textos de tarjetas y ventanas de detalle  ← editar aquí
js/main.js          Lógica de interfaz (no hace falta tocarla para cambiar contenido)
assets/favicon.svg  Favicon «JG»
assets/retrato.jpg  Retrato del inicio
```

## Ejecutar en local

Los scripts funcionan abriendo `index.html` directamente, pero para probar como en producción (p. ej., el botón «Copiar dirección») usa un servidor:

```powershell
python -m http.server 8090 --directory C:\Users\geosm524\Documents\ProyectosClaude\WebPersonal
```

Abre http://localhost:8090.

## Desplegar

Es un sitio estático: sube la carpeta tal cual a GitHub Pages, Netlify, Cloudflare Pages o cualquier hosting. No hay paso de compilación.

Cuando tengas dominio, añade en `index.html`:
- `<link rel="canonical" href="https://tu-dominio/">` y `<meta property="og:url" ...>`.
- `<meta property="og:image" content="https://tu-dominio/assets/...">` (URL absoluta, idealmente 1200×630).

Tras cambiar CSS o JS, sube el número de `?v=6` en las etiquetas de `index.html` para evitar que los navegadores usen la versión en caché.

## Editar

- **Foto:** sustituye `assets/retrato.jpg` o cambia `photo` en `js/config.js`. Con `photo: ""` se muestra el monograma «JG». Si la foto no carga, también se mantiene el monograma.
- **Correo y enlaces:** `js/config.js`. Un campo vacío oculta su botón. Si todos están vacíos se muestra «Datos de contacto pendientes de configurar»: **añade al menos un canal antes de publicar**.
- **Textos de tarjetas y ventanas:** `js/content.js`. Cada tarjeta tiene `summary` (visible) y `dialog` (ventana). La etiqueta `badge` distingue «Investigación» de «En exploración».
- **Inicio, Sobre mí e introducciones de sección:** directamente en `index.html`.
- **Colores de cada tema:** variables al principio de `css/styles.css`. El monograma «JG» y el favicon mantienen fondo oscuro en ambos temas a propósito.

## Tema claro y oscuro

El botón con el icono de sol/luna de la cabecera (junto a «Menú» en móvil) alterna el tema. En la primera visita se usa el tema del sistema; al pulsar el botón la elección se guarda en `localStorage` y se respeta en visitas siguientes. Un script corto en el `<head>` aplica el tema antes de pintar para evitar destellos.

## Comprobaciones realizadas (25/11/2026, Chromium del navegador integrado)

- Escritorio 1366×850 y móvil 375×812: sin desplazamiento horizontal; tarjetas apiladas en móvil.
- Un único H1; jerarquía H1 → H2 (secciones) → H3 (tarjetas).
- Navegación por anclas en escritorio y desde el menú móvil: el título queda visible bajo la cabecera fija y el menú se cierra al elegir sección.
- Ventanas con teclado: Enter abre, el foco va a «Cerrar», Tab no sale de la ventana, Escape cierra y el foco vuelve al botón que la abrió. En móvil la ventana se ajusta al ancho y su contenido se desplaza.
- Contacto con datos: enlace `mailto:` correcto, «Copiar dirección» copia y lo anuncia, LinkedIn y ORCID abren en pestaña nueva; GitHub y Scholar (vacíos) no aparecen.
- Contacto sin datos y sin foto: aparece el aviso de datos pendientes, ningún botón y el monograma «JG».
- Consola sin errores.
- Tema claro/oscuro: el botón cambia el tema con ratón y con teclado, actualiza su etiqueta accesible y `theme-color`, la elección persiste al recargar, y la cabecera cabe a 980 px y 375 px sin desbordes. Revisados visualmente inicio, docencia, aficiones, una ventana y contacto en tema claro.

## Pendiente de comprobar

- Safari/iOS y Firefox (solo se ha probado en Chromium).
- Lector de pantalla real (NVDA, VoiceOver).
- Seguimiento automático del tema del sistema cuando cambia con la página abierta (implementado, no emulado).
- `prefers-reduced-motion` no se ha emulado; las reglas están en el CSS.
- Contrastes calculados a mano con los valores de la paleta; conviene pasar Lighthouse o axe antes de publicar.
- Revisar que los textos de aficiones reflejan tu realidad (p. ej., «Aire libre y cocina»).
