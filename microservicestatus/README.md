# Microservicio Status - Documentación de Endpoints

Este microservicio gestiona los estados (status) de la aplicación.

## Endpoints

---

### 1. Crear un nuevo status

- **Método:** POST  
- **URL:** `/status`
- **Body (JSON):**
```json
{
  "nombre": "Activo"
}
```
- **Respuesta exitosa (201):**
```json
{
  "id": 1,
  "nombre": "Activo"
}
```

---

### 2. Obtener todos los status

- **Método:** GET  
- **URL:** `/status`
- **Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "nombre": "Activo"
  },
]
```

---

### 3. Obtener un status por ID

- **Método:** GET  
- **URL:** `/status/{id}`
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "nombre": "Activo"
}
```
- **Respuesta si no existe (404):**
```json
{
  "error": "Status no encontrado"
}
```

---

### 4. Obtener un status por nombre

- **Método:** GET  
- **URL:** `/status/nombre/{nombre}`
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "nombre": "Activo"
}
```
- **Respuesta si no existe (404):**
```json
{
  "error": "Status no encontrado"
}
```

---

### 5. Actualizar un status por id

- **Método:** PUT  
- **URL:** `/status/{id}`
- **Body (JSON):**
```json
{
  "nombre": "Suspendido"
}
```
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "nombre": "Suspendido"
}
```
- **Respuesta si no existe (404):**
```json
{
  "error": "Status no encontrado"
}
```

---

### 6. Actualizar un status por id

- **Método:** PUT  
- **URL:** `/status/{id}`
- **Body (JSON):**
```json
{
  "nombre": "Suspendido"
}
```
- **Respuesta exitosa (200):**
```json
{
  "id": 1,
  "nombre": "Suspendido"
}
```
- **Respuesta si no existe (404):**
```json
{
  "error": "Status no encontrado"
}
```
