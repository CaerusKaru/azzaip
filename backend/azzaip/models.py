"""
Models for the MVC setup of the Azzaip applications. Defines the
means by which the application interfaces with the database.
"""

import datetime
from django.db import models


class Message(models.Model):
    """
    A single Azzaip post with all relevant fields.
    """

    author_uri = models.CharField(max_length=40)
    managed_resource_uri = models.CharField(max_length=40)
    message_text = models.CharField(max_length=500)
    message_title = models.CharField(max_length=120)

    created_at = models.DateTimeField(default=datetime.datetime.now,
                                      editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    created_by = models.CharField(max_length=40)
    modified_by = models.CharField(max_length=40)

    class Meta:
        """
        Meta information for a Message, defining additional properties.
        """
        app_label = 'azzaip'

    def __str__(self):
        return self.utln

