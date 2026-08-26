````markdown
<p align="center">
  <img src="./public/favicon.svg" alt="BANGER Logo" width="100" />
</p>

<h1 align="center">🎵 BANGER - Plataforma de Streaming de Música</h1>

<p align="center">
  <b>Single Page Application para reproducción de música, gestión de catálogo y playlists.</b>
</p>

<p align="center">
  <a href="https://banger-music-code.netlify.app/">🚀 Probar Demo en Vivo</a>
</p>

---

# 🎵 BANGER - Plataforma de Streaming de Música

> Single Page Application (SPA) para reproducción de música, gestión de catálogo y creación de playlists personalizadas desarrollada con React, Vite y Bootstrap.

🚀 **Deploy en vivo:** [banger-music-code.netlify.app](https://banger-music-code.netlify.app/)

---

## ⚡ Funcionalidades

- **Catálogo & Búsqueda Dinámica:** Filtrado en tiempo real por canción o artista. Desmontaje automático del bloque _Hero_ durante la búsqueda para priorizar los resultados visuales.
- **Reproductor Global:** Barra de reproducción persistente en la interfaz a lo largo de toda la navegación por las distintas rutas de la app.
- **Sistema de Playlists:** Creación y asignación de canciones a playlists personalizadas con persistencia individualizada por usuario en `localStorage`.
- **Panel de Administración (CRUD Completo):** Módulo privado para crear, editar, listar y eliminar canciones del catálogo.
- **Formularios & Sanitización XSS:** Formularios gestionados con `react-hook-form`, validaciones avanzadas por Regex y limpiado de caracteres especiales para prevenir inyecciones de código.
- **Soporte & Ayuda:** Vista de preguntas frecuentes con acordeón dinámico y formulario de contacto.

---

## 🛠️ Tecnologías Utilizadas

| Categoría          | Tecnología / Librería              |
| :----------------- | :--------------------------------- |
| **Core**           | React 18, Vite                     |
| **Enrutado**       | React Router DOM v6                |
| **Formularios**    | React Hook Form                    |
| **UI & Estilos**   | Bootstrap 5, Bootstrap Icons, CSS3 |
| **Notificaciones** | SweetAlert2                        |
| **Persistencia**   | LocalStorage + Context API         |

---

## 🔑 Credenciales de Prueba (Variables de Entorno)

Para probar el panel de administración (`/admin`), crear un archivo `.env` en la raíz del proyecto con los siguientes datos:

```env
VITE_ADMIN_EMAIL=admin@banger.com
VITE_ADMIN_PASSWORD=Admin123!
```
````

---

## 💻 Instalación Local

1. **Clonar el repositorio:**

```bash
git clone https://github.com/elitagatti-ui/banger-music.git
cd banger-music

```

2. **Instalar dependencias:**

```bash
pnpm install

```

3. **Configurar variables de entorno:**
   Crear el archivo `.env` en la raíz con las credenciales indicadas arriba.
4. **Iniciar el entorno de desarrollo:**

```bash
pnpm run dev

```

---

## 👥 Autores

- **Eliana Gatti** - [GitHub](https://github.com/elitagatti-ui)
- **Francisco Sandoval** - [GitHub](https://github.com/ntfran)

```

```
