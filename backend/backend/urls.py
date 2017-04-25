"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from tastypie.api import Api

# Import our tastypie API resources
from azzaip.api import MessageResource, AccessResource
# Import our github webook view
from backend import views

# Register a URL endpoint for each api resource
API = Api(api_name='v1')
API.register(MessageResource())
API.register(AccessResource())

# Route the actual URL patterns
urlpatterns = [
    url(r'', include('azzaip.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(API.urls)),
    url(r'^hook/$', views.hook, name='hook')
]
