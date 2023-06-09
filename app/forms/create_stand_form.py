from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired 


class CreateStandForm(FlaskForm):
    standName = StringField(
        'clubname', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    characters = StringField('characters')