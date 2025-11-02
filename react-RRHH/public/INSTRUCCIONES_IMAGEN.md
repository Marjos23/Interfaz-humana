# Instrucciones para agregar la imagen de fondo

Para completar el diseño del login con la imagen de Manta:

1. Guarda la imagen de Manta (la imagen con vista de la ciudad y la playa) en:
   `public/images/manta-background.jpg`

2. La imagen ya está configurada en el código. Una vez que la coloques en esa ubicación, se mostrará automáticamente como fondo del login.

3. Si prefieres usar otra imagen, solo reemplázala en la misma ubicación manteniendo el nombre `manta-background.jpg`

## Alternativa: Usar imagen desde URL
Si tienes la imagen en línea, puedes modificar el archivo `src/App.css` en la línea del `.login-background` y cambiar la ruta por la URL de la imagen.

Por ejemplo:
```css
.login-background {
  background-image: url('https://tu-url-de-imagen.com/manta.jpg');
}
```
