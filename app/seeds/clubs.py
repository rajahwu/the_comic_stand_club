from app.models import db, Club, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_clubs():
    club1 = Club(
        name='Club1', description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', image_url='https://pixabay.com/illustrations/children-star-singer-figure-comic-857473/')
    club2 = Club(
        name='Club2', description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', image_url='https://pixabay.com/illustrations/children-star-singer-figure-comic-857473/')
    club3 = Club(
        name='Club3', description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', image_url='https://pixabay.com/illustrations/children-star-singer-figure-comic-857473/')
   

    db.session.add(club1)
    db.session.add(club2)
    db.session.add(club3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_clubs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.clubs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM clubs"))
        
    db.session.commit()