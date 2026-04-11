# README

## Levantar el proyecto Vue 3

Este proyecto usa **Vue 3**, **Vue Router**, **Vuex** y **Axios**, junto con **json-server** para simular el backend local.[cite:21][cite:1]

## Requisitos

- Node.js instalado
- npm disponible en tu equipo
- Dependencias del proyecto instaladas con `npm install`

## Estructura esperada

Ubica el archivo `db.json` en la **raíz del proyecto**, al mismo nivel que `package.json`, porque `json-server` suele ejecutarse apuntando a ese archivo desde esa carpeta.[cite:1][cite:5]

Ejemplo:

```bash
mi-proyecto/
├─ db.json
├─ package.json
├─ vite.config.js
├─ index.html
├─ src/
└─ node_modules/
```

## Instalar dependencias

Si aún no lo hiciste, instala las dependencias del proyecto con:

```bash
npm install
```

Si no tienes `json-server`, puedes ejecutarlo con `npx` sin instalarlo globalmente.[cite:1]

## Contenido mínimo de db.json

Para que la acción `frameworks/cargar` funcione con `GET /frameworks`, el archivo `db.json` puede tener esta estructura:

```json
{
  "frameworks": [
    { "id": 1, "name": "Vue.js", "description": "Framework progresivo" },
    { "id": 2, "name": "React", "description": "Librería para UI" },
    { "id": 3, "name": "Angular", "description": "Framework completo" }
  ]
}
```

Con eso, `json-server` expondrá automáticamente la ruta `http://localhost:3000/frameworks`.[cite:1][cite:10]

## Levantar la API mock

Desde la raíz del proyecto, ejecuta:

```bash
npx json-server --watch db.json --port 3000
```

Ese comando inicia un servidor REST local en el puerto `3000`.[cite:1][cite:8]

## Configurar Axios

Verifica que tu archivo `src/api/api.js` tenga una `baseURL` apuntando al mock server:

```js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
})

export default api
```

De esa forma, la acción `frameworks/cargar` podrá consultar `/frameworks` correctamente.[cite:1]

## Levantar la vista

En otra terminal, también desde la raíz del proyecto, ejecuta:

```bash
npm run dev
```

Vite levantará la aplicación frontend en desarrollo en un puerto local, normalmente distinto al `3000`, lo que permite separar frontend y mock API.[cite:12][cite:15]

## Orden correcto de ejecución

1. Abre una terminal y ejecuta `npx json-server --watch db.json --port 3000`
2. Abre otra terminal y ejecuta `npm run dev`
3. Abre en el navegador la URL que entregue Vite
4. Prueba el login y luego entra al dashboard

## Si aparece el error de Vuex

Si ves el mensaje `unknown action type: auth/doLogin`, revisa estos puntos:

- El módulo `auth` debe estar registrado dentro de `modules` en `src/store/index.js`.[cite:21]
- El módulo `auth` debe tener `namespaced: true` si haces `dispatch('auth/doLogin')`.[cite:21]
- La acción debe llamarse exactamente `doLogin` dentro de `actions`.[cite:21]
- `actions` debe ser un objeto, no una función.[cite:16][cite:18]

## Comprobación rápida

Si todo está bien, deberías poder:

- Abrir `/login`
- Iniciar sesión desde el formulario
- Ser redirigido a `/dashboard`
- Ver el saludo con el `username`
- Ver la lista cargada desde `/frameworks`
- Cerrar sesión con el botón **Salir**

## Comandos útiles

```bash
npm install
npx json-server --watch db.json --port 3000
npm run dev
```
