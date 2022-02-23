from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User
from api.shared.encrypte_pass import encryp_pass, compare_pass
from flask_jwt_extended import create_access_token
# from api.app.user.controler import register_user, login_user, get_user_by_id
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

users = Blueprint('users', __name__)

# RUTA DE ACCESO - COMPRUEBA QUE EL TOKEN COINCIDA CON UN ID PARA AUTORIZAR ACCESO

@users.route('/', methods=['GET'])
@jwt_required()
def user_access():
    user_token = get_jwt_identity()
    user = User.query.get(user_token)
    return jsonify(user.serialize()), 200

# RUTA DE REGISTRO - GENERA UN NUEVO USUARIO

@users.route('/register', methods=['POST'])
def create_user():
    body = request.get_json()
    if db.session.query(User).filter(User.email == body['email']).first():
        return jsonify('email already taken.'), 400
    if db.session.query(User).filter(User.username == body['username']).first():
        return jsonify('username already taken.'), 400
    hash_pass = encryp_pass(body['password'])
    new_user = User(email=body['email'], password=hash_pass, username=body['username'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

# RUTA DE LOGIN - GENERA UN NUEVO TOKEN DE ACCESO

@users.route('/login', methods=['POST'])
def user_login():
    body = request.get_json()

    if body['email'] is None:
        user = db.session.query(User).filter(User.username == body['username']).first()
        if user is None:
            return jsonify("Username doesn't exists."), 400
    elif body['username'] is None:
        user = db.session.query(User).filter(User.email == body['email']).first()
        if user is None:
            return jsonify("eMail doesn't exists"), 400
    
    validate_pass = compare_pass(body['password'], user.password)

    if validate_pass == False:
        return jsonify("Incorrect password."), 400

    new_token = create_access_token(identity={'id': user.id})

    return jsonify({'token' : new_token}), 200
    


# EXTRA CODE - DO NOT UNCOMMENT

# @users.route('/register', methods=['POST'])
# def create_user():
#     body = request.get_json()
#     new_user = register_user(body)
#     if new_user is None:
#         return jsonify('Internal server error'), 500
#     elif new_user == False:
#         return jsonify('Bad Request'), 400
#     else:
#         return jsonify(new_user), 201

# @users.route('/login', methods=['POST'])
# def user_login():
#     body = request.get_json()
#     token = login_user(body)

#     if token == 'user not exist':
#         return jsonify(token), 404

#     elif token == 'pass not iqual':
#         return jsonify('user or password incorrect'), 401

#     elif token is None :
#         return jsonify('Internal server error'), 500
#     else:
#         return jsonify(token), 200

# @users.route("/", methods=['GET'])
# @jwt_required()
# def get_user():
#     user_id = get_jwt_identity()
#     user = get_user_by_id(user_id['id'])
#     if user is None:
#         return jsonify('user not found'), 404

#     return jsonify(user.serialize()), 200