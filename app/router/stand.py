from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import CreateStandForm
from app.models import db, Stand
from app.api.auth_routes import validation_errors_to_error_messages

stand_routes = Blueprint('stands', __name__)

@stand_routes.route("/")
def stands():
    stands = Stand.query.all()
    return {'stands': [stand.to_dict() for stand in stands] }

@stand_routes.route("/new", methods=["POST"])
def new():
    form = CreateStandForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        stand = Stand(
            name=form.data["standName"],
            description=form.data["description"],
            characters=form.data["characters"],
            owner_id=current_user.id
        )
        print("POST /stands/new",stand)
        db.session.add(stand)
        db.session.commit()
        
      
        return stand.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

@stand_routes.route("/<int:id>", methods=["PUT"])
def edit_stand(id):
    stand = Stand.query.get(id)
    
    form = CreateStandForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        stand.name=form.data["clubName"]
        stand.description=form.data["description"]
        stand.characters=form.data["characters"]
        db.session.commit()
      
        return stand.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}
    

     
@stand_routes.route("/<int:id>", methods=["DELETE"]) 
def delete_stand(id):
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
    stand = Stand.query.get(id)
    return stand.to_dict()
