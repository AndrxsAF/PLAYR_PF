from api.models.index import db, func

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    description = db.Column(db.String(280), nullable=False)
    from_user = db.relationship('User', foreign_keys=[user_id])
    post = db.relationship('Post')

    def __repr__(self):
        return '<Comment %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "description": self.description
        } 