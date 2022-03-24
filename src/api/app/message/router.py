from flask import Flask, request, jsonify, url_for, Blueprint
from api.app.comment.controller import send_message, recive_message
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

comments = Blueprint('message', __name__)

@message.route("/send", methods=['POST'])
@jwt_required()
def message():
    token = get_jwt_identity()
    body = request.get.json(force=True)
    new_message = send_message(token, body)
    return jsonify(new_message), 201

@message.route("/recived", methods=['GET'])
def recv_message():
    body = request.get_json(force=True)
    response = recived_message(body)
    if response == 1:
        return jsonify("You have a new message."), 400
    