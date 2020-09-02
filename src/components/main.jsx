import React, { useState } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';

import Hexagon from './hexagon';

const DirectionScroll = {
  TOP: 'TOP',
  DOWN: 'DOWN',
};

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
};

function Main() {
  const [positionScroll, setPositionScroll] = useState(0);
  const [dataMarkup, setDataMarkup] = useState(DataMarkup);

  function getMarkupEventsList() {
    console.log(positionScroll)

    return (
      dataMarkup.MATCHES.map((match, i) => (
        <motion.li
          key={`${match.id}`}
          className={`main__event main__event--${dataMarkup.PREFIXES[i].MAIN_EVENT}`}
          layoutId={`${match.place}${match.date}`}
          transition={{ duration: 1 }}
        >
          <Hexagon
            match={match}
            prefix={dataMarkup.PREFIXES[i].HEXAGON}
            isMain={dataMarkup.PREFIXES[i].HEXAGON === 'main'}
          />
        </motion.li>
      ))
    );
  }

  function getMatchesListScroll(direction) {
    const COUNT_SHOW_MATCHES = 5;

    const isScrollDown = direction === DirectionScroll.DOWN;
    const isScrollTop = direction === DirectionScroll.TOP;

    const nextPositionScrollAboveZero = positionScroll + (isScrollTop ? 1 : -1);
    const nextPositionScrollBelowZero = positionScroll * -1 + (isScrollTop ? -1 : 1);

    let matchesMarkup;
    let prefixesMarkup;

    function cutTopMatches(nextPositionScroll) {
      matchesMarkup = DataMarkup.MATCHES.filter((el, i) => (
        i < COUNT_SHOW_MATCHES - nextPositionScroll
      ));
      prefixesMarkup = DataMarkup.PREFIXES.slice(nextPositionScroll);
    }

    function cutDownMatches(nextPositionScroll) {
      matchesMarkup = DataMarkup.MATCHES.slice(nextPositionScroll);
      prefixesMarkup = DataMarkup.PREFIXES.filter((el, i) => (
        i < COUNT_SHOW_MATCHES - nextPositionScroll
      ));
    }

    if (isScrollTop) {
      if (positionScroll < 0) {
        cutTopMatches(nextPositionScrollBelowZero);
      } else {
        cutDownMatches(nextPositionScrollAboveZero);
      }
    }

    if (isScrollDown) {
      if (positionScroll > 0) {
        cutDownMatches(nextPositionScrollAboveZero);
      } else {
        cutTopMatches(nextPositionScrollBelowZero);
      }
    }

    setPositionScroll(isScrollTop ? positionScroll + 1 : positionScroll - 1);

    setDataMarkup({
      MATCHES: matchesMarkup,
      PREFIXES: prefixesMarkup,
    });
  }

  function handleToggle(evt) {
    if (evt.deltaY > 0) {
      if (positionScroll < 2) {
        getMatchesListScroll(DirectionScroll.TOP);
      }
    } else if (positionScroll > -2) {
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
          {getMarkupEventsList()}
        </ul>
      </AnimateSharedLayout>
    </main>
  );
}

export default Main;
