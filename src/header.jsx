import React from 'react'
import {Link} from 'react-router-dom'

let Menu = props => {
    let ret = []
    for (let link of props.menu) {
        ret.push(<Link key={link.ID}
            to={'/' + link.url.substr(CelestialSettings.URL.root.length)}
            className="nav-item nav-link active"
        >
            {link.title}
        </Link>)
    }
    return ret
}

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: []
        }
    }

    componentDidMount() {
        this.fetchMenu()
    }

    fetchMenu = () => {
        fetch(`${CelestialSettings.URL.api}/menu`)
            .then(response => response.json())
            .then(response => {
                this.setState({menu: response})
            })
    }

    render() {
        return <div className="container">
            <header id="masthead" className="site-header" role="banner">
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <h1 className="site-title">
                        <Link to="/"><img src="/wp-content/uploads/2019/03/X4.png" alt="X" />edecimal.net</Link>
                    </h1>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Menu menu={this.state.menu} />

                        </div>
                    </div>
                </nav>
            </header>
        </div>
    }
}

export default Header
