import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Hexagon from './hexagon';

const DataMarkup = {
  MATCHES: [{
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
  }],
  PREFIXES: [{
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
  }],
  INDEXES: [-2, -1, 0, 1, 2],
};

function Main() {
  const [positionScroll, setPositionScroll] = useState(0);

  function getMarkupEventsList(matchesRenderData) {
    return (
      <AnimatePresence initial={false}>
        {matchesRenderData.MATCHES.map((match, i) => (
          <motion.li
            key={`${match.id}`}
            className={`main__event main__event--${matchesRenderData.PREFIXES[i].MAIN_EVENT}`}
            onClick={() => setPositionScroll(matchesRenderData.INDEXES[i])}
            layoutId={`${match.place}${match.date}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hexagon
              match={match}
              prefix={matchesRenderData.PREFIXES[i].HEXAGON}
              isMain={matchesRenderData.PREFIXES[i].HEXAGON === 'main'}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    );
  }

  function getMatchesRenderData() {
    const invertPosition = positionScroll * -1;

    const dateMarkup = {
      MATCHES: [],
      PREFIXES: [],
      INDEXES: [],
    };

    if (positionScroll === 0) {
      return DataMarkup;
    }

    function cutTopMatches() {
      dateMarkup.MATCHES = DataMarkup.MATCHES.slice(0, positionScroll);
      dateMarkup.PREFIXES = DataMarkup.PREFIXES.slice(invertPosition);
      dateMarkup.INDEXES = DataMarkup.INDEXES.slice(0, positionScroll);
    }

    function cutDownMatches() {
      dateMarkup.MATCHES = DataMarkup.MATCHES.slice(positionScroll);
      dateMarkup.PREFIXES = DataMarkup.PREFIXES.slice(0, invertPosition);
      dateMarkup.INDEXES = DataMarkup.INDEXES.slice(positionScroll);
    }

    if (positionScroll < 0) {
      cutTopMatches();
    }

    if (positionScroll > 0) {
      cutDownMatches();
    }

    return (dateMarkup);
  }

  function handleWheel(evt) {
    if (evt.deltaY > 0) {
      if (positionScroll < 2) {
        setPositionScroll(positionScroll + 1);
      }
    } else if (positionScroll > -2) {
      setPositionScroll(positionScroll - 1);
    }
  }

  return (
    <main className="main">
      <ul
        className="main__events"
        onWheel={handleWheel}
      >
        {getMarkupEventsList(getMatchesRenderData())}
      </ul>
    </main>
  );
}

export default Main;
