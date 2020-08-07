import React, { Component, Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { AppFooter, AppSidebar } from '@coreui/react';
import { Container } from 'reactstrap';
import SpinnerWait from "../SpinnerWaitComponent";
import Header from "./Header";
import Footer from "./Footer";
import AuthService from "../../utils/AuthService";
import AppliedRoute from '../../routes/AppliedRoute';
import routes from '../../routes/routes';


class BaseApp extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        if (!this.Auth.loggedIn()) {
            if (this.props.location.pathname === '/mi_perfil' || this.props.location.pathname === '/profile') {
                this.internalLogout('/login');
            } }
        if(this.Auth.getRole() !== 'admin'){
            if (this.props.location.pathname.includes('/new') || this.props.location.pathname === '/accept_auction' ){
                this.internalLogout('/home');
            }
        }
        this.state = {
            isAuthenticated: this.Auth.loggedIn()
        };
        this.signIn = this.signIn.bind(this);
    }

    signIn() {
        this.setState({isAuthenticated: this.Auth.loggedIn()});
    }

    signOut(e) {
        e.preventDefault();
        this.internalLogout();
    }

    internalLogout(path) {
        // this.setState( {userHasAuthenticated: false});
        this.Auth.logout();
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <Suspense fallback={<SpinnerWait />}>
                        <Header onLogout={(e) => this.signOut(e)} isAuthenticated={this.state.isAuthenticated}/>
                    </Suspense>
                </div>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <Suspense fallback={<SpinnerWait />} />
                    </AppSidebar>
                    <main className="main">
                        <Container fluid className="m-0 p-0">
                            <Suspense fallback={<SpinnerWait />}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <AppliedRoute //Transformed Route into AppliedRoutes
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                component={route.component}
                                            />
                                        ) : null;
                                    })}
                                    <Redirect from="/" to="/home" />
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>
                <AppFooter>
                    <Suspense fallback={<SpinnerWait />}>
                        <Footer />
                    </Suspense>
                </AppFooter>
            </div>
        )
    }
}


export default BaseApp;