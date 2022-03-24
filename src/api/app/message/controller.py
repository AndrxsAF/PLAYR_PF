from api.models.index import db,  SnedMessage, ReciveMessage, Notificacion


def controller_message(user_id, message):
    try:
        print(user_id, message, notificacion)
        new_message = Message(from_user_id = to_user_id, message=["message"])
        db.session.add(new_message)
        db.session.commit()

        new_notification = Notification(to_user_id=["user_id"], from_user_id=user_id, message=["message_id"], type="text")
        db.session.add(new_notification)
        db.session.commit()

        return True
        print(['The message has been received'])

    except Exception as error:
        print(['The message has not been received'])
        db.session.rollback()

def controller_recv_message(user_id, message):
    try:
        print(user_id, message, notificacion)
        new_recv_message = Message(from_user_id = to_user_id, message=["message"])
        db.session.add(new_recv_message)
        db.session.commit()

        new_notification = Notification(from_user_id=["User_id"], to_user_id=user_id, message=message, type="text")
        db.session.add(new_notification)
        db.session.commit()

        return
        print(['You have a new message'])

    except Exception as error:
        print("NO ha llegado la notificacion")
        db.session.rollback()