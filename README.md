# erythrina-plant-care-system
# Sistema Web para cuidado de plantas en el área doméstica 

Este es un proyecto **Fullstack** desarrollado para el monitoreo y gestión de plantas dentro del hogar. Este proyecto es una aplicación web diseñada para el monitoreo y control centralizado de las plantas. El sistema está estructurado para que el propietario se registre y autentique, tomando el control absoluto y exclusivo de toda la gestión de plantas y el historial de eventos.

## Características Principales

*   **Registro y Autenticación del Propietario:** Permite el registro inicial del administrador único (`createUser`) y su posterior inicio de sesión, todo validado estrictamente en el servidor con esquemas de Zod (`users.schema.js`).
*   **Gestión de Plantas:** Panel de control exclusivo para registrar, actualizar y supervisar los ejemplares.
*   **Módulo de Historial:** Registro cronológico de actividades, estados o cambios en el sistema para el seguimiento del propietario.
*   **Arquitectura:** Backend estructurado bajo el patrón **MVC (Modelo-Vista-Controlador)**.

---

## Tecnologías Utilizadas

### Backend
*   **Node.js** & **Express** - Entorno de ejecución y framework web.
*   **PostgreSQL** - Base de datos relacional para el almacenamiento seguro (`sistema_invernadero_db`).
*   **Zod** - Validación de datos en el servidor para el registro y acceso de usuario.
*   **JSON Web Tokens (JWT)** - Para mantener la sesión activa del administrador.

### Frontend
*   **React** - Librería para la interfaz de usuario.
*   **SCSS** - Estilos estructurados y diseño responsivo.


