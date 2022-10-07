import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Post } from './components/Post/index'

import styles from './App.module.css'
import './global.css'

import posts from './posts.json'

const user =
{
    cover: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80",
    avatar: "https://github.com/matheussgiovanella.png",
    name: "Matheus Staevie Giovanella",
    description: "I'm currently learning Vite + React"
}

const App = () =>
{
    return (
        <>
            <Header />

            <div className={ styles.content }>
                <Sidebar
                    cover={ user.cover }
                    avatar={ user.avatar }
                    name={ user.name }
                    description={ user.description }
                />

                { posts.map((post) =>
                    <Post
                        key={ post.id }
                        author={ post.author }
                        content={ post.content }
                        publishedAt={ post.publishedAt }
                        comments={ post.comments }
                    />
                ) }

            </div>
        </>
    )
}

export default App
