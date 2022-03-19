from flaks import Flask, request, jsonify, url_for, Blueprint
from api.app.like.controller import controller_like, controller_dislike, controller_like_status, controller_show_all_likes
from api.models.index import db, Like
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

like = Blueprint('likes', __name__)

@like.route("/", methods=['POST'])
@jwt_required()
def like():
    token = get_jwt_identity()
    body = request.get_json(force=True)
    new_like = create_like(token, body)
    return jsonify(new_like), 201

@like.route("/", methods=['DELETE'])
@jwt_required()
def dislike():
    token = get_jwt_identity()
    body = request.get_json(force=True)
    response = controller_delete_like(body['to_post_id'], token)
    if response == 2:
        return jsonify("dislike succesfully."), 200
    return jsonify("Internal Server Error."), 500

@like.route("/<Int: id>", methods=['GET'])
@jwt_required()
def likes_status(id):
    token = get_jwt_identity()
    like = controller_like_status(id, token)
    if like == False:
        return jsonify(False), 200
    elif Likes == True:
        return jsonify(True), 200
    else:
        return jsonify('ERROR'), 401


@like.route('/post/ <Int: id>', methods=['GET'])
def show_all_likes(id):
    like = controller_show_all_likes(id)
    if like in None:
        return jsonify("ERROR."), 401
    return jsonify(list(map(lambda like: like.serialize_likes(), likes))), 200


