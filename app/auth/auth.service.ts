
import IJwtHelper = angular.jwt.IJwtHelper;
import ICookiesService = angular.cookies.ICookiesService;
import IHttpService = angular.IHttpService;
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
import IHttpPromise = angular.IHttpPromise;
import IPromise = angular.IPromise;

export interface User {
    username?: string
}

export class AuthService {

    static $inject = ['jwtHelper', 'Urls', '$cookies', '$http'];

    constructor(private jwtHelper: IJwtHelper, private Urls, private $cookies: ICookiesService, private $http: IHttpService) {}

    anyOneLoggedIn(): boolean {
        var authCookie = this.getUserToken();
        return (typeof authCookie !== 'undefined');
    }

    getCurrentUser(): User {
        var token = this.getUserToken();
        var tokenPayload = this.jwtHelper.decodeToken(token) as User;
        return tokenPayload;
    }

    getUserToken(): string {
        return this.$cookies.get('xrAuthCookie');
    }

    login(username, password): IPromise<void> {
        var userLogin = {
            username: username,
            password: password
        };

        return this.$http.post(this.Urls.baseApi + 'login', userLogin)
            .then((loginObj: IHttpPromiseCallbackArg<any>) => {
                this.$cookies.put('xrAuthCookie', loginObj.data.token);
            });
    }

    logout(): void {
        this.$cookies.remove('xrAuthCookie');
    }

    register(user): IPromise<void> {
        return this.$http.post(this.Urls.baseApi + 'register', user)
            .then((registerObj: IHttpPromiseCallbackArg<any>) => {
                this.$cookies.put('xrAuthCookie', registerObj.data.token);
            });
    }
}