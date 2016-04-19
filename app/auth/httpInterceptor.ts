HttpHeaderInterceptorFactory.$inject = ['$cookies'];

function HttpHeaderInterceptorFactory($cookies) {
    var service = {
        request: request
    };

    return service;

    function request(config) {
        var userToken = $cookies.get('xrAuthCookie');

        if (typeof userToken !== 'undefined') {
            config.headers['Authorization'] = 'Bearer ' + userToken;
        }

        return config;
    }
}

export {HttpHeaderInterceptorFactory};