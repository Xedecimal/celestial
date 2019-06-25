import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Header from './header'
import Footer from './footer'
import Home from './home'
import Posts from './posts'
import Post from './post'
import Page from './page'

require('./style.scss')
require('./style.styl')

const App = () => <div id="page-inner">
    <Header/>
    <main id="content">
        <Switch>
            <Route exact path={CelestialSettings.path} component={Home}/>
            <Route exact path={CelestialSettings.path + 'posts'} component={Posts}/>
            <Route exact path={CelestialSettings.path + 'posts/:slug'} component={Post}/>
            <Route exact path={CelestialSettings.path + ':slug'} component={Page}/>
        </Switch>
    </main>
    <Footer/>
</div>

const routes = <Router>
    <Route path="/" component={App}/>
</Router>

render(routes, document.getElementById('page'))
