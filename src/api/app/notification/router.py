from flask import Flask, request, jsonify, url_for, Blueprint
from api.app.notification.controller import controller_show_notifications
from api.models.index import db, Notification
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

notifications = Blueprint('notifications', __name__)

@notifications.route('/', methods=['GET'])
@jwt_required()
def show_notifications():
    token = get_jwt_identity()
    notification = controller_show_notifications(token)
    if notification is None: 
        return jsonify("ERROR."), 401
    return jsonify(list(map(lambda notify: notify.serialize(), notification))), 200