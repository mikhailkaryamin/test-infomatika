import React, { useState } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';

import Hexagon from './hexagon';

const DirectionScroll = {
  TOP: 'TOP',
  DOWN: 'DOWN',
};

const MATCHES_LIST = [
  {
    id: 1,
    date: '30 июля',
    time: '9.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }, {
    id: 2,
    date: '12 августа',
    time: '21.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }, {
    id: 3,
    date: '11 сентября',
    time: '23.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }, {
    id: 4,
    date: '17 сентября',
    time: '21.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }, {
    id: 5,
    date: '28 сентября',
    time: '16.00',
    place: 'Стадион',
    rivalFirst: 'Соперник1',
    rivalSecond: 'Соперник2',
  }];

const PREFIXES = [
  {
    MAIN_EVENT: 'first',
    HEXAGON: 'small',
  },
  {
    MAIN_EVENT: 'second',
    HEXAGON: 'middle',
  },
  {
    MAIN_EVENT: 'third',
    HEXAGON: 'main',
  },
  {
    MAIN_EVENT: 'fourth',
    HEXAGON: 'middle',
  },
  {
    MAIN_EVENT: 'fifth',
    HEXAGON: 'small',
  },
];

function getMarkupEventsList(matches, prefixes) {
  console.log(matches, prefixes)
  return (
    matches.map((match, i) => (
      <motion.li
        key={`${match.id}`}
        className={`main__event main__event--${prefixes[i].MAIN_EVENT}`}
        layoutId={`${match.place}${match.date}`}
        transition={{ duration: 1 }}
      >
        <Hexagon
          match={match}
          prefix={prefixes[i].HEXAGON}
        />
      </motion.li>
    ))
  );
}

function Main() {
  const [matches, setMatches] = useState(MATCHES_LIST);
  const [currentDirection, setCurrentDirection] = useState('');
  const [prefixes, setPrefixes] = useState(PREFIXES);
  const [startMatches, setStartMatches] = useState(0);
  const [finishMatches, setFinishMatches] = useState(5);
  const [startPrefix, setStartPrefix] = useState(0);
  const [finishPrefix, setFinishPrefix] = useState(5);
  const [countMatchesDown, setCountMatchesDown] = useState(0);

  function getMatchesListScroll(direction) {
    switch (true) {
      case direction === DirectionScroll.TOP:

        setCurrentDirection(DirectionScroll.TOP);
        setPrefixes(PREFIXES.slice(0, finishPrefix - 1));
        setMatches(MATCHES_LIST.slice(startMatches + 1, 5));

        setStartMatches(startMatches + 1);
        setFinishMatches(finishMatches + 1);
        setStartPrefix(startPrefix - 1);
        setFinishPrefix(finishPrefix - 1);

        break;

      case direction === DirectionScroll.DOWN:

        setCurrentDirection(DirectionScroll.DOWN);
        setPrefixes(PREFIXES.slice(startPrefix + 1, 5));
        setMatches(MATCHES_LIST.slice(0, finishMatches - 1));

        setStartMatches(startMatches - 1);
        setFinishMatches(finishMatches - 1);
        setStartPrefix(startPrefix + 1);
        setFinishPrefix(finishPrefix + 1);

        break;

      default:
        setMatches(MATCHES_LIST);
    }
  }

  function handleToggle(evt) {
    if (evt.deltaY > 0) {
      getMatchesListScroll(DirectionScroll.TOP);
    } else {
      getMatchesListScroll(DirectionScroll.DOWN);
    }
  }

  return (
    <main className="main">
      <AnimateSharedLayout>
        <ul
          className="main__events"
          onWheel={handleToggle}
        >
          {getMarkupEventsList(matches, prefixes)}
        </ul>
      </AnimateSharedLayout>
    </main>
  );
}

export default Main;
