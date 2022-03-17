from api.models.index import db, Follow

def controller_unfollow(to_user_id, from_user_id):
    try:
        follows = db.session.query(Follow).filter(Follow.to_user_id == to_user_id).filter(Follow.from_user_id == from_user_id['id']).first()
        db.session.delete(follows)
        db.session.commit()
        return 2
    except Exception as error:
        print('[ERROR FOLLOW DELETE]: ', error)
        db.session.rollback()
        return None

def controller_follow(user, body):
    try:
        new_follow = Follow(from_user_id=user["id"], to_user_id=body['to_user_id'])

        db.session.add(new_follow)
        db.session.commit()

        return new_follow.serialize()

    except Exception as err:
        db.session.rollback()
        print('[ERROR REGISTER FOLLOW]: ', err)
        return None

def controller_show_follow(to_user_id, from_user_id):
    try:
        follows = db.session.query(Follow).filter(Follow.to_user_id == to_user_id).filter(Follow.from_user_id == from_user_id['id']).first()
        if follows == None:
            return False
        else:
            return True
    except Exception as error:
        print('[ERROR SHOW FOLLOW STATUS GET]: ', error)
        return False

def controller_show_followings(user_id):
    try:
        return db.session.query(Follow).filter(Follow.from_user_id == user_id)
    except Exception as error:
        print('[ERROR SHOW FOLLOWINGS GET]: ', error)
        return None

def controller_show_followers(user_id):
    try:
        return db.session.query(Follow).filter(Follow.to_user_id == user_id)
    except Exception as error:
        print('[ERROR SHOW FOLLOWERS GET]: ', error)
        return None