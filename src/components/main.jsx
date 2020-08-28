import React from 'react';

import Hexagon from './hexagon';

const MATCHES_LIST = [
  {
    date: '30 июля',
    time: '9.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }, {
    date: '12 августа',
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
    date: '28 сентября',
    time: '16.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }];

const PREFIXES = ['--first', '--second', '--third', '--fourth', '--fifth'];

function getMarkupEventsList() {
  return (
    MATCHES_LIST.map((match, i) => (
      <li key={`${match.place}${match.date}`} className={`main__event main__event${PREFIXES[i]}`}>
        <Hexagon match={match} />
      </li>
    ))
  );
}

function Main() {
  return (
    <main className="main">
      <ul className="main__events">
        {getMarkupEventsList()}
      </ul>
    </main>
  );
}

export default Main;
