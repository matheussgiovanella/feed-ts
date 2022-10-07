import styles from './index.module.css'

import { ThumbsUp, Trash } from 'phosphor-react'

import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR'
import { useState } from 'react';

interface Content
{
    type : string
    content : string
}

export interface DeleteComment
{
    id : number,
    avatar : string,
    name : string,
    publishedAt : string,
    content : Content[],
    likes : number
}

export interface Comment
{
    id : number
    avatar : string
    name : string
    publishedAt : string
    content : Content[]
    likes : number
}

interface CommentProps
{
    comment : Comment
    deleteComment : ({} : DeleteComment) => void
}

export const Comment = ({comment, deleteComment} : CommentProps) =>
{
    const {id, avatar, name, publishedAt, content, likes} = comment

    const [likesNumber, setLikes] = useState(likes);

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

    const handleDeleteComment = () =>
    {
        deleteComment(
            {
                id: id,
                avatar: avatar,
                name: name,
                publishedAt: publishedAt,
                content: [
                    {
                        type: content[0].type,
                        content: content[0].content
                    }
                ],
                likes: likes
            }
        );
    }

    const handleNewLike = () =>
    {
        setLikes(likesNumber + 1);
    }

    return (
        <div className={ styles.comment }>
            <article>
                <img src={ avatar }/>

                <div className={ styles.text }>
                    <header>
                        <div>
                            <strong>{ name }</strong>
                            <time title={ publishDateFormatted }>{ publishDateRelativeToNow }</time>
                        </div>

                        <a onClick={handleDeleteComment}><i className="fa-regular fa-trash-can"></i></a>
                    </header>
                    <span>
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
                    </span>
                </div>
            </article>
            
            <div className={ styles.like }>
                <a onClick={handleNewLike}>
                    <i className="fa-regular fa-thumbs-up"></i>
                    <span>{ likesNumber }</span>
                </a>
            </div>
        </div>
    )
}