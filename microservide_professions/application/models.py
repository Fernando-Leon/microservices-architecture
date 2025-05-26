from . import db
from datetime import datetime
import uuid

class Profession(db.Model):
    __tablename__ = 'professions'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    status_id = db.Column(db.String(36), nullable=False)  # UUID del status externo

    def to_json(self):
            return {
                'id': self.id,
                'nombre': self.nombre,
                'descripcion': self.descripcion,
                'fecha_creacion': self.fecha_creacion.isoformat(),
                'status_id': self.status_id
            }