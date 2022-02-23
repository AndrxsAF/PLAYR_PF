from api.models.db import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    biography = db.Column(db.String(200))
    img_url = db.Column(db.String(300))
    user_type = db.Column(db.String(30))

    def __repr__(self):
        return '<User %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "password": self.password,
            "biography": self.biography,
            "img_url": self.img_url,
            "user_type": self.user_type
        }