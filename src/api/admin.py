  
import os
from flask_admin import Admin
from api.models.index import User, Post, Saved, Like, Follow, Comment, Notification
from api.models.db import db
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Post, db.session))
    admin.add_view(ModelView(Saved, db.session))
    admin.add_view(ModelView(Like, db.session))
    admin.add_view(ModelView(Follow, db.session))
    admin.add_view(ModelView(Comment, db.session))
    admin.add_view(ModelView(Notification, db.session))
    
