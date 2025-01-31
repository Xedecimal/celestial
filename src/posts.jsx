import React from 'react'
import PostList from './post-list'
import LoadingIcon from './loading-icon.gif'

class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            page: 1,
            getPosts: true,
            controller: false
        }
        this.getMorePosts = this.getMorePosts.bind(this)
    }

    componentWillUnmount() {
        this.getMorePosts = null
    }

    componentDidMount() {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0)
        }

        this.getMorePosts()
    }

    getMorePosts() {
        let totalPages

        this.setState({page: this.state.page + 1})

        fetch(CelestialSettings.URL.api + '/posts/?page=' + this.state.page)
            .then(response => {
                for (const pair of response.headers.entries()) {
                    // getting the total number of pages
                    if (pair[0] == 'x-wp-totalpages') {
                        totalPages = pair[1]
                    }

                    if (this.state.page >= totalPages) {
                        this.setState({getPosts: false})
                    }
                }
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response.json()
            })
            .then(results => {
                const allPosts = this.state.posts.slice()
                results.forEach(single => {
                    allPosts.push(single)
                })
                this.setState({posts: allPosts})
            })
            .catch(error => {
                console.log(
                    'There has been a problem with your fetch operation: ' + error.message
                )
            })
    }

    render() {
        if (!this.state.posts.length === 0) {
            return <img src={LoadingIcon} alt="loader active gif" id="loader"/>
        }
        return (
            <div>
                <div className="container">
                    <h1 className="posts-title">Posts</h1>
                    <PostList posts={this.state.posts}/>
                </div>
            </div>
        )
    }
}

export default Posts
