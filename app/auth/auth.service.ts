
export class AuthService {

    static $inject = ['jwtHelper', 'Urls', '$cookies', '$http'];

    constructor(private jwtHelper, private Urls, private $cookies, private $http) {}

    anyOneLoggedIn() {
        var authCookie = this.getUserToken();
        return (typeof authCookie !== 'undefined');
    }

    getCurrentUser() {
        var token = this.getUserToken();
        var tokenPayload = this.jwtHelper.decodeToken(token);
        return tokenPayload;
    }

    getUserToken() {
        return this.$cookies.get('xrAuthCookie');
    }

    login(username, password) {
        var userLogin = {
            username: username,
            password: password
        };

        return this.$http.post(this.Urls.baseApi + 'login', userLogin)
            .then((loginObj) => {
                this.$cookies.put('xrAuthCookie', loginObj.data.token);
            });
    }

    logout() {
        this.$cookies.remove('xrAuthCookie');
    }

    register(user) {
        return this.$http.post(this.Urls.baseApi + 'register', user)
            .then((registerObj) => {
                this.$cookies.put('xrAuthCookie', registerObj.data.token);
            });
    }
}