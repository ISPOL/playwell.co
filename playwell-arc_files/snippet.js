
(function(window) {

    var sgConfig = {
        domain : "//pixel.intenta.io"
    };

    function sgDebug(message){
        if (typeof console == "object") {
            //console.log(message);
        }
    }
    var token = document.getElementsByTagName("body")[0].getAttribute("data-int_token");

    sgDebug("SG Token: " + token);

    var Ajax = {
        request: function(ops) {
            if(typeof ops == 'string') ops = { url: ops };
            ops.url = ops.url || '';
            ops.method = ops.method || 'get'
            ops.data = ops.data || {};
            ops.withCredentials = true;
            var getParams = function(data, url) {
                var arr = [], str;
                for(var name in data) {
                    arr.push(name + '=' + encodeURIComponent(data[name]));
                }
                str = arr.join('&');
                if(str != '') {
                    return url ? (url.indexOf('?') < 0 ? '?' + str : '&' + str) : str;
                }
                return '';
            }
            var api = {
                host: {},
                process: function(ops) {
                    var self = this;
                    this.xhr = null;
                    if(window.ActiveXObject) { this.xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
                    else if(window.XMLHttpRequest) { this.xhr = new XMLHttpRequest(); }
                    if(this.xhr) {
                        this.xhr.withCredentials = true;
                        this.xhr.onreadystatechange = function() {
                            if(self.xhr.readyState == 4 && self.xhr.status == 200) {
                                var result = self.xhr.responseText;
                                if(ops.json === true && typeof JSON != 'undefined') {
                                    result = JSON.parse(result);
                                }
                                self.doneCallback && self.doneCallback.apply(self.host, [result, self.xhr]);
                            } else if(self.xhr.readyState == 4) {
                                self.failCallback && self.failCallback.apply(self.host, [self.xhr]);
                            }
                            self.alwaysCallback && self.alwaysCallback.apply(self.host, [self.xhr]);
                        }
                    }
                    if(ops.method == 'get') {
                        this.xhr.open("GET", ops.url + getParams(ops.data, ops.url), true);
                    } else {
                        this.xhr.open(ops.method, ops.url, true);
                        this.setHeaders({
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-type': 'application/x-www-form-urlencoded'
                        });
                    }
                    if(ops.headers && typeof ops.headers == 'object') {
                        this.setHeaders(ops.headers);
                    }
                    setTimeout(function() {
                        ops.method == 'get' ? self.xhr.send() : self.xhr.send(getParams(ops.data));
                    }, 20);
                    return this;
                },
                done: function(callback) {
                    this.doneCallback = callback;
                    return this;
                },
                fail: function(callback) {
                    this.failCallback = callback;
                    return this;
                },
                always: function(callback) {
                    this.alwaysCallback = callback;
                    return this;
                },
                setHeaders: function(headers) {
                    for(var name in headers) {
                        this.xhr && this.xhr.setRequestHeader(name, headers[name]);
                    }
                }
            }
            return api.process(ops);
        }
    }


    function addToDomAsScript(string){
        var s = document.createElement('script');
        s.type = 'text/javascript';
        var code = string;

        try {
            s.appendChild(document.createTextNode(code));
            document.body.appendChild(s);
        } catch (e) {
            s.text = code;
            document.body.appendChild(s);
        }
    }
    
    //Build pixel query params.
    var pixelData = {};
    pixelData.url = document.URL;
    if(token && token!=""){
        pixelData.token = token
    }

    //Make Request to pixel
    Ajax.request({
        url: sgConfig.domain + '/pixel',
        method: 'get',
        data: pixelData,
        headers: {
            'Content-type': 'text/javascript'
        }
    })
    .done(function(result) {
        sgDebug("done", result);
        if(result !== ""){
            //Check to see if it's a JSON response or a snippet to inject
            if(result.charAt(0)=="{"){
                sgDebug(result);
            }else{
                addToDomAsScript(result);    
            }
            
        }
    })
    .fail(function(xhr) {
        sgDebug("fail");
    })
    .always(function(xhr) {
        sgDebug("always");
        sgDebug(window._sgpre);
    })


})(window);
