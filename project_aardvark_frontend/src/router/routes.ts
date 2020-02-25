export module Routes {
  export enum Name {
    Home = 'home',
    Slates = 'slates',
    NotFound = 'notFound'
  }

  export enum Path {
    Home = '/',
    SignUp = '/sign_up',
    SignIn = '/sign_in',
    Slates = '/slates',
    NotFound = '*'
  }
}
