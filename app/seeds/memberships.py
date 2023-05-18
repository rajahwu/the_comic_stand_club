from app.models import db, ClubMembership, environment, SCHEMA
from sqlalchemy.sql import text


def undo_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.club_memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM club_memberships"))
        
    db.session.commit()