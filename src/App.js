import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    VerticalNav,
    VerticalNavItem,
    VerticalNavMasthead,
    VerticalNavBrand,
} from 'patternfly-react';
import {
    Route, Redirect, withRouter, Switch,
} from 'react-router-dom';
import logo from './images/logo.svg';

import './App.css';

import Content from './Content';
import PullRequests from './components/PullRequests';
import PrivateRoute from './components/PrivateRoute';
import LoginWithRedirect from './components/LoginWithRedirect';
import OpenShiftLogo from './components/OpenShiftLogo';
import { NightlyOverview, NightlyType } from './components/NightlyRuns';

import pfBrand from './images/brand.svg';

const PRs = () => <Content><PullRequests /></Content>;
const Nighlies = () => <Content><NightlyOverview /></Content>;
const Jobs = () => <Content><h2>Jobs</h2></Content>;

class App extends Component {
    constructor() {
        super();
        this.menu = [
            {
                to: '/nightlies',
                title: 'Nighly runs',
                iconClass: 'fa fa-moon-o',
            },
            {
                to: '/prs',
                title: 'Pull Requests',
                iconClass: 'fa fa-code-fork',
            },
        ];
    }

    render() {
        const { history } = this.props;
        const vertNavItems = this.menu.map(item => (
            <VerticalNavItem
                key={item.to}
                title={item.title}
                iconClass={item.iconClass}
                active={history.location.pathname === item.to}
                onClick={() => {
                    history.push(item.to);
                }}
            />
        ));

        return (
            <div>
                <VerticalNav persistentSecondary={false}>
                    <VerticalNavMasthead>
                        <VerticalNavBrand titleImg={pfBrand} iconImg={logo} />
                    </VerticalNavMasthead>
                    {vertNavItems}
                </VerticalNav>

                <Switch>
                    <PrivateRoute path="/prs" component={PRs} />
                    <PrivateRoute path="/nightlies" component={Nighlies} />
                    <PrivateRoute path="/nightly/:nightlyTypeName" component={NightlyType} />
                    <Route path="/jobs" component={Jobs} />
                    <Route path="/login" component={LoginWithRedirect} />
                    <Redirect exact from="/" to="/nightlies" />
                </Switch>
                <div className="openshift-logo">{OpenShiftLogo()}</div>
            </div>
        );
    }
}

App.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
};

const RouteredApp = withRouter(App);
export default RouteredApp;
