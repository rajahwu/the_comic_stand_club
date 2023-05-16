from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ClubMembership(db.Model):
    __tablename__ = 'club_memberships'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    club_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("clubs.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    admin = db.Column(db.Boolean, defalult=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    def to_dict(self):
        return {
            'id': self.id,
            'clubId': self.club_id,
            'userId': self.user_id,
            'admin': self.public,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
        
    def __reper__(self):
        return f'<ClubMembership id: {self.id}, club_id: {self.club_id} user_id: {self.user_id} admin: {self.admin} created at: {self.created_at}>'