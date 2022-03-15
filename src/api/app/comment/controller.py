from api.models.index import db, Comment

def delete_comment(body):
    try:
        comment = Comment.query.get(body["id"])
        db.session.delete(comment)
        db.session.commit()
        return 2
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
        print('[ERROR REGISTER COMMENT]: ', err)
        return None