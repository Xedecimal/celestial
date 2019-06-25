import React from 'react'
import LoadingIcon from './loading-icon.gif'
import GitHubCalendar from 'github-calendar'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        this.fetchData()
        GitHubCalendar('#cont', "Xedecimal")
    }

    fetchData = () => {
        fetch(CelestialSettings.URL.api + '/pages?slug=home')
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response.json()
            })
            .then(res => {
                this.setState({post: res[0]})
            })
    }

    renderPosts() {
        return pug`
            article.card: .card-body
                h4.card-title ${this.state.post.title.rendered}
                p.card-text(dangerouslySetInnerHTML={
                        __html: this.state.post.content.rendered
                    })`
    }

    renderEmpty() {
        return <img src={LoadingIcon} alt="loader gif" className="active" id="loader"/>
    }

    render() {
        return pug`
            .container.post-entry
                ${this.state.post.title ? this.renderPosts() : this.renderEmpty()}
                h4 Github Contributions
                #cont`
    }
}

export default Home
