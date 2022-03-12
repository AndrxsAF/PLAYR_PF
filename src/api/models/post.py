from api.models.index import db, func

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(300))
    description = db.Column(db.String(280))
    game = db.Column(db.String(70))
    console = db.Column(db.String(50))
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    tag1 = db.Column(db.String(50))
    tag2 = db.Column(db.String(50))
    tag3 = db.Column(db.String(50))
    tag4 = db.Column(db.String(50))
    tag5 = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User')

    def __repr__(self):
        return '<Post %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "img_url": self.img_url,
            "description": self.description,
            "game": self.game,
            "console": self.console,
            "date": self.date,
            "tags": [self.tag1, self.tag2, self.tag3, self.tag4, self.tag5],
            "user_id": self.user_id
        } 