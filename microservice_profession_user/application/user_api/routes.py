from flask import Blueprint, request, jsonify
import requests
from application.models import PersonProfessionUser
from application import db
import uuid

user_api_blueprint = Blueprint('user_api', __name__)

# Configura las URLs de los microservicios
PERSON_SERVICE_URL = 'http://localhost:3000/api/person'  # Actualizado
PROFESSION_SERVICE_URL = 'http://localhost:5100/api/professions'  # Actualizado

@user_api_blueprint.route('/person-profession', methods=['POST'])
def create_person_profession():
    data = request.get_json()
    person_id = data.get('person_id')
    profession_id = data.get('profession_id')

    # Validar que los IDs sean UUID válidos
    try:
        person_uuid = uuid.UUID(person_id)
        profession_uuid = uuid.UUID(profession_id)
    except Exception:
        return jsonify({'error': 'UUID inválido'}), 400

    # Verificar existencia de persona
    person_resp = requests.get(f"{PERSON_SERVICE_URL}/{person_id}")
    if person_resp.status_code != 200:
        return jsonify({'error': 'Persona no encontrada'}), 404

    # Verificar existencia de profesión
    profession_resp = requests.get(f"{PROFESSION_SERVICE_URL}/{profession_id}")
    if profession_resp.status_code != 200:
        return jsonify({'error': 'Profesión no encontrada'}), 404

    # Crear la relación
    relation = PersonProfessionUser(person_id=person_uuid, profession_id=profession_uuid)
    db.session.add(relation)
    db.session.commit()

    return jsonify({'message': 'Relación creada exitosamente'}), 201

@user_api_blueprint.route('/person-profession', methods=['GET'])
def get_all_person_professions():
    registros = PersonProfessionUser.query.all()
    results = [
        {
            'id': registro.id,
            'person_id': registro.person_id,
            'profession_id': registro.profession_id
        }
        for registro in registros
    ]
    return jsonify(results), 200

@user_api_blueprint.route('/person-profession/<string:relation_id>', methods=['GET'])
def get_person_profession_by_id(relation_id):
    registro = PersonProfessionUser.query.filter_by(id=relation_id).first()
    if not registro:
        return jsonify({'error': 'Registro no encontrado'}), 404
    result = {
        'id': registro.id,
        'person_id': registro.person_id,
        'profession_id': registro.profession_id
    }
    return jsonify(result), 200

@user_api_blueprint.route('/person-profession/<string:relation_id>', methods=['PUT'])
def update_person_profession_by_id(relation_id):
    registro = PersonProfessionUser.query.filter_by(id=relation_id).first()
    if not registro:
        return jsonify({'error': 'Registro no encontrado'}), 404
    data = request.get_json()
    person_id = data.get('person_id')
    profession_id = data.get('profession_id')
    if person_id:
        try:
            uuid.UUID(person_id)
            registro.person_id = person_id
        except Exception:
            return jsonify({'error': 'UUID de persona inválido'}), 400
    if profession_id:
        try:
            uuid.UUID(profession_id)
            registro.profession_id = profession_id
        except Exception:
            return jsonify({'error': 'UUID de profesión inválido'}), 400
    db.session.commit()
    return jsonify({'message': 'Registro actualizado exitosamente'}), 200
