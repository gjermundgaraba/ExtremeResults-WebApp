
export function interceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('httpHeaderInterceptor');
}