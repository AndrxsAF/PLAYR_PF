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
        message = session.query(message).filter(user_id == "message").filter(message)
        print("@@@@@")
        filter(or_(From.User.id == 'message', To.User.id == 'message')
        (or_(To.User.id == 'message', From.User.id == 'message')))
        
        print(message)
        return message.controller_message()
       
     
    except Exception as error:
        print(error)
        db.session.rollback()


