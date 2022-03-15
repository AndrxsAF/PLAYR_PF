from flask import Flask, request, jsonify, url_for, Blueprint
from api.app.comment.controller import create_comment, delete_comment, controller_show_comment_post
from api.models.index import db, Comment
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

comments = Blueprint('comments', __name__)

@comments.route("/", methods=['POST'])
@jwt_required()
def post_comment():
    token = get_jwt_identity()
    body = request.get_json(force=True)
    new_comment = create_comment(token, body)
    return jsonify(new_comment), 201

@comments.route("/", methods=['DELETE'])
def del_comment():
    body = request.get_json(force=True)
    response = delete_comment(body)
    if response == 1:
        return jsonify("You have no permissions to delete this comment."), 400
    elif response == 2:
        return jsonify("Comment deleted succesfully."), 200
    return jsonify('Internal Server Error.'), 500

@comments.route('/post/<id>', methods=['GET'])
def show_comment_post(id):
    comments = controller_show_comment_post(id)
    if comments == 'Internal Server Error.':
        return jsonify('ERROR'), 401
    return jsonify(list(map(lambda comment: comment.serialize_user(), comments))), 200