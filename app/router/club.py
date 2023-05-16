from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Club

club_routes = Blueprint('clubs', __name__)

@club_routes.route("/")
# @login_required
def clubs():
    clubs = Club.query.all()
    return {'clubs': [club.to_dict() for club in clubs] }

@club_routes.route("/<int:id>")
def club(id):
    club = Club.query.get(id)
    return club.to_dict()
