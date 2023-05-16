from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Club(db.Model):
    __tablename__ = 'clubs'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(2000))
    image_url = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'imageUrl': self.image_url,
            'ownerId': self.owner_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
        
    def __reper__(self):
        return f'<Club id: {self.id}, name: {self.name} owner: {self.owner_id} created at: {self.created_at}>'