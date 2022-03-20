from api.models.index import db, Notification

def controller_show_notifications(user_id):
    try:
        return db.session.query(Notification).filter(Notification.to_user_id == user_id["id"])
    except Exception as error:
        print('[ERROR SHOW NOTIFICATIONS GET]: ', error)
        return None

