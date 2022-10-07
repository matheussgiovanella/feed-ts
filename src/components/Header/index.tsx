import styles from './index.module.css'
import crieLogo from '../../assets/logo-crie-ti.png'

export const Header = () =>
{
    return (
        <header className={ styles.header }>
            <img src={ crieLogo } alt='Logotipo do Crie-TI' />
        </header>
    )
}