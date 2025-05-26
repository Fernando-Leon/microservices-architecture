# Microservicio Professions

Este microservicio gestiona profesiones y se integra con el microservicio de status (Spring Boot) para asignar y consultar el estado de cada profesión.

## Endpoints

### 1. Crear una profesión
- **POST** `/api/professions`
- **Body JSON:**
  ```json
  {
    "nombre": "Ingeniero",
    "descripcion": "Profesional de ingeniería",
    "status_nombre": "Activo"
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": "uuid",
    "nombre": "Ingeniero",
    "descripcion": "Profesional de ingeniería",
    "fecha_creacion": "2025-05-26T10:00:00",
    "status_id": "uuid"
  }
  ```

---

### 2. Obtener todas las profesiones
- **GET** `/api/professions`
- **Respuesta:**
  ```json
  [
    { "id": "uuid", "nombre": "...", ... },
    ...
  ]
  ```

---

### 3. Obtener profesiones con status "Activo"
- **GET** `/api/professions/activos`
- **Respuesta:**
  ```json
  [
    { "id": "uuid", "nombre": "...", ... },
    ...
  ]
  ```

---

### 4. Obtener una profesión por nombre
- **GET** `/api/professions/nombre/<nombre>`
- **Respuesta:**
  ```json
  { "id": "uuid", "nombre": "...", ... }
  ```

---

### 5. Obtener profesiones por status
- **GET** `/api/professions/status/<status_nombre>`
- **Respuesta:**
  ```json
  [
    { "id": "uuid", "nombre": "...", ... },
    ...
  ]
  ```

---

### 6. Actualizar una profesión por nombre
- **PUT** `/api/professions/nombre/<nombre>`
- **Body JSON:** (puedes enviar uno o varios campos)
  ```json
  {
    "nombre": "NuevoNombre",
    "descripcion": "Nueva descripción",
    "status_nombre": "Eliminado"
  }
  ```
- **Respuesta:**
  ```json
  { "id": "uuid", "nombre": "NuevoNombre", ... }
  ```

---

## Notas
- El campo `status_nombre` siempre debe coincidir con un status existente en el microservicio de status (Spring Boot).
- El campo `status_id` es el UUID que retorna el microservicio de status y se guarda en la base de datos de professions.
- Para "eliminar" una profesión, actualiza su status a "Eliminado" usando el endpoint de actualización.

---

## Ejemplo de consumo con curl

**Crear:**
```sh
curl -X POST http://localhost:5000/api/professions \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Ingeniero", "descripcion": "Desc", "status_nombre": "Activo"}'
```

**Obtener por status:**
```sh
curl http://localhost:5000/api/professions/status/Activo
```

**Actualizar:**
```sh
curl -X PUT http://localhost:5000/api/professions/nombre/Ingeniero \
  -H "Content-Type: application/json" \
  -d '{"status_nombre": "Eliminado"}'
```
