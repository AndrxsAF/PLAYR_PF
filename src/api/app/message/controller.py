from api.models.index import db, Message


def controller_message(user_id, body):
    try:
        print(user_id, body)
        new_message = Message(to_user_id=body["id"], from_user_id=user_id["id"], message=body["message"])
        db.session.add(new_message)
        db.session.commit()
        print(new_message)
        return new_message.user_recv_message()
        

    except Exception as error:
        print(error)
        db.session.rollback()

def controller_recv_message(user_id, message):
    try:
        print(user_id, body)
        new_message = Message(from_user_id=body["user_id"], to_user_id=user["id"], message=body["message"])
        db.session.add(new_message)
        db.session.commit()
        print(new_message)
        return new_message.user_recv_message()
        
    except Exception as error:
        print(error)
        db.session.rollback()
