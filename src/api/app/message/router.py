from flask import Flask, request, jsonify, url_for, Blueprint
from api.app.message.controller import controller_message, controller_recv_message
from api.models.index import db, Message
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

chat = Blueprint('chat', __name__)

@chat.route("/message/send", methods=['POST'])
@jwt_required()
def send_message():
    token = get_jwt_identity()
    if (token == token):
        return message()
    else: return jsonify({"alert": "Token invalid"}), 400
    body = request.get.json(force=True)
    new_message = controller_message(token, body)
    return jsonify(new_message), 201

@chat.route("/message/recv", methods=['GET'])
def recv_message():
    response = controller_recv_message()
    if response == 1:
        return jsonify("You have a new message."), 200

