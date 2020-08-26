import React from 'react';

const SITE_MENU_ITEMS = ['Как купить?', 'Правила', 'Возврат билета'];
const USER_NAVIGATION_ITEMS = [
  {
    prefix: 'sign-in',
    title: 'Войти',
    isHiddenTitle: false,
  },
  {
    prefix: 'menu',
    title: 'Меню',
    isHiddenTitle: true,
  },
];

function getMarkupSiteMenu() {
  return (
    SITE_MENU_ITEMS.map((item) => (
      <li key={item} className="site-navigation__item">
        <a className="header-link" href="/">
          {item}
        </a>
      </li>
    ))
  );
}

function getMarkupUserMenu() {
  return (
    USER_NAVIGATION_ITEMS.map((item) => (
      <li key={item.prefix} className={`user-navigation__item user-navigation__item--${item.prefix}`}>
        <a href="/" className={`header-link user-navigation__link user-navigation__link--${item.prefix}`}>
          <svg className="header-link__icon user-navigation__sign-in-icon" width="24" height="24" viewBox="0 0 24 24">
            <use xlinkHref={`#${item.prefix}`} />
          </svg>
          <span className={item.isHiddenTitle ? 'visually-hidden' : ''}>
            {item.title}
          </span>
        </a>
      </li>
    ))
  );
}

function Header() {
  return (
    <header className="header">
      <a href="/" className="logo header-link">
        Билеты и абонементы
      </a>
      <nav className="header__navigation">
        <ul className="site-navigation header__list">
          {getMarkupSiteMenu()}
        </ul>
        <ul className="user-navigation header__list header__list--user-menu">
          {getMarkupUserMenu()}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
