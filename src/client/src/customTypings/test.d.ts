interface ICookies {
    remove: (string) => void;
    CookiesProvider: any;
}

declare module 'react-cookie' {
    const Cookies : ICookies}


