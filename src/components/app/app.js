import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';

import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";
import {LoginPage, PeoplesPage, PlanetsPage, SecretPage, StarshipsPage} from "../pages";

import { BrowserRouter as Router, Route} from "react-router-dom";

import './app.css';
import {StarshipDetails} from "../sw-components";

export default class App extends Component {


    state = {
        showRandomPlanet: true,
        swapiService: new SwapiService(),
        isLoggedIn : false
    };

    onLogin = () => {
        this.setState(({isLoggedIn: true}));
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const service = swapiService instanceof SwapiService ? SwapiService : SwapiService;
            return { swapiService: new service() }
        })
    };

    render() {

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>
                            { planet }
                            <Route path="/" render={ () => <h3>Hello world</h3> } exact/>
                            <Route path="/people" component={PeoplesPage}/>
                            <Route path="/planets/:id?" component={PlanetsPage}/>
                            <Route path="/starships" component={StarshipsPage} exact/>
                            <Route path="/starships/:id" render={ ({match, location, history})=>
                                {
                                   return <StarshipDetails itemId={match.params.id}/>
                                }}
                            />
                            <Route path='/secret/' render={ () => {
                                return <SecretPage isLoggedIn={this.state.isLoggedIn}/>
                            }}/>
                            <Route path='/login/' render={ () => {
                                return <LoginPage isLoggedIn={this.state.isLoggedIn} onLogin={this.onLogin}/>
                            }}/>

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
