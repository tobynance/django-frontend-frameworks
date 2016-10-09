# coding=utf-8
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse


########################################################################
def page1(request):
    return render(request, "author/page1.html")


########################################################################
def page2(request):
    return render(request, "author/page2.html")


########################################################################
def api_root(request):
    content = """\
    {
        "authors": "/sample-app/authors"
    }
    """
    return HttpResponse(content, content_type="text/json")


########################################################################
def api_token(request):
    return HttpResponse("notimplemented", content_type="text/json")


########################################################################
def authors(request):
    content = """\
    [
        {"firstName": "Roober", "lastName": "Jones", "description": "has a beard"},
        {"firstName": "Loober", "lastName": "Jones", "description": "super tall"},
        {"firstName": "Hoober", "lastName": "Turner", "description": "probably dead"}
    ]"""
    return HttpResponse(content, content_type="text/json")
