import React from 'react';

function Header() {
  return (
    <header className="header">
      <a href="#" className="logo">
        Билеты и абонементы
      </a>
      <nav className="header__navigation">
        <ul className="site-navigation">
          <li className="site-navigation__item">
            <a href="#">
              Как купить?
            </a>
          </li>
          <li className="site-navigation__item">
            <a href="#">
              Правила
            </a>
          </li>
          <li className="site-navigation__item">
            <a href="#">
              Возврат билета
            </a>
          </li>
        </ul>
        <ul className="user-navigation">
          <li className="user-navigation__item">
            <a href="#">
              Войти
            </a>
          </li>
          <li className="user-navigation__item">
            <a href="#">
              Меню
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
