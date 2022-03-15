from api.models.index import db, Post
from api.shared.respose import succes_respose, error_response
import cloudinary.uploader

def create_post(token, body, img):
    try:
        if img.to_dict() == {}:
            new_post = Post(img_url=None, description=body['description'], game=body['game'], console=body['console'], tag1=body['tag1'], tag2=body['tag2'], tag3=body['tag3'], tag4=body['tag4'], tag5=body["tag5"], user_id=token["id"])
            db.session.add(new_post)
            db.session.commit()
            return new_post.serialize()
        body_img_url = cloudinary.uploader.upload(img["img"])
        new_post = Post(img_url=body_img_url["url"], description=body['description'], game=body['game'], console=body['console'], tag1=body['tag1'], tag2=body['tag2'], tag3=body['tag3'], tag4=body['tag4'], tag5=body["tag5"], user_id=token["id"])
        db.session.add(new_post)
        db.session.commit()
        return new_post.serialize()

    except Exception as error:
        print('[ERROR POST CREATE]: ', error)
        db.session.rollback()
        return 'Internal Server Error.'

def delete_post(user_id, body):
    try:
        if body["user_id"] == user_id["id"]:
            post = Post.query.get(body["id"])
            setattr(post, "isActive", False)
            db.session.commit()
            return 2
        return 1
    except Exception as error:
        print('[ERROR POST DELETE]: ', error)
        db.session.rollback()
        return 'Internal Server Error.'

def controller_show_all_post():
    try:
        return db.session.query(Post).filter(Post.isActive == True)
    except Exception as error:
        print('[ERROR POST SHOW USER POST]: ', error)
        return 'Internal Server Error.'

def controller_show_user_post(id):
    try:
        return db.session.query(Post).filter(Post.user_id == id).filter(Post.isActive == True)
    except Exception as error:
        print('[ERROR POST SHOW ALL]: ', error)
        return 'Internal Server Error.'

def controller_get_post(id):
    try:
        return Post.query.get(id)
    except Exception as error:
        print('[ERROR POST GET]: ', error)
        return 'Internal Server Error.'