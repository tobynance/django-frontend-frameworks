# coding=utf-8
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

from django.shortcuts import render


########################################################################
def page1(request):
    return render(request, "page1.html")


########################################################################
def page2(request):
    return render(request, "page2.html")
