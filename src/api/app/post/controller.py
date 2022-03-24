from api.models.index import db, Post, Follow
from api.shared.respose import succes_respose, error_response
import cloudinary.uploader
from sqlalchemy import or_, func

def create_post(token, body, img):
    try:
        print(img)
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

def getPosts(user_id):
    try:
        user_posts = db.session.query(Post).filter(Post.user_id == user_id).filter(Post.isActive == True)
        return list(map(lambda post: post, user_posts))
    except Exception as error:
        print('[ERROR FUNC GETPOST]: ', error)
        return 'Internal Server Error.'

# def sortById(e):
#     post = dict(e.serialize())
#     print("post", post['id'])
#     return post['id']

def orderPosts(posts):
    try:
        arrPosts = []
        for x in posts:
            for y in x:
                arrPosts.append(y)
        return arrPosts
    except Exception as error:
        print('[ERROR FUNC ORDERPOSTS]: ', error)
        return 'Internal Server Error.'

def controller_show_follow_post(user_id):
    try:
        arrPosts = []
        getFollow = db.session.query(Follow).filter(Follow.from_user_id == user_id)
        getFollowList = list(map(lambda follow: follow.serialize_followings(), getFollow))
        savePosts = list(map(lambda userID: getPosts(userID['to_user_id']), getFollowList))
        return orderPosts(savePosts)
    except Exception as error:
        print('[ERROR POST SHOW FOLLOWS POST]: ', error)
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

def controller_get_post_by_tag(tag):
    try:
        return db.session.query(Post).filter(or_(func.lower(Post.tag1) == func.lower(tag), func.lower(Post.tag2) == func.lower(tag), func.lower(Post.tag3) == func.lower(tag), func.lower(Post.tag4) == func.lower(tag), func.lower(Post.tag5) == func.lower(tag))).filter(Post.isActive == True)
    except Exception as error:
        print('[ERROR POST SHOW BY TAG]: ', error)
        return 'Internal Server Error.'