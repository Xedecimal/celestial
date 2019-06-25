import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import LoadingIcon from './loading-icon.gif'

class PostList extends React.Component {
    renderPosts() {
        console.dir(this.props.posts)
        return this.props.posts.map((post, i) => {
            return <article className="col-md-4 card-outer" key={i}>
                <div className="card">
                    <div className="img-outer">
                        <Link to={'posts/' + post.slug}>
                            {post.featured_image_src &&
                            <img className="card-img-top" src={post.featured_image_src} alt="Featured Image"/>
                            }
                        </Link>
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">
                            <Link to={'/posts/' + post.slug}>{post.title.rendered}</Link>
                        </h4>
                        <p className="card-text">
                            <small className="text-muted">
                                {post.author_name} &ndash; {post.published_date}
                            </small>
                        </p>
                        <p dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
                    </div>
                </div>
            </article>
        })
    }

    renderEmpty() {
        return <img src={LoadingIcon} alt="loader gif" className="active" id="loader"/>
    }

    render() {
        if (!this.props.posts) {
            return <div>No posts.</div>
        }

        return <div className="posts-container">
            {this.props.posts.length ? this.renderPosts() : this.renderEmpty()}
        </div>
    }
}

export default PostList

PostList.propTypes = {
    posts: PropTypes.array.isRequired
}
