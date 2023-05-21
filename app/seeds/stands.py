from app.models import db, Stand, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_stands():
    stand1 = Stand(
        name='Stand1', description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',owner_id=1)
    
    stand2 = Stand(
        name='Stand2', description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',owner_id=1)
    
    stand3 = Stand(
        name='Stand3', description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',owner_id=1)
   

    db.session.add(stand1)
    db.session.add(stand2)
    db.session.add(stand3)
    db.session.commit()
    
    


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stands():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stands RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stands"))
        
    db.session.commit()