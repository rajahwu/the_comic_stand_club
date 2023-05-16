from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Forum(db.Model):
    __tablename__ = 'forums'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(2000))
    public = db.Column(db.Boolean, default=True)
    club_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("clubs.id")))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    def to_dict(self):
        return {
            'id': self.id,
            'clubId': self.club_id,
            'name': self.name,
            'description': self.description,
            'public': self.public,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
        
    def __reper__(self):
        return f'<Forum id: {self.id}, name: {self.name}, club_id: {self.club_id}, public: {self.public} created at: {self.created_at}>'