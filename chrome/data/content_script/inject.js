if (background === undefined) {
    var background = (function () {
        let c = {};
        return chrome['runtime']['onMessage']['addListener'](function (d) {
            for (let e in c) {
                c[e] && typeof c[e] === 'function' && (d['path'] === 'background-to-page' && (d['method'] === e && c[e](d['data'])));
            }
        }), {
            'receive': function (d, e) {
                c[d] = e;
            },
            'send': function (d, e) {
                chrome['runtime']['sendMessage']({
                    'method': d,
                    'data': e,
                    'path': 'page-to-background'
                }, function () {
                    return chrome['runtime']['lastError'];
                });
            }
        };
    }());
    background['receive']('get-reader-view', function (c) {
        if (c) {
            const d = new Readability(document['cloneNode'](!![]))['parse']();
            background['send']('set-reader-view', {
                'tab': c['tab'],
                'data': d,
                'uri': {
                    'href': document['location']['href'],
                    'host': document['location']['host'],
                    'path': document['location']['protocol'] + '//' + document['location']['host'],
                    'scheme': document['location']['protocol']['substr'](0, document['location']['protocol']['indexOf'](':')),
                    'base': document['location']['protocol'] + '//' + document['location']['host'] + document['location']['pathname']['substr'](0, document['location']['pathname']['lastIndexOf']('/') + 1)
                }
            });
        }
    });
}