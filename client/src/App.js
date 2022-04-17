import './App.css';
import './harry.css';
import './xiyhu.css';
import  './App2.css';

import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import { AuthProvider } from './auth'


import {
    AppBanner,
    SplashScreen,
    ForgetPassword,
    RegisterScreen,
    Statusbar,
    HomeScreen,
<<<<<<< HEAD
    ViewScreen,
    HomeScreen2
=======
    ResetPassword
>>>>>>> refs/remotes/origin/main
} from './components'
import LoginScreen from './components/LoginScreen'
import CreateScreen from './components/CreateScreen'
import MessageScreen from './components/MessageScreen';
import ReadScreen from './components/ReadScreen';
import CreatePageBanner from './components/CreatePageBanner' ;
import MypageScreen from './components/MypageScreen';
import ForgotPassScreen from './components/ForgetPassScreen';
import ResetPassScreen  from './components/ResetPassScreen';

import ProfileScreen from './components/MypageProfile'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={SplashScreen} />
                        <Route path="/home/" exact component = {HomeScreen2} />
                        <Route path="/view/" exact component = {ViewScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/forgetPassword/" exact component={ForgetPassword}/>
                        <Route path="/resetpassword/" exact component={ResetPassword}/>
                        <Route path="/create/" exact component={CreateScreen} />
                        <Route path="/message/" exact component={MessageScreen} />
                        <Route path="/read/" exact component={ReadScreen} />
                        <Route path="/myPage/" exact component={MypageScreen}/>
                        <Route path="/requestPasswordReset/" exact component={ForgotPassScreen}/>
                        <Route path="/passwordReset/:token/:id" exact component={ResetPassScreen}/>
                        <Route path="/profile/" exact component={ProfileScreen}/>
                        
                        
                    </Switch>
                    
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App