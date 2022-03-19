from flask import Flask, request, jsonify, url_for, Blueprint
from api.app.follow.controller import controller_follow, controller_unfollow, controller_show_follow, controller_show_followers, controller_show_followings
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
    if new_follow == 2:
        return jsonify("Follow already exists."), 401
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
        return jsonify(False), 200
    elif follows == True:
        return jsonify(True), 200
    else:
        return jsonify('ERROR'), 401

@follows.route('/followers/<id>', methods=['GET'])
def show_followers(id):
    followers = controller_show_followers(id)
    if followers is None: 
        return jsonify("ERROR."), 401
    return jsonify(list(map(lambda follow: follow.serialize(), followers))), 200

@follows.route('/followings/<id>', methods=['GET'])
def show_followings(id):
    followings = controller_show_followings(id)
    if followings is None: 
        return jsonify("ERROR."), 401
    return jsonify(list(map(lambda follow: follow.serialize(), followings))), 200