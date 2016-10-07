# coding=utf-8
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

from django.conf import settings
from compressor.filters import CompilerFilter

BABEL_BUILDER = ("browserify %s {infile} -o {outfile} "
                 "-t [ babelify --presets [react es2015 ] "
                 "--plugins [ transform-class-properties transform-decorators ] ]")

BABEL_BUILDER %= "-d" if settings.DEBUG else ""

JS_SNIPPET = """\
/* Dynamically added by BabelFilter */

var django = {
    STATIC_URL: "%s",
    static: function(url) {
        return this.STATIC_URL + url;
    }
};

/* end dynamic insertion */
""" % settings.STATIC_URL


########################################################################
class BabelFilter(CompilerFilter):
    command = BABEL_BUILDER

    ####################################################################
    def input(self, **kwargs):
        output = super(BabelFilter, self).input(**kwargs)
        return JS_SNIPPET + output
