from api.models.index import db, func

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    from_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    from_user = db.relationship('User', backref="from_user_id")
    post = db.relationship('Post')

    def __repr__(self):
        return '<Like %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "from_user_id": self.from_user.serialize(),
            "post_id": self.post_id
        }