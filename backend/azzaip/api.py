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
import requests
import json

CACHE = False

# CARD_URL = 'http://34.193.86.61'
CARD_URL = 'http://localhost:8000'
AZZAIP_RESOURCE = '5'


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
            'course_uri': ALL,
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


class AccessResource(ModelResource):
    """
    Tastypie API resource for Message.
    """
    class Meta:
        """
        Additional configuration for fields, allowed HTTP methods,
        etc. for this API resource.
        """
        always_return_data = True
        # queryset = Message.objects.all()
        if CACHE:
            cache = SimpleCache()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post']
        resource_name = 'access'
        authorization = Authorization()
        excludes = ['created_at', 'modified_at']
        filtering = {
        }

    @staticmethod
    def dehydrate(bundle):
        if bundle.request.method == 'POST' or bundle.request.method == 'PUT':
            user_id = bundle.data['id']
            req = requests.get(CARD_URL + '/api/v1/access_point/?format=json&users__id=' + str(user_id) + '&parent=' + AZZAIP_RESOURCE)
            ap_json = json.loads(req.text)
            aps = []
            for ap in ap_json['objects']:
                # aps.append(ap['resource_uri'])
                aps.append(ap)
            bundle.data['access_points'] = aps

        return bundle

    def get_object_list(self, request):
        """
            populates the list endpoint
        """
        return []

    def obj_get_list(self, request=None, **kwargs):
        """
            Don't know why you need this... but you do.
        """
        return self.get_object_list(request)
    
    def get_resource_uri(self, updated_bundle=None):
        """
            generates the URI for each object
        """
        if updated_bundle is not None:
            kwargs = {
                "resource_name": self._meta.resource_name,
                "pk": str(updated_bundle.data['id'])
            }
        else:
            kwargs = {
                "resource_name": self._meta.resource_name,
                "pk": "0"
            }
        if self._meta.api_name is not None:
            kwargs['api_name'] = self._meta.api_name

        return self._build_reverse_url("api_dispatch_detail", kwargs=kwargs)
    
    def obj_get(self, request=None, **kwargs):
        pass

    def obj_update(self, bundle, request=None, **kwargs):
        ''' Used for PUT requests '''
        return self.dehydrate(bundle)

    def obj_create(self, bundle, request=None, **kwargs):
        """
            For POST Requests
            
            This method blows. You know it. I know it.
            Let's never speak of this again.
        """
        return bundle

        
    def rollback(self, bundles):
        pass
      
      
class ManageResource(ModelResource):
    """
    Tastypie API resource for Message.
    """
    class Meta:
        """
        Additional configuration for fields, allowed HTTP methods,
        etc. for this API resource.
        """
        always_return_data = True
        # queryset = Message.objects.all()
        if CACHE:
            cache = SimpleCache()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post']
        resource_name = 'manage'
        authorization = Authorization()
        excludes = ['created_at', 'modified_at']
        filtering = {
        }

    @staticmethod
    def dehydrate(bundle):
        if bundle.request.method == 'POST' or bundle.request.method == 'PUT':
            user_id = bundle.data['id']
            req = requests.get(CARD_URL + '/api/v1/user_account/' + str(user_id) + '/?format=json')
            user_json = json.loads(req.text)
            bundle.data['access_points'] = user_json['access_points_managed']
        return bundle

    def get_object_list(self, request):
        """
            populates the list endpoint
        """
        return []

    def obj_get_list(self, request=None, **kwargs):
        """
            Don't know why you need this... but you do.
        """
        return self.get_object_list(request)
    
    def get_resource_uri(self, updated_bundle=None):
        """
            generates the URI for each object
        """
        if updated_bundle is not None:
            kwargs = {
                "resource_name": self._meta.resource_name,
                "pk": str(updated_bundle.data['id'])
            }
        else:
            kwargs = {
                "resource_name": self._meta.resource_name,
                "pk": "0"
            }
        if self._meta.api_name is not None:
            kwargs['api_name'] = self._meta.api_name

        return self._build_reverse_url("api_dispatch_detail", kwargs=kwargs)
    
    def obj_get(self, request=None, **kwargs):
        pass

    def obj_update(self, bundle, request=None, **kwargs):
        ''' Used for PUT requests '''
        return self.dehydrate(bundle)

    def obj_create(self, bundle, request=None, **kwargs):
        """
            For POST Requests
            
            This method blows. You know it. I know it.
            Let's never speak of this again.
        """
        return bundle

        
    def rollback(self, bundles):
        pass
