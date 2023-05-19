from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import CreateStandForm
from app.models import db, Stand
from app.api.auth_routes import validation_errors_to_error_messages

stand_routes = Blueprint('stands', __name__)

@stand_routes.route("/")
def stands():
    clubs = Stand.query.all()
    return {'stands': [club.to_dict() for club in clubs] }

@stand_routes.route("/new", methods=["POST"])
def new():
    form = CreateStandForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        stand = CreateStandForm(
            name=form.data["clubName"],
            description=form.data["description"],
            image_url=form.data["imageUrl"],
            owner_id=current_user.id
        )
        db.session.add(stand)
        db.session.commit()
        
      
        return stand.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

@stand_routes.route("/<int:id>", methods=["PUT"])
def edit_route(id):
    club = Stand.query.get(id)
    
    form = CreateStandForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        club.name=form.data["clubName"]
        club.description=form.data["description"]
        club.image_url=form.data["imageUrl"]
        db.session.commit()
      
        return stand.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}
    

     
@stand_routes.route("/<int:id>", methods=["DELETE"]) 
def delete_club(id):
    stand = Stand.query.get(id)
    if stand:
        db.session.delete(stand)
        db.session.commit()
    
        return {f"message": "Stand {id} successfully deleted"}
    else:
        return {"message": "Stand not found"}

@stand_routes.route("/<int:id>")
@login_required
def stand(id):
    club = Stand.query.get(id)
    return stand.to_dict()
