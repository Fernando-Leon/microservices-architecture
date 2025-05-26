from . import profession_api_blueprint
from .. import db
from ..models import Profession
from flask import jsonify, request
import requests

SPRING_STATUS_URL = "http://localhost:8080/status/nombre/"

# Endpoint para crear una nueva profesión
@profession_api_blueprint.route('/api/professions', methods=['POST'])
def create_profession():
    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    status_nombre = data.get('status_nombre')

    # Llama al microservicio de status para obtener el status por nombre
    status_response = requests.get(f"{SPRING_STATUS_URL}{status_nombre}")
    if status_response.status_code != 200:
        return jsonify({'error': 'Status no encontrado en el microservicio de status'}), 404

    status_data = status_response.json()
    status_id = status_data.get('id')
    if not status_id:
        return jsonify({'error': 'El status no tiene un id válido'}), 400

    profession = Profession(
        nombre=nombre,
        descripcion=descripcion,
        status_id=str(status_id)
    )
    db.session.add(profession)
    db.session.commit()

    return jsonify(profession.to_json()), 201

# Endpoin para obtener todas las profesiones
@profession_api_blueprint.route('/api/professions', methods=['GET'])
def profession_list():
    professions = [profession.to_json() for profession in Profession.query.all()]
    return jsonify(professions)

# Endpoint para obtener profesiones con status "Activo"
@profession_api_blueprint.route('/api/professions/activos', methods=['GET'])
def professions_activos():
    # Llama al microservicio de status para obtener el id del status "Activo"
    status_response = requests.get(f"{SPRING_STATUS_URL}Activo")
    if status_response.status_code != 200:
        return jsonify({'error': 'Status "Activo" no encontrado en el microservicio de status'}), 404

    status_data = status_response.json()
    status_id = status_data.get('id')
    if not status_id:
        return jsonify({'error': 'El status "Activo" no tiene un id válido'}), 400

    professions = Profession.query.filter_by(status_id=str(status_id)).all()
    results = [profession.to_json() for profession in professions]
    return jsonify(results)

# Obtener una profesión por nombre
@profession_api_blueprint.route('/api/professions/nombre/<string:nombre>', methods=['GET'])
def get_profession_by_nombre(nombre):
    profession = Profession.query.filter_by(nombre=nombre).first()
    if not profession:
        return jsonify({'error': 'Profession no encontrada'}), 404
    return jsonify(profession.to_json())

@profession_api_blueprint.route('/api/professions/status/<string:status_nombre>', methods=['GET'])
def get_professions_by_status(status_nombre):
    # Llama al microservicio de status para obtener el id del status
    status_response = requests.get(f"{SPRING_STATUS_URL}{status_nombre}")
    if status_response.status_code != 200:
        return jsonify({'error': f'Status "{status_nombre}" no encontrado en el microservicio de status'}), 404

    status_data = status_response.json()
    status_id = status_data.get('id')
    if not status_id:
        return jsonify({'error': f'El status "{status_nombre}" no tiene un id válido'}), 400

    professions = Profession.query.filter_by(status_id=str(status_id)).all()
    results = [profession.to_json() for profession in professions]
    return jsonify(results)

# Actualizar por nombre
@profession_api_blueprint.route('/api/professions/nombre/<string:nombre>', methods=['PUT'])
def update_profession_by_nombre(nombre):
    data = request.get_json()
    profession = Profession.query.filter_by(nombre=nombre).first()
    if not profession:
        return jsonify({'error': 'Profession no encontrada'}), 404

    # Actualizar campos si vienen en el request
    if 'nombre' in data:
        profession.nombre = data['nombre']
    if 'descripcion' in data:
        profession.descripcion = data['descripcion']
    if 'status_nombre' in data:
        # Obtener el id del nuevo status desde el microservicio de status
        status_response = requests.get(f"{SPRING_STATUS_URL}{data['status_nombre']}")
        if status_response.status_code != 200:
            return jsonify({'error': 'Status no encontrado en el microservicio de status'}), 404
        status_data = status_response.json()
        status_id = status_data.get('id')
        if not status_id:
            return jsonify({'error': 'El status no tiene un id válido'}), 400
        profession.status_id = str(status_id)

    db.session.commit()
    return jsonify(profession.to_json())