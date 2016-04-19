function interceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('httpHeaderInterceptor');
}

export { interceptorConfig };