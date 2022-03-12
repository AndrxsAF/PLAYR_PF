from api.models.index import db, func

class Follow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    from_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    to_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    from_user = db.relationship('User', foreign_keys=[from_user_id])
    to_user = db.relationship('User', foreign_keys=[to_user_id])

    def __repr__(self):
        return '<Follow %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "from_user_id": self.from_user_id,
            "to_user_id": self.to_user_id
        } 