from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import CreateClubForm
from app.models import db, Club
from app.api.auth_routes import validation_errors_to_error_messages

club_routes = Blueprint('clubs', __name__)

@club_routes.route("/")
# @login_required
def clubs():
    # print("current user", current_user.username)
    clubs = Club.query.all()
    return {'clubs': [club.to_dict() for club in clubs] }

@club_routes.route("/new")
def new():
    form = CreateClubForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        club = Club(
            name=form.data["clubName"],
            description=form.data["description"],
            image_url=form.data["imageUrl"],
            owner_id=current_user.id
        )
        # db.session.add(club)
        # db.session.commit()
        print(club)
        return club.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
     

@club_routes.route("/<int:id>")
@login_required
def club(id):
    club = Club.query.get(id)
    return club.to_dict()