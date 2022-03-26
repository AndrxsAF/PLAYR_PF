from api.models.index import db, func, User

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    from_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    to_user_id = db.Column(db.Integer,  db.ForeignKey('user.id'))
    message = db.Column(db.String(250))
    from_user = db.relationship(User, foreign_keys=[from_user_id])
    to_user = db.relationship(User, foreign_keys=[to_user_id])

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "user_id": self.user_id,
            "messsage": self.message,
        } 

    
    def user_recv_message(self):
        return {
            "id": self.id,
            "date": self.date,
            "user": self.user.serialize_info(),
            "message": self.message
        }



   