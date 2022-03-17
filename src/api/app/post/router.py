from flask import Flask, request, jsonify, url_for, Blueprint
from api.app.post.controller import create_post, delete_post, controller_show_user_post, controller_show_all_post, controller_get_post, controller_show_follow_post
from api.models.index import db, Post
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

posts = Blueprint('posts', __name__)

@posts.route("/", methods=['POST'])
@jwt_required()
def post_create():
    token = get_jwt_identity()
    body = request.form.to_dict()
    img = request.files
    new_post = create_post(token, body, img)
    if new_post == 'Internal Server Error.':
        return jsonify('Internal Server Error.'), 500
    return jsonify(new_post), 201


@posts.route("/", methods=['DELETE'])
@jwt_required()
def delete_create():
    user_id = get_jwt_identity()
    body = request.get_json(force=True)
    response = delete_post(user_id, body)
    if response == 1:
        return jsonify("You have no permissions to delete this post."), 400
    elif response == 2:
        return jsonify("Post deleted succesfully."), 200
    return jsonify('Internal Server Error.'), 500

# DATA STRUCTURE FOR DELETE

# {
#     "user_id": (POST.USER_ID),
#     "post_id": (POST TO DELETE)
# }

@posts.route("/<id>", methods=['GET'])
def get_post(id):
    post = controller_get_post(id)
    if post == 'Internal Server Error.':
        return jsonify('ERROR'), 401
    return jsonify(post.serialize_user()), 200

# DATA STRUCTURE FOR DELETE

# {
#     "post_id": (POST TO DELETE)
# }

@posts.route('/all', methods=['GET'])
def show_all_post():
    posts = controller_show_all_post()
    if posts == 'Internal Server Error.':
        return jsonify('ERROR'), 401
    return jsonify(list(map(lambda post: post.serialize_user(), posts))), 200

@posts.route('/user/follow', methods=['GET'])
@jwt_required()
def show_follow_post():
    id = get_jwt_identity()
    posts = controller_show_follow_post(id['id'])
    if posts == 'Internal Server Error.':
        return jsonify('ERROR'), 401
    return jsonify(list(map(lambda post: post.serialize_user(), posts))), 200

@posts.route('/user/<id>', methods=['GET'])
def show_user_post(id):
    posts = controller_show_user_post(id)
    if posts == 'Internal Server Error.':
        return jsonify('ERROR'), 401
    return jsonify(list(map(lambda post: post.serialize_user(), posts))), 200