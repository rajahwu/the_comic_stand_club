from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(2000))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'text': self.text,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
        
    def __reper__(self):
        return f'<Comment id: {self.id}, user_id: {self.club_id} created at: {self.created_at}>'