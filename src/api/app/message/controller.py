from api.models.index import db, Message


def controller_message(user_id, body):
    try:
        print(user_id, body)
        new_message = Message(user_id=user["id"], message=body["message"], type="text")
        from_user_id = User(from_user_id=user["id"])
        to_user_id = User(to_user_id=user["id"])
        db.session.add(new_message)
        db.session.commit()

        return True
        print(['The message has been received'])

    except Exception as error:
        print(['The message has not been received'])
        db.session.rollback()

def controller_recv_message(user_id, message):
    try:
        new_notification = Notificacion(to_user_id=body["user_id"], from_user_id=user["id"], message=body["message"], type="text")
        db.session.add(new_notification)
        db.session.commit()

        return
        print(['You have a new message'])

    except Exception as error:
        print("The notification has not arrived")
        db.session.rollback()