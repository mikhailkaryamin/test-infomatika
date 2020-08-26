import React from 'react';

function Main() {
  return (
    <main className="page-main">
      <ul className="events">
        <li className="events__item">
          30 сентября
        </li>
        <li className="events__item">
          16 июля
        </li>
        <li className="events__item events__item--focus">
          <div className="rival-1">
            Соперник №1
          </div>
          26 июня
          <div className="rival-2">
            Соперник №2
          </div>
        </li>
        <li className="events__item">
          17 июня
        </li>
        <li className="events__item">
          30 мая
        </li>
      </ul>
    </main>
  );
}

export default Main;
