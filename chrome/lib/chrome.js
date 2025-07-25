var app = {};
app['error'] = function () {
    return chrome['runtime']['lastError'];
}, app['hotkey'] = {
    'on': {
        'pressed': function (c) {
            chrome['commands']['onCommand']['addListener'](function (d) {
                d && (c && c(d));
            });
        }
    }
}, app['button'] = {
    'popup': function (c, d) {
        chrome['action']['setPopup']({ 'popup': c }, function (f) {
            if (d)
                d(f);
        });
    },
    'on': {
        'clicked': function (c) {
            chrome['action']['onClicked']['addListener'](function (d) {
                app['storage']['load'](function () {
                    c(d);
                });
            });
        }
    }
}, app['contextmenu'] = {
    'create': function (c, d) {
        chrome['contextMenus'] && chrome['contextMenus']['create'](c, function (f) {
            if (d)
                d(f);
        });
    },
    'on': {
        'clicked': function (c) {
            chrome['contextMenus'] && chrome['contextMenus']['onClicked']['addListener'](function (d, e) {
                app['storage']['load'](function () {
                    c(d, e);
                });
            });
        }
    }
}, app['on'] = {
    'management': function (c) {
        chrome['management']['getSelf'](c);
    },
    'uninstalled': function (c) {
        chrome['runtime']['setUninstallURL'](c, function () {
        });
    },
    'installed': function (c) {
        chrome['runtime']['onInstalled']['addListener'](function (d) {
            app['storage']['load'](function () {
                c(d);
            });
        });
    },
    'startup': function (c) {
        chrome['runtime']['onStartup']['addListener'](function (d) {
            app['storage']['load'](function () {
                c(d);
            });
        });
    },
    'connect': function (c) {
        chrome['runtime']['onConnect']['addListener'](function (d) {
            app['storage']['load'](function () {
                if (c)
                    c(d);
            });
        });
    },
    'storage': function (c) {
        chrome['storage']['onChanged']['addListener'](function (d, e) {
            app['storage']['update'](function () {
                c && c(d, e);
            });
        });
    },
    'message': function (c) {
        chrome['runtime']['onMessage']['addListener'](function (d, e, f) {
            return app['storage']['load'](function () {
                c(d, e, f);
            }), !![];
        });
    }
}, app['page'] = {
    'port': null,
    'message': {},
    'receive': function (c, d) {
        c && (app['page']['message'][c] = d);
    },
    'post': function (c, d) {
        c && (app['page']['port'] && app['page']['port']['postMessage']({
            'data': d,
            'method': c,
            'path': 'background-to-page'
        }));
    },
    'send': function (c, d, e, f) {
        c && chrome['tabs']['query']({}, function (g) {
            var h = chrome['runtime']['lastError'];
            if (g && g['length']) {
                var i = {
                    'method': c,
                    'data': d ? d : {},
                    'path': 'background-to-page'
                };
                g['forEach'](function (j) {
                    j && (i['data']['tabId'] = j['id'], i['data']['top'] = j['url'] ? j['url'] : '', i['data']['title'] = j['title'] ? j['title'] : '', e && e !== null ? e === j['id'] && (f && f !== null ? chrome['tabs']['sendMessage'](j['id'], i, { 'frameId': f }, app['error']) : chrome['tabs']['sendMessage'](j['id'], i, app['error'])) : chrome['tabs']['sendMessage'](j['id'], i, app['error']));
                });
            }
        });
    }
}, app['window'] = {
    set 'id'(c) {
        app['storage']['write']('window.id', c);
    },
    get 'id'() {
        return app['storage']['read']('window.id') !== undefined ? app['storage']['read']('window.id') : '';
    },
    'create': function (c, d) {
        chrome['windows']['create'](c, function (f) {
            if (d)
                d(f);
        });
    },
    'get': function (c, d) {
        chrome['windows']['get'](c, function (f) {
            if (d)
                d(f);
        });
    },
    'update': function (c, d, e) {
        chrome['windows']['update'](c, d, function (f) {
            if (e)
                e(f);
        });
    },
    'remove': function (c, d) {
        chrome['windows']['remove'](c, function (f) {
            if (d)
                d(f);
        });
    },
    'query': {
        'current': function (c) {
            chrome['windows']['getCurrent'](c);
        }
    },
    'on': {
        'removed': function (c) {
            chrome['windows']['onRemoved']['addListener'](function (d) {
                app['storage']['load'](function () {
                    c(d);
                });
            });
        }
    }
}, app['storage'] = {
    'local': {},
    'read': function (c) {
        return app['storage']['local'][c];
    },
    'clear': function (c) {
        chrome['storage']['local']['clear'](function () {
            app['storage']['local'] = {}, c && c('clear');
        });
    },
    'update': function (c) {
        if (app['session'])
            app['session']['load']();
        chrome['storage']['local']['get'](null, function (d) {
            app['storage']['local'] = d, c && c('update');
        });
    },
    'write': function (c, d, e) {
        let f = {};
        f[c] = d, app['storage']['local'][c] = d, chrome['storage']['local']['set'](f, function (g) {
            e && e(g);
        });
    },
    'load': function (c) {
        const d = Object['keys'](app['storage']['local']);
        d && d['length'] ? c && c('cache') : app['storage']['update'](function () {
            if (c)
                c('disk');
        });
    }
}, app['interface'] = {
    'port': null,
    'message': {},
    'path': chrome['runtime']['getURL']('data/interface/index.html'),
    set 'id'(c) {
        app['storage']['write']('interface.id', c);
    },
    get 'id'() {
        return app['storage']['read']('interface.id') !== undefined ? app['storage']['read']('interface.id') : '';
    },
    'receive': function (c, d) {
        app['interface']['message'][c] = d;
    },
    'send': function (c, d) {
        c && chrome['runtime']['sendMessage']({
            'data': d,
            'method': c,
            'path': 'background-to-interface'
        }, app['error']);
    },
    'post': function (c, d) {
        c && (app['interface']['port'] && app['interface']['port']['postMessage']({
            'data': d,
            'method': c,
            'path': 'background-to-interface'
        }));
    },
    'close': function (c) {
        if (app['interface']['id'])
            try {
                if (c === 'popup') {
                }
                if (c === 'tab')
                    app['tab']['remove'](app['interface']['id']);
                if (c === 'win')
                    app['window']['remove'](app['interface']['id']);
            } catch (d) {
            }
    },
    'create': function (c, d) {
        app['window']['query']['current'](function (e) {
            app['window']['id'] = e['id'], c = c ? c : app['interface']['path'];
            var f = config['interface']['size']['width'], g = config['interface']['size']['height'], h = e['top'] + Math['round']((e['height'] - g) / 2), i = e['left'] + Math['round']((e['width'] - f) / 2);
            app['window']['create']({
                'url': c,
                'top': h,
                'left': i,
                'width': f,
                'type': 'popup',
                'height': g
            }, function (j) {
                app['interface']['id'] = j['id'];
                if (d)
                    d(!![]);
            });
        });
    }
}, app['tab'] = {
    'get': function (c, d) {
        chrome['tabs']['get'](c, function (f) {
            if (d)
                d(f);
        });
    },
    'remove': function (c, d) {
        chrome['tabs']['remove'](c, function (f) {
            if (d)
                d(f);
        });
    },
    'update': function (c, d, e) {
        c ? chrome['tabs']['update'](c, d, function (f) {
            if (e)
                e(f);
        }) : chrome['tabs']['update'](d, function (f) {
            if (e)
                e(f);
        });
    },
    'open': function (c, d, e, f) {
        var g = {
            'url': c,
            'active': e !== undefined ? e : !![]
        };
        d !== undefined && (typeof d === 'number' && (g['index'] = d + 1)), chrome['tabs']['create'](g, function (h) {
            if (f)
                f(h);
        });
    },
    'inject': {
        'js': function (c, d) {
            chrome['scripting'] && chrome['scripting']['executeScript'](c, function (f) {
                var g = chrome['runtime']['lastError'];
                if (d)
                    d(f);
            });
        },
        'css': function (c, d) {
            chrome['scripting'] && chrome['scripting']['insertCSS'](c, function (f) {
                var g = chrome['runtime']['lastError'];
                if (d)
                    d(f);
            });
        }
    },
    'on': {
        'removed': function (c) {
            chrome['tabs']['onRemoved']['addListener'](function (d, e) {
                app['storage']['load'](function () {
                    c(d);
                });
            });
        },
        'updated': function (c) {
            chrome['tabs']['onUpdated']['addListener'](function (d, e, f) {
                app['storage']['load'](function () {
                    e && e['status'] && c(e, f);
                });
            });
        },
        'activated': function (c) {
            chrome['tabs']['onActivated']['addListener'](function (d) {
                app['storage']['load'](function () {
                    chrome['tabs']['get'](d['tabId'], function (e) {
                        var f = chrome['runtime']['lastError'];
                        c(e ? e : { 'id': d['tabId'] });
                    });
                });
            });
        }
    },
    'query': {
        'index': function (c) {
            chrome['tabs']['query']({
                'active': !![],
                'currentWindow': !![]
            }, function (d) {
                var e = chrome['runtime']['lastError'];
                if (d && d['length'])
                    c(d[0]['index']);
                else
                    c(undefined);
            });
        },
        'active': function (c) {
            chrome['tabs']['query']({
                'active': !![],
                'currentWindow': !![]
            }, function (d) {
                var e = chrome['runtime']['lastError'];
                if (d && d['length'])
                    c(d[0]);
                else
                    c(undefined);
            });
        },
        'all': function (c, d) {
            c ? chrome['tabs']['query'](c, function (e) {
                var f = chrome['runtime']['lastError'];
                if (e && e['length'])
                    d(e);
                else
                    d(undefined);
            }) : chrome['tabs']['query']({}, function (e) {
                var f = chrome['runtime']['lastError'];
                if (e && e['length'])
                    d(e);
                else
                    d(undefined);
            });
        }
    },
    'reload': function (c, d, e) {
        c ? d && typeof d === 'object' ? chrome['tabs']['reload'](c, d, function (f) {
            if (e)
                e(f);
        }) : chrome['tabs']['reload'](c, { 'bypassCache': d !== undefined ? d : ![] }, function (f) {
            if (e)
                e(f);
        }) : chrome['tabs']['query']({
            'active': !![],
            'currentWindow': !![]
        }, function (f) {
            var g = chrome['runtime']['lastError'];
            f && f['length'] && (d && typeof d === 'object' ? chrome['tabs']['reload'](f[0]['id'], d, function (h) {
                if (e)
                    e(h);
            }) : chrome['tabs']['reload'](f[0]['id'], { 'bypassCache': d !== undefined ? d : ![] }, function (h) {
                if (e)
                    e(h);
            }));
        });
    }
};