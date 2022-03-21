from api.models.index import db, Like, Notification


def controller_like(user_id, body):
    try:
        print(user_id, body)
        new_like = Like(from_user_id = user_id, post_id = body["post_id"])
        db.session.add(new_like)
        db.session.commit()

        new_notification = Notification(to_user_id=body["user_id"], from_user_id=user_id, post_id=body['post_id'], type="like")
        db.session.add(new_notification)
        db.session.commit()

        return 2
    except Exception as error:
        db.session.rollback()
        print('[ERROR LIKE]: ', error)
        return None


def controller_dislike(from_user_id, body):
    try:
        dislike = db.session.query(Like).filter(Like.post_id == body["post_id"]).filter(Like.from_user_id == from_user_id).first()
        db.session.delete(dislike)
        db.session.commit()

        notification = db.session.query(Notification).filter(Notification.to_user_id == body["user_id"]).filter(Notification.post_id == body["post_id"]).filter(Notification.from_user_id == from_user_id).filter(Notification.type == "like").first()
        db.session.delete(notification)
        db.session.commit()
        return 2
    except Exception as error:
        print('[ERROR DISLIKE]: ', error)
        db.session.rollback()
        return None


def controller_like_status(post_id, user_id):
    try:
        liked = db.session.query(Like).filter(Like.from_user_id == user_id).filter(Like.post_id == post_id).first()
        if liked == None:
            return False
        else:
            return True
    except Exception as error:
        print('[ERROR SHOW LIKE STATUS] ', error)
        return None


def controller_show_all_likes(post_id):
    try:
        return db.session.query(Like).filter(Like.post_id == post_id)
    except Exception as error:
        print('[ERROR LIKES SHOW USER LIKES]: ', error)
        return None