from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Club

club_routes = Blueprint('clubs', __name__)

@club_routes.route("/")
# @login_required
def clubs():
    # print("current user", current_user.username)
    clubs = Club.query.all()
    return {'clubs': [club.to_dict() for club in clubs] }

@club_routes.route("/<int:id>")
@login_required
def club(id):
    club = Club.query.get(id)
    return club.to_dict()
