import styles from './index.module.css'

interface UserProps
{
    cover : string
    avatar : string
    name : string
    description : string
}

export const Sidebar = ({cover, avatar, name, description} : UserProps) =>
{
    return (
        <aside className={ styles.sidebar }>
            <img className={ styles.cover } src={ cover } />

            <div className={ styles.profile }>
                <img className={ styles.avatar } src={ avatar } />

                <div className={ styles.description }>
                    <strong>{ name }</strong>
                    <span>{ description }</span>
                </div>
            </div>
        </aside>
    )
}