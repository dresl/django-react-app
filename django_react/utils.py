from base.serializers import UserWithTokenSerializer


def base_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserWithTokenSerializer(user, context={'request': request}).data
    }
