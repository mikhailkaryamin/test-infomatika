import React from 'react';

import Hexagon from './hexagon';

const MATCHES_LIST = [
  {
    date: '30 сентября',
    time: '9.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }, {
    date: '12 сентября',
    time: '21.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }, {
    date: '11 сентября',
    time: '23.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }, {
    date: '17 сентября',
    time: '21.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }, {
    date: '8 сентября',
    time: '16.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }];

function getMarkupEventsList() {
  return (
    MATCHES_LIST.map((match) => (
      <li key={`${match.place}${match.date}`} className="events__item">
        <Hexagon match={match} />
      </li>
    ))
  );
}

function Main() {
  return (
    <main className="page-main">
      <ul className="events">
        <Hexagon match={MATCHES_LIST[1]} />
      </ul>
    </main>
  );
}

export default Main;
