from api.models.index import db, Saved

def controller_unsave(post_id, user_id):
    try:
        save = db.session.query(Saved).filter(Saved.post_id == post_id).filter(Saved.user_id == user_id['id']).first()
        db.session.delete(save)
        db.session.commit()
        return 2
    except Exception as error:
        print('[ERROR SAVE DELETE]: ', error)
        db.session.rollback()
        return None

def controller_save(user, body):
    try:
        new_saved = Saved(user_id=user["id"], post_id=body['post_id'])

        db.session.add(new_saved)
        db.session.commit()

        return new_saved.serialize()

    except Exception as err:
        db.session.rollback()
        print('[ERROR REGISTER SAVE]: ', err)
        return None

def controller_show_save(user_id):
    try:
        return db.session.query(Saved).filter(Saved.user_id == user_id['id'])
    except Exception as error:
        print('[ERROR SHOW FOLLOW STATUS GET]: ', error)
        return None