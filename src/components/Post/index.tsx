import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './index.module.css'
import { Comment, DeleteComment } from '../Comment'

import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR'

interface Author
{
    name : string
    role : string
    avatarUrl : string
}

interface Content
{
    type : string
    content : string
}

interface PostProps
{
    author : Author
    content : Content[]
    publishedAt : string
    comments : Comment[]
}

export const Post = ({author, content, publishedAt, comments} : PostProps) =>
{
    const [commentsContent, setComments] = useState<Comment[]>(comments)
    const [newComment, setNewComment] = useState<Comment>(
        {
            id: 0,
            avatar: '',
            name: '',
            publishedAt: '',
            content:
            [
                {
                    type: '',
                    content: ''
                }
            ],
            likes: 0
        }
    )

    const publishDateFormatted = format(
        new Date(publishedAt), "d 'de' LLLL 'às' HH:mm'h' ",
            {
                locale: ptBr
            }
    )

    const publishDateRelativeToNow = formatDistanceToNow(
        new Date(publishedAt),
            {
                locale: ptBr,
                addSuffix: true,
            }
    )

    const handleCreateNewComment = (event : FormEvent) =>
    {
        event.preventDefault()
        setComments([...commentsContent, newComment])

        setNewComment(
            {
                id: 0,
                avatar: '',
                name: '',
                publishedAt: '',
                content:
                [
                    {
                        type: '',
                        content: ''
                    }
                ],
                likes: 0
            }
        )
    }

    const handleNewCommentChange = (event : ChangeEvent<HTMLTextAreaElement>) =>
    {
        const dateTime = getDate();

        setNewComment(
            {
                id: (commentsContent.length + 1),
                avatar: 'https://github.com/matheussgiovanella.png',
                name: 'Matheus Staevie Giovanella',
                publishedAt: dateTime,
                content:
                [
                    {
                        type: 'paragraph',
                        content: event.target.value
                    }
                ],
                likes: 0
            }
        )
    }

    const getDate = () => {
        const current = new Date()
        const cDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
        const cTime = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`
        const dateTime = `${cDate} ${cTime}`
        
        return dateTime
    }

    const deleteComment = (commentToDelete : Comment) =>
    {
        const newCommentListWithoutDelete = commentsContent.filter((comment) => {
            return comment.id !== commentToDelete.id;
        });
        setComments(newCommentListWithoutDelete);
    }

    return (
        <article className={ styles.post }>

            <header>
                <div className={ styles.profile }>
                    <img className={ styles.avatar } src={ author.avatarUrl } />

                    <div className={ styles.description }>
                        <strong>{ author.name }</strong>
                        <span>{ author.role }</span>
                    </div>
                </div>

                <time title={ publishDateFormatted } dateTime={ new Date(publishedAt).toISOString() }>
                    Publicado { publishDateRelativeToNow }
                </time>
            </header>

            <div className={ styles.content }>

                { content.map((line) =>
                {
                    switch (line.type)
                    {
                        case 'paragraph':
                            return <p>{ line.content }</p>
                        case 'link':
                            return <p><a href='#'>{ line.content }</a></p>
                        default:
                            return ''
                    }
                }) }

            </div>

            <div className={ styles.line }></div>

            <form className={ styles.feedback } onSubmit={ handleCreateNewComment }>
                <strong><label htmlFor='comment'>Deixe seu feedback</label></strong>

                <textarea name='comment' id='comment' value={newComment.content[0].content} onChange={handleNewCommentChange} required></textarea>
                <button type='submit'>Publicar</button>
            </form>

            { comments && commentsContent.map((comment) => 
                <Comment
                    key={comment.id}
                    comment={comment}
                    deleteComment={deleteComment}
                />
            ) }

        </article>
    )
}