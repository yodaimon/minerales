# Colección de Minerales

Aplicación web progresiva (PWA) para gestionar una colección personal de minerales. Permite añadir, editar, eliminar y visualizar minerales con sus características.

## Características

- Interfaz de usuario intuitiva y responsive
- Funciona offline gracias a Service Workers
- Almacenamiento local de datos
- Instalable como aplicación en dispositivos móviles y de escritorio
- Diseño moderno con Bootstrap y React

## Tecnologías utilizadas

- React 19
- Vite 6
- React Router 7
- Bootstrap 5
- Service Workers para funcionalidad offline
- LocalStorage para persistencia de datos

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/mineral-collection.git

# Navegar al directorio del proyecto
cd mineral-collection

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera la versión de producción
- `npm run preview`: Previsualiza la versión de producción
- `npm run lint`: Ejecuta el linter

## Despliegue

Para generar la versión de producción:

```bash
npm run build
```

Los archivos generados estarán en la carpeta `dist` listos para ser desplegados en cualquier servidor web estático.
