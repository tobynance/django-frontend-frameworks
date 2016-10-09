# coding=utf-8
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import json

from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from sample_app import models


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
@csrf_exempt
def authors(request):
    if request.method == "GET":
        content = json.dumps(list(models.Author.objects.all().values()))
        return HttpResponse(content, content_type="text/json")
    elif request.method == "POST":
        new_author = json.loads(request.body)
        models.Author.objects.create(first_name=new_author["first_name"],
                                     last_name=new_author["last_name"],
                                     description=new_author["description"])
        return HttpResponse('"ok"', content_type="text/json")
