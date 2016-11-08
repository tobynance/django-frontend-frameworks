from django.conf.urls import include, url
from django.views.generic.base import RedirectView
from django.contrib import admin
from sample_app.views import page1, page3, authors, author


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', RedirectView.as_view(url='sample-app/page1', permanent=False)),
    url(r'^sample-app/page1$', page1),
    url(r'^sample-app/page3$', page3),
    url(r'^sample-app/authors$', authors, name='authors'),
    url(r'^sample-app/authors/(?P<author_id>\d{1,10})$', author, name='author'),
]
