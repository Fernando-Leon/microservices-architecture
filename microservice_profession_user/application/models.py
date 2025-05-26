from . import db
import uuid

class PersonProfessionUser(db.Model):
    __tablename__ = 'person_profession_user'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    person_id = db.Column(db.String(36), nullable=False)
    profession_id = db.Column(db.String(36), nullable=False)
    # Puedes agregar más campos aquí si lo necesitas

    def to_json(self):
        return {
            'id': self.id,
            'person_id': self.person_id,
            'profession_id': self.profession_id
        }