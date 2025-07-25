var background = (function () {
        let c = {}, d = document['documentElement']['getAttribute']('context');
        return d === 'webapp' ? {
            'send': function () {
            },
            'receive': function (e) {
            }
        } : (chrome['runtime']['onMessage']['addListener'](function (e) {
            for (let f in c) {
                c[f] && typeof c[f] === 'function' && (e['path'] === 'background-to-interface' && (e['method'] === f && c[f](e['data'])));
            }
        }), {
            'receive': function (e, f) {
                c[e] = f;
            },
            'send': function (e, f) {
                chrome['runtime']['sendMessage']({
                    'method': e,
                    'data': f,
                    'path': 'interface-to-background'
                }, function () {
                    return chrome['runtime']['lastError'];
                });
            }
        });
    }()), config = {
        'newtab': !![],
        'toolbar': {
            'hide': function () {
                let c = document['querySelector']('.arrow-left'), d = document['querySelector']('.settings');
                d['style']['display'] = 'none', c['style']['display'] = d['style']['display'];
            },
            'toggle': function () {
                let c = document['querySelector']('.arrow-left'), d = document['querySelector']('.settings');
                d['style']['display'] = d['style']['display'] === 'table' ? 'none' : 'table', c['style']['display'] = d['style']['display'];
            }
        },
        'render': function (c) {
            let d = c === 'dark', e = c === 'sepia', f = c === 'indigo', g = c === 'indRed', h = c === 'hotPink', i = c === 'teal', j = c === 'black', k = c === 'steel', l = g ? 'rgb(255, 255, 255)' : k ? 'rgb(255, 255, 255)' : j ? 'white' : i ? 'rgb(255, 255, 255)' : h ? 'rgb(255, 255, 255)' : f ? 'rgb(255, 255, 255)' : e ? 'rgb(51, 51, 51)' : d ? 'rgb(238, 238, 238)' : 'rgb(51, 51, 51)', m = g ? '#660000' : k ? '#153c5c' : j ? 'black' : i ? '#102424' : h ? '#5c163d' : f ? '#4B0082' : e ? 'rgb(244, 236, 216)' : d ? 'rgb(51, 51, 51)' : 'rgb(255, 255, 255)';
            return {
                'color': l,
                'background': m
            };
        },
        'update': {
            'selected': function (c) {
                let d = document['querySelector']('.arrow-left'), f = document['querySelector']('.settings');
                d['style']['borderRightColor'] = c['mode'] !== 'dark' ? 'rgb(68, 68, 68)' : 'rgb(230, 230, 230)', [...f['querySelectorAll']('td')]['map'](g => g['removeAttribute']('selected')), f['querySelector']('.' + c['font'])['setAttribute']('selected', '');
            }
        },
        'style': function (c) {
            config['update']['selected'](c);
            const d = config['render'](c['mode']), f = document['querySelector']('iframe'), g = f['contentDocument']['getElementById']('reader-view-style');
            g && (g['textContent'] = '\n        body {\n          color: ' + d['color'] + ';\n          width: ' + c['width'] + 'px !important;\n          font-size: ' + c['size'] + '% !important;\n          font-family: ' + c['font'] + ' !important;\n          background-color: ' + d['background'] + ';\n          line-height: ' + c['height'] + 'px !important;\n        }\n      ');
        },
        'port': {
            'name': '',
            'connect': function () {
                config['port']['name'] = 'webapp';
                let c = document['documentElement']['getAttribute']('context');
                if (chrome['runtime']) {
                    if (chrome['runtime']['connect']) {
                        if (c !== config['port']['name']) {
                            if (document['location']['search'] === '?win')
                                config['port']['name'] = 'win';
                            if (document['location']['search'] === '?popup')
                                config['port']['name'] = 'popup';
                            if (document['location']['search'] === '?new-tab')
                                config['port']['name'] = 'new-tab';
                            if (document['location']['search'] === '?same-tab')
                                config['port']['name'] = 'same-tab';
                            config['port']['name'] === 'popup' && (document['body']['style']['width'] = '790px', document['body']['style']['height'] = '580px'), chrome['runtime']['connect']({ 'name': config['port']['name'] });
                        }
                    }
                }
                document['documentElement']['setAttribute']('context', config['port']['name']);
            }
        },
        'load': function () {
            let c = document['querySelector']('.hide'), d = document['querySelector']('.show'), e = document['querySelector']('.dark'), f = document['querySelector']('.print'), g = document['querySelector']('.sepia'), h = document['querySelector']('.light'), i = document['querySelector']('.Indigo'), j = document['querySelector']('.indRed'), k = document['querySelector']('.HotPink'), l = document['querySelector']('.Teal'), m = document['querySelector']('.black'), n = document['querySelector']('.Steel'), o = document['querySelector']('.close'), p = document['querySelector']('.serif'), q = document['querySelector']('.reload'), r = document['querySelector']('.toolbar'), s = document['querySelector']('.support'), t = document['querySelector']('.donation'), u = document['querySelector']('.settings'), v = document['querySelector']('.sans-serif'), w = document['querySelector']('.reader-view'), x = document['querySelector']('.increase-size'), y = document['querySelector']('.decrease-size'), z = document['querySelector']('.increase-width'), A = document['querySelector']('.decrease-width'), B = document['querySelector']('.increase-height'), C = document['querySelector']('.decrease-height');
            o['addEventListener']('click', function () {
                background['send']('close');
            }), q['addEventListener']('click', function () {
                document['location']['reload']();
            }), s['addEventListener']('click', function () {
                background['send']('support');
            }), t['addEventListener']('click', function () {
                background['send']('donation');
            }), e['addEventListener']('click', function () {
                background['send']('mode', 'dark');
            }), p['addEventListener']('click', function () {
                background['send']('font', 'serif');
            }), g['addEventListener']('click', function () {
                background['send']('mode', 'sepia');
            }), h['addEventListener']('click', function () {
                background['send']('mode', 'light');
            }), i['addEventListener']('click', function () {
                background['send']('mode', 'indigo');
            }), j['addEventListener']('click', function () {
                background['send']('mode', 'indRed');
            }), k['addEventListener']('click', function () {
                background['send']('mode', 'hotPink');
            }), l['addEventListener']('click', function () {
                background['send']('mode', 'teal');
            }), m['addEventListener']('click', function () {
                background['send']('mode', 'black');
            }), n['addEventListener']('click', function () {
                background['send']('mode', 'steel');
            }), x['addEventListener']('click', function () {
                background['send']('increase-size');
            }), y['addEventListener']('click', function () {
                background['send']('decrease-size');
            }), v['addEventListener']('click', function () {
                background['send']('font', 'sans-serif');
            }), z['addEventListener']('click', function () {
                background['send']('increase-width');
            }), A['addEventListener']('click', function () {
                background['send']('decrease-width');
            }), B['addEventListener']('click', function () {
                background['send']('increase-height');
            }), C['addEventListener']('click', function () {
                background['send']('decrease-height');
            }), w['addEventListener']('click', function () {
                config['toolbar']['toggle']();
            }, ![]), f['addEventListener']('click', function () {
                config['toolbar']['toggle'](), document['querySelector']('iframe')['contentWindow']['print']();
            }), c['addEventListener']('click', function () {
                config['toolbar']['hide'](), background['send']('state', 'hide'), r['setAttribute']('state', 'hide');
            }), d['addEventListener']('click', function () {
                config['toolbar']['hide'](), background['send']('state', 'show'), r['setAttribute']('state', 'show');
            }), u['addEventListener']('keydown', function (D) {
                let E = D['target']['getAttribute']('class'), F = D['key'] === 'ArrowUp' && E['indexOf']('increase') !== -1, G = D['key'] === 'ArrowDown' && E['indexOf']('decrease') !== -1;
                (F || G) && background['send'](E);
            }, ![]), background['send']('reader-view-data'), window['removeEventListener']('load', config['load'], ![]);
        },
        'reader': {
            'uri': {},
            'data': {},
            'toolbar': { 'state': 'show' },
            'view': function (c) {
                config['update']['selected'](c), config['reader']['uri'] = c['uri'], config['reader']['data'] = c['data'], config['reader']['toolbar']['state'] = c['state'];
                if (config['reader']['data']) {
                    const d = config['render'](c['mode']), f = document['querySelector']('iframe'), g = document['querySelector']('.toolbar'), h = f['contentDocument']['createElement']('a'), i = f['contentDocument']['createElement']('h1'), j = document['getElementsByTagName']('head')[0], k = f['contentDocument']['createElement']('span'), l = f['contentDocument']['createElement']('style'), m = f['contentDocument']['createElement']('style'), n = document['querySelector']('link[rel*="icon"]') || document['createElement']('link');
                    f['contentDocument']['open'](), f['contentDocument']['write'](config['reader']['data']['content']), f['contentDocument']['close'](), h['href'] = config['reader']['uri']['href'], g['style']['display'] = 'block', h['setAttribute']('target', '_blank'), h['textContent'] = config['reader']['uri']['href'], l['setAttribute']('id', 'reader-view-style'), g['setAttribute']('state', config['reader']['toolbar']['state']), document['title'] = config['reader']['data']['title'] + ' :: Only Read', i['textContent'] = config['reader']['data']['title'] + ' :: Only Read', j['appendChild'](Object['assign'](n, {
                        'type': 'image/x-icon',
                        'rel': 'shortcut icon',
                        'href': 'chrome://favicon/' + config['reader']['uri']['href']
                    })), i['style'] = '\n          padding: 0;\n          margin: 10px 0;\n          font-size: 1.5em;\n        ', h['style'] = '\n          display: block;\n          margin: 10px 0;\n          overflow: hidden;\n          font-size: 1.1em;\n          white-space: nowrap;\n          text-decoration: none;\n          text-overflow: ellipsis;\n          color: rgb(48, 115, 218);\n          font-family: arial, sans-serif;\n        ', k['style'] = '\n          height: 1px;\n          display: block;\n          margin: 10px 0px;\n          text-decoration: none;\n          background: rgb(160, 160, 160);\n        ', m['textContent'] = '\n          body {\n            margin: 10px;\n            width: 800px;\n            margin: 10px auto;\n            line-height: 18px;\n            font-family: arial, sans-serif;\n            transition: color 400ms, background-color 400ms;\n          }\n          img {\n            width: auto;\n            height: auto;\n            display: block;\n            max-width: 100%;\n          }\n          p {\n            overflow: auto;\n            text-align: justify;\n          }\n          a:link, a:link:hover, a:link:active {\n            color: rgb(48, 115, 218);\n          }\n        ', l['textContent'] = '\n          body {\n            color: ' + d['color'] + ';\n            width: ' + c['width'] + 'px !important;\n            font-size: ' + c['size'] + '% !important;\n            font-family: ' + c['font'] + ' !important;\n            background-color: ' + d['background'] + ';\n            line-height: ' + c['height'] + 'px !important;\n          }\n        ', f['contentDocument']['addEventListener']('click', o => {
                        const p = o['target']['closest']('a');
                        if (p && p['href'] && p['href']['startsWith']('http')) {
                            o['preventDefault']();
                            if (config['newtab'])
                                chrome['tabs']['create']({
                                    'url': p['href'],
                                    'active': !![]
                                });
                            else
                                window['top']['location']['replace'](p['href']);
                        }
                    }), f['contentDocument']['documentElement']['appendChild'](l), f['contentDocument']['documentElement']['appendChild'](m), f['contentDocument']['body']['insertBefore'](k, f['contentDocument']['body']['firstChild']), f['contentDocument']['body']['insertBefore'](h, f['contentDocument']['body']['firstChild']), f['contentDocument']['body']['insertBefore'](i, f['contentDocument']['body']['firstChild']);
                }
            }
        }
    };
background['receive']('style', config['style']), background['receive']('reader-view-data', config['reader']['view']), config['port']['connect'](), window['addEventListener']('load', config['load'], ![]);