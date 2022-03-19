from api.models.index import db, func

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    type = db.Column(db.String(50), nullable=False)
    from_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    to_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    from_user = db.relationship('User', foreign_keys=[from_user_id])
    to_user = db.relationship('User', foreign_keys=[to_user_id])
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    post = db.relationship('Post', backref="post_id")

    def __repr__(self):
        return '<Notification %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "type": self.type,
            "from_user_id": self.from_user.serialize_info(),
            "to_user_id": self.to_user_id,
            "post_id": self.post_id
        } 
