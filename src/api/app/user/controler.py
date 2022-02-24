from api.shared.encrypte_pass import encryp_pass, compare_pass
from api.models.index import db, User
from flask_jwt_extended import create_access_token

def register_user(body):
    try:
        if db.session.query(User).filter(User.email == body['email']).first():
            print('email already taken.')
            return 1 # ERROR 1: WRONG EMAIL

        if db.session.query(User).filter(User.username == body['username']).first():
            print('username already taken.')
            return 2 # ERROR 2: WRONG USERNAME

        hash_pass = encryp_pass(body['password'])
        
        new_user = User(email=body['email'], password=hash_pass, username=body['username'])
        
        db.session.add(new_user)
        db.session.commit()

        return new_user.serialize()

    except Exception as err:
        db.session.rollback()
        print('[ERROR REGISTER USER]: ', err)
        return None


def login_user(body):
    try:
        print(body['email'])
        if body['email'] is None:
            user = db.session.query(User).filter(User.username == body['username']).first()
            if user is None:
                return 1 # ERROR 1: USERNAME DOESNT EXISTS
        elif body['username'] is None:
            user = db.session.query(User).filter(User.email == body['email']).first()
            if user is None:
                return 2 # ERROR 2: EMAIL DOESNT EXISTS
        else:
            return 4 # ERROR 4: INTERNAL SERVER ERROR.
    
        validate_pass = compare_pass(body['password'], user.password)

        if validate_pass == False:
            return 3 # ERROR 3: INCORRECT PASSWORD

        new_token = create_access_token(identity={'id': user.id})

        return {'token' : new_token}
        
    except Exception as err:
        print('[ERROR LOGIN]: ', err)
        return None