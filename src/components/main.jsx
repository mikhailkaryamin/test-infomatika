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
  const [currentPositionTopScroll, setCurrentPositionTopScroll] = useState(0);
  const [currentPositionDownScroll, setCurrentPositionDownScroll] = useState(0);

  const [dataMarkup, setDataMarkup] = useState(DataMarkup);

  function getMarkupEventsList() {
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
          />
        </motion.li>
      ))
    );
  }

  function getMatchesListScroll(direction) {
    let matchesMarkup;
    let prefixesMarkup;

    if (direction === DirectionScroll.TOP) {
      if (currentPositionTopScroll < 0) {
        matchesMarkup = DataMarkup.MATCHES.filter((el, i) => (
          i < 5 + (currentPositionTopScroll * -1 - 1)
        ));
        prefixesMarkup = DataMarkup.PREFIXES.slice(currentPositionTopScroll * -1 - 1);
      } else {
        matchesMarkup = DataMarkup.MATCHES.filter((el, i) => i > currentPositionTopScroll);
        prefixesMarkup = DataMarkup.PREFIXES.filter((el, i) => i < 4 - currentPositionTopScroll);
      }

      setCurrentPositionTopScroll(currentPositionTopScroll + 1);
      setCurrentPositionDownScroll(currentPositionDownScroll - 1);

      setDataMarkup({
        MATCHES: matchesMarkup,
        PREFIXES: prefixesMarkup,
      });
    }

    if (direction === DirectionScroll.DOWN) {
      if (currentPositionDownScroll < 0) {
        matchesMarkup = DataMarkup.MATCHES.slice(currentPositionDownScroll * -1 - 1);
        prefixesMarkup = DataMarkup.PREFIXES.filter((el, i) => (
          i < 5 - (currentPositionDownScroll * -1 - 1)
        ));
      } else {
        matchesMarkup = DataMarkup.MATCHES.filter((el, i) => i < 4 - currentPositionDownScroll);
        prefixesMarkup = DataMarkup.PREFIXES.filter((el, i) => i > currentPositionDownScroll);
      }

      setCurrentPositionDownScroll(currentPositionDownScroll + 1);
      setCurrentPositionTopScroll(currentPositionTopScroll - 1);

      setDataMarkup({
        MATCHES: matchesMarkup,
        PREFIXES: prefixesMarkup,
      });
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
          {getMarkupEventsList()}
        </ul>
      </AnimateSharedLayout>
    </main>
  );
}

export default Main;
