"""
Tastypie API definition for CardControl application.
"""

from azzaip.models import Message
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.resources import ALL, ALL_WITH_RELATIONS
from tastypie import fields
from tastypie.fields import ToManyField
from tastypie.http import HttpBadRequest
from tastypie.cache import SimpleCache

CACHE = False


class MessageResource(ModelResource):
    """
    Tastypie API resource for Message.
    """
    class Meta:
        """
        Additional configuration for fields, allowed HTTP methods,
        etc. for this API resource.
        """
        always_return_data = True
        queryset = Message.objects.all()
        if CACHE:
            cache = SimpleCache()
        list_allowed_methods = ['get', 'put', 'post']
        detail_allowed_methods = ['get', 'put', 'post']
        resource_name = 'message'
        authorization = Authorization()
        excludes = ['created_at', 'modified_at']
        filtering = {
            'managed_resource_uri': ALL,
            'author_uri' : ALL,
            'created_at' : ALL,
            'modified_at' : ALL
        }

    @staticmethod
    def hydrate_id(bundle):
        """
        Remove the id from any bundle passed to the API.
        """
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    @staticmethod
    def hydrate_resource_uri(bundle):
        """
        Remove the URI string from any bundle passed to the API.
        """
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle

