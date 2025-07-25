var core = {
    'start': function () {
        core['load']();
    },
    'install': function () {
        core['load']();
    },
    'load': function () {
        var c = config['interface']['context'], d = app['interface']['path'] + '?' + c;
        app['interface']['id'] = '', app['button']['popup'](c === 'popup' ? d : ''), app['contextmenu']['create']({
            'id': 'win',
            'type': 'radio',
            'title': 'Open in win',
            'contexts': ['action'],
            'checked': c === 'win'
        }, app['error']), app['contextmenu']['create']({
            'id': 'popup',
            'type': 'radio',
            'contexts': ['action'],
            'title': 'Open in popup',
            'checked': c === 'popup'
        }, app['error']), app['contextmenu']['create']({
            'id': 'new-tab',
            'type': 'radio',
            'contexts': ['action'],
            'title': 'Open in a new tab',
            'checked': c === 'new-tab'
        }, app['error']), app['contextmenu']['create']({
            'type': 'radio',
            'id': 'same-tab',
            'contexts': ['action'],
            'title': 'Open in the same tab',
            'checked': c === 'same-tab'
        }, app['error']);
    },
    'action': {
        'storage': function (c, d) {
        },
        'contextmenu': function (c) {
            if (c) {
                app['interface']['close'](config['interface']['context']), config['interface']['context'] = c['menuItemId'];
                var d = config['interface']['context'], f = app['interface']['path'] + '?' + d;
                app['button']['popup'](d === 'popup' ? f : '');
            }
        },
        'close': function () {
            app['tab']['query']['active'](function (c) {
                config['interface']['context'] === 'new-tab' && app['tab']['remove'](c['id']), config['interface']['context'] === 'win' && app['window']['remove'](app['interface']['id']), config['interface']['context'] === 'same-tab' && (c['id'] === config['reader']['view']['tab']['id'] && app['tab']['update'](c['id'], { 'url': config['reader']['view']['uri']['href'] }));
            });
        },
        'button': function () {
            app['tab']['query']['active'](function (c) {
                c && (c['url'] && (c['url']['indexOf'](app['interface']['path']) === 0 ? core['action']['close']() : app['tab']['inject']['js']({
                    'target': { 'tabId': c['id'] },
                    'files': [config['path']['b']]
                }, function () {
                    app['tab']['inject']['js']({
                        'target': { 'tabId': c['id'] },
                        'files': [config['path']['a']]
                    }, function () {
                        app['page']['send']('get-reader-view', {
                            'tab': {
                                'id': c['id'],
                                'width': c['width'],
                                'index': c['index'],
                                'height': c['height']
                            }
                        }, c['id'], null);
                    });
                })));
            });
        },
        'page': function (c) {
            config['reader']['view']['tab'] = c['tab'], config['reader']['view']['uri'] = c['uri'], config['reader']['view']['data'] = c['data'];
            var d = config['interface']['context'], f = app['interface']['path'] + '?' + d;
            if (d === 'popup')
                app['button']['popup'](f);
            else {
                if (app['interface']['id'])
                    d === 'new-tab' && app['tab']['get'](app['interface']['id'], function (g) {
                        g && app['tab']['update'](app['interface']['id'], { 'active': !![] });
                    }), d === 'win' && app['window']['get'](app['interface']['id'], function (g) {
                        g && app['window']['update'](app['interface']['id'], { 'focused': !![] });
                    }), d === 'same-tab' && app['tab']['get'](app['interface']['id'], function (g) {
                        g && app['tab']['update'](app['interface']['id'], { 'active': !![] });
                    });
                else {
                    if (d === 'new-tab')
                        app['tab']['open'](f);
                    if (d === 'win')
                        app['interface']['create'](f);
                    d === 'same-tab' && app['tab']['update'](config['reader']['view']['tab']['id'], {
                        'url': f,
                        'active': !![]
                    });
                }
            }
        }
    }
};
app['window']['on']['removed'](function (c) {
    c === app['interface']['id'] && (app['interface']['id'] = '');
}), app['interface']['receive']('state', function (c) {
    config['reader']['toolbar']['state'] = c;
}), app['interface']['receive']('mode', function (c) {
    config['reader']['mode'] = c, config['reader']['view']['update']();
}), app['interface']['receive']('font', function (c) {
    config['reader']['font'] = c, config['reader']['view']['update']();
}), app['interface']['receive']('increase-size', function () {
    config['reader']['size'] = config['reader']['size'] + 1, config['reader']['view']['update']();
}), app['interface']['receive']('decrease-size', function () {
    config['reader']['size'] = config['reader']['size'] - 1, config['reader']['view']['update']();
}), app['interface']['receive']('increase-width', function () {
    config['reader']['width'] = config['reader']['width'] + 10, config['reader']['view']['update']();
}), app['interface']['receive']('decrease-width', function () {
    config['reader']['width'] = config['reader']['width'] - 10, config['reader']['view']['update']();
}), app['interface']['receive']('increase-height', function () {
    config['reader']['height'] = config['reader']['height'] + 1, config['reader']['view']['update']();
}), app['interface']['receive']('decrease-height', function () {
    config['reader']['height'] = config['reader']['height'] - 1, config['reader']['view']['update']();
}), app['interface']['receive']('reader-view-data', function () {
    app['interface']['send']('reader-view-data', {
        'font': config['reader']['font'],
        'size': config['reader']['size'],
        'mode': config['reader']['mode'],
        'uri': config['reader']['view']['uri'],
        'height': config['reader']['height'],
        'data': config['reader']['view']['data'],
        'state': config['reader']['toolbar']['state'],
        'width': config['interface']['context'] === 'popup' ? 650 : config['reader']['width']
    });
}), app['on']['storage'](core['action']['storage']), app['hotkey']['on']['pressed'](core['action']['button']), app['button']['on']['clicked'](core['action']['button']), app['interface']['receive']('close', core['action']['close']), app['contextmenu']['on']['clicked'](core['action']['contextmenu']), app['page']['receive']('set-reader-view', core['action']['page']), app['interface']['receive']('support', function () {
    app['tab']['open'](app['homepage']());
}), app['interface']['receive']('donation', function () {
    app['tab']['open']('https://chrome.google.com/webstore/detail/' + chrome['runtime']['id'] + '/reviews');
}), app['on']['startup'](core['start']), app['on']['installed'](core['install']);