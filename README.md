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

- **Logo:** `assets/logo.jpg` (logo recortado), `assets/icono.png` (perrito, usado como favicon y en el pie de página) y `assets/logo-original.jpg` (archivo original).
- **Colores:** tomados del logo (azul marino `#183c6c`, aqua `#30a8b4`, gris `#c8ccd4`). Se editan en las variables al inicio de `css/styles.css`.
- **Horario:** está en `index.html` (sección `#horario`) y en el objeto `HOURS` de `js/main.js` (para el indicador "Abierto ahora").

## Publicar

Es un sitio estático, no requiere compilación.

**Vercel:** Add New → Project → importar este repositorio → Framework Preset: *Other* → Deploy (sin comando de build ni carpeta de salida). Cada cambio en `main` se publica automáticamente.

También funciona en GitHub Pages o Netlify.
