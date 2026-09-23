# Veterinaria Juan Antonio Coronado — Sitio web

Sitio web estático (HTML + CSS + JS, sin dependencias) para la Veterinaria Juan Antonio Coronado en Saltillo, Coahuila.

## Estructura

```
index.html          Página principal
css/styles.css      Estilos (la paleta de colores está al inicio en :root)
js/main.js          Menú móvil, indicador "Abierto ahora", animaciones
assets/             Logo, favicon e imágenes
```

## Cómo verlo

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
```

## Personalizar

- **Logo:** guarda el logo oficial como `assets/logo.png` (de preferencia cuadrado, fondo transparente). Mientras no exista se muestra `assets/logo-placeholder.svg`.
- **Colores:** edita las variables `--color-primary`, `--color-accent`, etc. al inicio de `css/styles.css` para igualar el logo.
- **Horario:** está en `index.html` (sección `#horario`) y en el objeto `HOURS` de `js/main.js` (para el indicador "Abierto ahora").

## Publicar

Al ser un sitio estático se puede publicar gratis en GitHub Pages (Settings → Pages → rama `main`, carpeta raíz), Netlify o Vercel.
