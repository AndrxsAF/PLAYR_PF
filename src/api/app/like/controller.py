from api.models.index import db, Like

def create_like(from_user_id, to_post_id):
    try:
        new_like = Like(from_user_id=user["id"], post_id=body['post_id'])
        db.session.add(new_like)
        db.session.commit()
        return new_like.serialize()

    except Exception as error:
        db.session.rollback()
        print('[ERROR LIKE]: ', error)
        return None

def dislike(from_user_id, to_post_id):
    try:
        like = db.session.query(Like).filter(like.to_post_id == to_user_id).filter(like.from_user_id == from_post_id['id']).first()
        
        db.session.delete(likes)
        db.session.commit()
        return 2
    except Exception as error:
        print('[ERROR DISLIKE]: ', error)
        db.session.rollback()
        return None

def like_status(user_id):
    try:
        return db.session.query(Likes).filter(Likes_to_post_id == user_id['id']).filter(likes.from_user_id == post_id['post'])
    except Exception as error:
        print('[ERROR] ', error)
        return None

def show_all_likes(user_id):
   try:
        return db.session.query(Likes).filter(Like.isActive == True)
    except Exception as error:
        print('[ERROR LIKES SHOW USER LIKES]: ', error)
        return 'Internal Server Error.'

