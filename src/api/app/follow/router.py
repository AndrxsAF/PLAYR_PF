from flask import Flask, request, jsonify, url_for, Blueprint
from api.app.follow.controller import controller_follow, controller_unfollow, controller_show_follow
from api.models.index import db, Follow
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

follows = Blueprint('follows', __name__)

@follows.route("/", methods=['POST'])
@jwt_required()
def follow():
    token = get_jwt_identity()
    body = request.get_json(force=True)
    new_follow = controller_follow(token, body)
    return jsonify(new_follow), 201

@follows.route("/", methods=['DELETE'])
@jwt_required()
def unfollow():
    token = get_jwt_identity()
    body = request.get_json(force=True)
    response = controller_unfollow(body['to_user_id'], token)
    if response == 2:
        return jsonify("Follow deleted succesfully."), 200
    return jsonify('Internal Server Error.'), 500

@follows.route('/<id>', methods=['GET'])
@jwt_required()
def show_follow(id):
    token = get_jwt_identity()
    follows = controller_show_follow(id, token)
    if follows == False:
        return jsonify('No se siguen.'), 200
    elif follows == True:
        return jsonify('Se siguen.'), 200
    else:
        return jsonify('ERROR'), 401