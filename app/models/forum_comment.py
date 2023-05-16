from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ForumComment(db.Model):
    __tablename__ = 'forum_comments'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("comments.id")))
    forum_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("forums.id")))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    def to_dict(self):
        return {
            'id': self.id,
            'commentId': self.user_id,
            'forumId': self.forum_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
        
    def __reper__(self):
        return f'<ForumComment id: {self.id}, forum_id: {self.forum_id} comment_id: {self.comment_id} created at: {self.created_at}>'