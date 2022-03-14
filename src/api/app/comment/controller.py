from api.models.index import db, Comment

def delete_comment(user_id, body):
    try:
        if body["user_id"] == user_id["id"]:
            comment = Comment.query.get(body["comment_id"])
            db.session.delete(comment)
            db.session.commit()
            return 2
        return 1
    except Exception as error:
        print('[ERROR POST DELETE]: ', error)
        db.session.rollback()
        return 'Internal Server Error.'

def create_comment(user, body):
    try:
        new_comment = Comment(user_id=user["id"], post_id=body['post_id'], description=body['description'])

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.serialize()

    except Exception as err:
        db.session.rollback()
        print('[ERROR REGISTER USER]: ', err)
        return None