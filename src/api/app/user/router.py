from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User
from api.app.user.controler import register_user, login_user
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

users = Blueprint('users', __name__)

# RUTA DE ACCESO - COMPRUEBA QUE EL TOKEN COINCIDA CON UN ID PARA AUTORIZAR ACCESO

@users.route('/', methods=['GET'])
@jwt_required()
def user_access():
    user_token = get_jwt_identity()
    user = User.query.get(user_token)
    if user is None:
        return jsonify('user not found'), 404
    return jsonify(user.serialize()), 200

# RUTA DE REGISTRO - GENERA UN NUEVO USUARIO

@users.route('/register', methods=['POST'])
def create_user():
    body = request.get_json()
    new_user = register_user(body)
    if new_user == 1:
        return jsonify('Email already taken.'), 400
    elif new_user == 2:
        return jsonify('Username already taken.'), 400
    elif new_user is None:
        return jsonify('Internal server error'), 500
    return jsonify(new_user), 201

# RUTA DE LOGIN - GENERA UN NUEVO TOKEN DE ACCESO

@users.route('/login', methods=['POST'])
def user_login():
    body = request.get_json()
    token = login_user(body)
    if token == 1:
        return jsonify("Username doesn't exists"), 400
    elif token == 2:
        return jsonify("Email doesn't exists"), 400
    elif token == 3:
        return jsonify("Incorrect password."), 400
    elif token == 4:
        return jsonify("Internal server error"), 500
    elif token is None:
        return jsonify('Internal server error'), 500
    else:
        return jsonify(token), 200
    
