from api.shared.encrypte_pass import encryp_pass, compare_pass
from api.models.index import db, User, Follow
from flask_jwt_extended import create_access_token
from flask import Flask, request
import cloudinary.uploader
from datetime import timedelta
from sqlalchemy import func, or_


def register_user(body):
    try:
        if db.session.query(User).filter(func.lower(User.email) == func.lower(body['email'])).first():
            print('email already taken.')
            return 1  # ERROR 1: WRONG EMAIL

        if db.session.query(User).filter(func.lower(User.username) == func.lower(body['username'])).first():
            print('username already taken.')
            return 2  # ERROR 2: WRONG USERNAME

        hash_pass = encryp_pass(body['password'])

        new_user = User(email=body['email'],
        password=hash_pass, username=body['username'])

        db.session.add(new_user)
        db.session.commit()

        info = new_user.serialize()
        new_follow = Follow(from_user_id=info["id"], to_user_id=info['id'])
        db.session.add(new_follow)
        db.session.commit()

        return new_user.serialize()

    except Exception as err:
        db.session.rollback()
        print('[ERROR REGISTER USER]: ', err)
        return None


def login_user(body):
    try:
        print(body)
        if body is None:
            return 1

        user = db.session.query(User).filter(or_(func.lower(User.email) == func.lower(body["user"]), func.lower(User.username) == func.lower(body["user"]))).first()

        if user is None:
            return 1
        validate_pass = compare_pass(body['password'], user.password)

        if validate_pass == False:
            return 3  # ERROR 3: INCORRECT PASSWORD

        new_token = create_access_token(identity={'id': user.id}, expires_delta=timedelta(weeks=4))

        return {'token': new_token}

    except Exception as err:
        print('[ERROR LOGIN]: ', err)
        return None


def config_user(user):
    try:
        if user is None:
            return 4 # User not found.
        img = request.files
        if img.to_dict() == {}:
            body = request.form.to_dict()
            print(body)
            print(user)
            if list(body.keys())[0] == "password":
                hash_pass = encryp_pass(list(body.values())[0])
                setattr(user, "password", hash_pass)
                db.session.commit()
                return 3  # Password changed succesfully.
            else:
                setattr(user, list(body.keys())[0], list(body.values())[0])
                db.session.commit()
                return 1  # Biography changed succesfully.
        else:
            img_url = cloudinary.uploader.upload(img["img"])
            setattr(user, "img_url", img_url['url'])
            db.session.commit()
            return 2  # Profile picture changed succesfully.
    except Exception as Error:
        db.session.rollback()
        print(Error)
        return False
