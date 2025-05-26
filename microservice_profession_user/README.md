# microservice_profession_user

Microservicio para gestión de usuarios de profesión. Basado en Flask.

# Documentación de Endpoints - microservice_profession_user

## Crear relación persona-profesión
**POST** `/person-profession`

Crea una relación entre una persona y una profesión.

**Body JSON:**
```
{
  "person_id": "<uuid-persona>",
  "profession_id": "<uuid-profesion>"
}
```
**Respuestas:**
- 201: `{ "message": "Relación creada exitosamente" }`
- 400: `{ "error": "UUID inválido" }`
- 404: `{ "error": "Persona no encontrada" }` o `{ "error": "Profesión no encontrada" }`

---

## Obtener todas las relaciones
**GET** `/person-profession`

Devuelve todas las relaciones persona-profesión.

**Respuestas:**
- 200: `[{ "id": "...", "person_id": "...", "profession_id": "..." }, ...]`

---

## Obtener relación por id
**GET** `/person-profession/<id>`

Devuelve una relación específica por su id.

**Respuestas:**
- 200: `{ "id": "...", "person_id": "...", "profession_id": "..." }`
- 404: `{ "error": "Registro no encontrado" }`

---

## Editar relación por id
**PUT** `/person-profession/<id>`

Actualiza los campos `person_id` y/o `profession_id` de una relación existente.

**Body JSON:**
```
{
  "person_id": "<nuevo-uuid-persona>",
  "profession_id": "<nuevo-uuid-profesion>"
}
```
**Respuestas:**
- 200: `{ "message": "Registro actualizado exitosamente" }`
- 400: `{ "error": "UUID de persona inválido" }` o `{ "error": "UUID de profesión inválido" }`
- 404: `{ "error": "Registro no encontrado" }`
