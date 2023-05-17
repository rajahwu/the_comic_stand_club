from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired 


class CreateClubForm(FlaskForm):
    clubName = StringField(
        'clubname', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    ownerId = StringField('ownerId', validators=[DataRequired()])