from flask import Flask, request, jsonify, url_for, Blueprint
from api.app.like.controller import controller_like, controller_dislike, controller_like_status, controller_show_all_likes, controller_explore
from api.models.index import db, Like
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

likes = Blueprint('likes', __name__)

@likes.route("/", methods=['POST'])
@jwt_required()
def like():
    token = get_jwt_identity()
    body = request.get_json(force=True)
    print("body", body)
    new_like = controller_like(token["id"], body)
    if new_like == 2:
        return jsonify(True), 200
    return jsonify('Internal Server Error.'), 500

@likes.route("/", methods=['DELETE'])
@jwt_required()
def dislike():
    token = get_jwt_identity()
    body = request.get_json(force=True)
    response = controller_dislike(token["id"], body)
    if response == 2:
        return jsonify(False), 200
    return jsonify("Internal Server Error."), 500

@likes.route("/<id>", methods=['GET'])
@jwt_required()
def likes_status(id):
    token = get_jwt_identity()
    like = controller_like_status(id, token["id"])
    if like == False:
        return jsonify(False), 200
    elif like == True:
        return jsonify(True), 200
    else:
        return jsonify('ERROR'), 401


@likes.route('/post/<id>', methods=['GET'])
def show_all_likes(id):
    likes = controller_show_all_likes(id)
    if likes is None:
        return jsonify("No likes."), 401
    print(likes)
    return jsonify(list(map(lambda elem: elem.serialize(), likes))), 200

@likes.route('/explore', methods=['GET'])
def explore():
    posts = controller_explore()
    if posts is None:
        return jsonify("ERROR."), 401
    return jsonify(list(map(lambda elem: elem.serialize(), posts))), 200



