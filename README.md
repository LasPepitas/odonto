
# 🦷 Odonto

**Odonto** es una aplicación web pensada para la gestión de pacientes, tratamientos y registros clínicos en una clínica odontológica. Desarrollada con un stack moderno utilizando **React** para el frontend, **Laravel** para el backend, y **MySQL** como sistema de base de datos.

## 🚀 Tecnologías Utilizadas

- **Frontend:** [React](https://reactjs.org/)
- **Backend:** [Laravel](https://laravel.com/)
- **Base de Datos:** MySQL
- **Contenedores:** Docker & Docker Compose

---

## 📁 Estructura del Proyecto

```

├── back/              # Código fuente del backend (Laravel)
├── front/             # Código fuente del frontend (React)
├── docs/              # Documentación del proyecto
├── .gitignore
├── Dockerfile.back    # Dockerfile para el backend
├── Dockerfile.front   # Dockerfile para el frontend
├── docker-compose.yml # Orquestación de servicios
├── package.json       # Configuración de dependencias para el frontend (o gestión JS)
├── bun.lock           # Archivo de bloqueo para gestor de paquetes Bun

````

---

## 🐳 Cómo levantar el proyecto con Docker

1. Clona el repositorio:

```bash
git clone https://github.com/LasPepitas/odonto.git
cd odonto
````

2. Levanta los servicios:

```bash
docker-compose up --build
```

Esto iniciará:

* React app en `http://localhost:3000`
* Laravel backend en `http://localhost:8000`
* Base de datos MySQL en `localhost:3306`

> ⚠️ Asegúrate de tener configuradas correctamente tus variables de entorno en `.env` para Laravel y React si aplica.

---

## ⚙️ Variables de Entorno

Asegúrate de crear los archivos `.env` necesarios para el backend (`back/.env`) con las variables adecuadas, como:

```env
APP_NAME=Odonto
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=odonto
DB_USERNAME=root
DB_PASSWORD=secret
```

---

## 🛠️ Scripts útiles (Frontend)

Desde la carpeta `front/` puedes ejecutar:

```bash
npm install     # Instala dependencias
npm start       # Inicia el servidor de desarrollo
```

---

## 📝 Documentación

Puedes consultar documentación adicional dentro del directorio `docs/`.

---

## 📌 Contribuciones

¡Contribuciones son bienvenidas! Si deseas colaborar, abre un *issue* o envía un *pull request* con tus mejoras.

---

## 📄 Licencia

Este proyecto está licenciado bajo los términos de la
**GNU Affero General Public License v3.0 (AGPL-3.0).**
© 2025 VICTOR RAUL MAYE MAMANI

Consulta el archivo LICENSE para más detalles, o visita
https://www.gnu.org/licenses/agpl-3.0.html.

