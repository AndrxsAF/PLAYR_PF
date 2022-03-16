from flask import Flask, request, jsonify, url_for, Blueprint
from api.app.saved.controller import controller_save, controller_unsave, controller_show_save
from api.models.index import db, Saved
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

save = Blueprint('save', __name__)

@save.route("/", methods=['POST'])
@jwt_required()
def save_post():
    token = get_jwt_identity()
    body = request.get_json(force=True)
    new_save = controller_save(token, body)
    return jsonify(new_save), 201

@save.route("/", methods=['DELETE'])
@jwt_required()
def unsave_post():
    token = get_jwt_identity()
    body = request.get_json(force=True)
    response = controller_unsave(body['post_id'], token)
    if response == 2:
        return jsonify("Post unsaved succesfully."), 200
    return jsonify('Internal Server Error.'), 500

@save.route('/', methods=['GET'])
@jwt_required()
def show_save():
    token = get_jwt_identity()
    saved_post = controller_show_save(token)
    if saved_post is None: 
        return jsonify("ERROR."), 401
    return jsonify(list(map(lambda post: post.serialize(), saved_post))), 200