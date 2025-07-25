var config = {};
config['path'] = {
    'a': '/data/content_script/inject.js',
    'b': '/data/content_script/vendor/readability.js'
}, config['welcome'] = {
    set 'lastupdate'(c) {
        app['storage']['write']('lastupdate', c);
    },
    get 'lastupdate'() {
        return app['storage']['read']('lastupdate') !== undefined ? app['storage']['read']('lastupdate') : 0;
    }
}, config['interface'] = {
    set 'size'(c) {
        app['storage']['write']('interface.size', c);
    },
    set 'context'(c) {
        app['storage']['write']('interface.context', c);
    },
    get 'size'() {
        return app['storage']['read']('interface.size') !== undefined ? app['storage']['read']('interface.size') : config['interface']['default']['size'];
    },
    get 'context'() {
        return app['storage']['read']('interface.context') !== undefined ? app['storage']['read']('interface.context') : config['interface']['default']['context'];
    },
    'default': {
        'context': 'same-tab',
        'size': {
            'width': 1080,
            'height': 700
        }
    }
}, config['reader'] = {
    set 'mode'(c) {
        app['storage']['write']('mode', c);
    },
    set 'font'(c) {
        app['storage']['write']('font', c);
    },
    set 'size'(c) {
        app['storage']['write']('size', c);
    },
    set 'width'(c) {
        app['storage']['write']('width', c);
    },
    set 'height'(c) {
        app['storage']['write']('height', c);
    },
    get 'size'() {
        return app['storage']['read']('size') !== undefined ? app['storage']['read']('size') : 75;
    },
    get 'width'() {
        return app['storage']['read']('width') !== undefined ? app['storage']['read']('width') : 800;
    },
    get 'height'() {
        return app['storage']['read']('height') !== undefined ? app['storage']['read']('height') : 16;
    },
    get 'mode'() {
        return app['storage']['read']('mode') !== undefined ? app['storage']['read']('mode') : 'sepai';
    },
    get 'font'() {
        return app['storage']['read']('font') !== undefined ? app['storage']['read']('font') : 'sans-serif';
    },
    'toolbar': {
        set 'state'(c) {
            app['storage']['write']('state', c);
        },
        get 'state'() {
            return app['storage']['read']('state') !== undefined ? app['storage']['read']('state') : 'show';
        }
    },
    'view': {
        get 'tab'() {
            return app['storage']['read']('tab');
        },
        get 'uri'() {
            return app['storage']['read']('uri');
        },
        set 'tab'(c) {
            app['storage']['write']('tab', c);
        },
        set 'uri'(c) {
            app['storage']['write']('uri', c);
        },
        get 'data'() {
            return app['storage']['read']('data');
        },
        set 'data'(c) {
            app['storage']['write']('data', c);
        },
        'update': function () {
            app['interface']['send']('style', {
                'mode': config['reader']['mode'],
                'font': config['reader']['font'],
                'size': config['reader']['size'],
                'width': config['reader']['width'],
                'height': config['reader']['height']
            });
        }
    }
};