import './footer.scss'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="contacts footer__contacts">
          <h2 className="contacts__title">Контакты службы поддержки</h2>
          <a href="mail:example@mail.ru" className="mail contacts__item">
            example@mail.ru
          </a>
          <a href="tel:+71234567890" className="phone contacts__item">
            +7 (123) 456-78-90
          </a>
        </div>
        <div className="social footer__social">
          <a className="social__item" href="/">
            <i className="icon-vk"></i>
          </a>
          <a className="social__item" href="/">
            <i className="icon-telegram"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
