from flask import Flask, request, jsonify, url_for, Blueprint
from api.app.post.controller import create_post, delete_post
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
    body = request.get_json()
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

@posts.route("/", methods=['GET'])
def get_post():
    body = request.get_json()
    post = Post.query.get(body["post_id"])
    return jsonify(post.serialize()), 200

# DATA STRUCTURE FOR DELETE

# {
#     "post_id": (POST TO DELETE)
# }

@posts.route('/all', methods=['GET'])
def show_all_post():
    posts = Post.query.all()
    return jsonify(list(map(lambda post: post.serialize(), posts))), 200