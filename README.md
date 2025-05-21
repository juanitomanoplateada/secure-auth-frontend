# 🔐 SecureAuth Frontend – Interfaz de Autenticación Segura

Este repositorio contiene el frontend de **SecureAuth**, una plataforma segura de autenticación de usuarios que utiliza mecanismos criptográficos modernos como hash con sal e integridad de credenciales mediante HMAC.

🌐 **Demo en producción**:  
[https://secure-auth-frontend-production.up.railway.app](https://secure-auth-frontend-production.up.railway.app)

🔗 **Repositorio del backend**:  
[https://github.com/juanitomanoplateada/secure-auth-backend](https://github.com/juanitomanoplateada/secure-auth-backend)

---

## 🚀 Tecnologías utilizadas

| Herramienta    | Descripción                    |
|----------------|--------------------------------|
| Angular        | Framework frontend principal   |
| RxJS           | Programación reactiva          |
| Angular Forms  | Manejo reactivo de formularios |
| SCSS           | Estilos modernos y limpios     |
| TypeScript     | Tipado estático y robusto      |

---

## 🧩 Estructura principal

- `login.component.ts`: Lógica del componente de inicio de sesión y registro.
- `login.component.html`: Formulario visual reactivo con mensajes dinámicos.
- `login.component.scss`: Estilos visuales modernos y responsivos.
- `login.component.spec.ts`: Pruebas básicas del componente.

---

## 🔒 Funcionalidad destacada

- ✅ Formulario de login y registro con validaciones reactivas.
- 🔐 Generación de token HMAC en frontend antes de enviar credenciales.
- 📡 Comunicación segura con el backend en Railway.
- 📄 Mensajes de retroalimentación visual de éxito o error.
- 🔄 Estado de carga (`isLoading`) en botones para evitar múltiples envíos.

---

## ⚙️ Instalación local

1. **Clona el repositorio**:

```bash
git clone https://github.com/juanitomanoplateada/secure-auth-frontend.git
cd secure-auth-frontend
```

2. **Instala las dependencias**:

```bash
npm install
```

3. **Configura el endpoint del backend** (en `environment.ts`):

```ts
export const environment = {
  production: false,
  apiUrl: 'https://secure-auth-backend-production.up.railway.app'
};
```

4. **Ejecuta la aplicación**:

```bash
ng serve
```

📍 Navega a `http://localhost:4200`

---

## 📬 Funcionalidad del login

1. Usuario ingresa su `username` y `password`.
2. Se genera el token HMAC con el mensaje `username:password`.
3. Se llama a `/login` con las credenciales y el HMAC para validación completa.

---

## 🧪 Pruebas

```bash
ng test
```

Ejecuta las pruebas unitarias con `Karma`.

---

## 🛡️ Seguridad

- Las credenciales **nunca se almacenan ni transmiten en texto plano**.
- El HMAC garantiza que los datos no hayan sido manipulados por terceros.
- Las validaciones se reflejan en tiempo real en la interfaz.

---

## ✨ Créditos

Desarrollado por [@juanitomanoplateada](https://github.com/juanitomanoplateada)  
🔁 Backend disponible [aquí](https://github.com/juanitomanoplateada/secure-auth-backend)

---

## 📄 Licencia

Este proyecto está licenciado bajo los términos de la **MIT License**.
