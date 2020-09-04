import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Hexagon from './hexagon';
import SideLabel from './side-label';

const ActionType = {
  CLICK: 'CLICK',
  SCROLL_TOP: 'SCROLL_TOP',
  SCROLL_DOWN: 'SCROLL_DOWN',
};

const COUNT_SHOW_MATCH = 5;

const MATCHES = [{
  id: 1,
  date: '30 июля',
  time: '9.00',
  place: 'Стадион - Торпедо',
  rivalFirst: 'Динамо',
  rivalSecond: 'Бобруйск',
}, {
  id: 2,
  date: '5 августа',
  time: '21.00',
  place: 'Стадион - Локомотив',
  rivalFirst: 'ЦСКА',
  rivalSecond: 'Арсенал',
}, {
  id: 3,
  date: '11 августа',
  time: '23.00',
  place: 'Стадион - Лужники',
  rivalFirst: 'Луч',
  rivalSecond: 'Эфиопия',
}, {
  id: 4,
  date: '17 августа',
  time: '21.00',
  place: 'Стадион - Тамбов',
  rivalFirst: 'Анжи',
  rivalSecond: 'Крыжопинск',
}, {
  id: 5,
  date: '3 сентября',
  time: '16.00',
  place: 'Стадион - Лужники',
  rivalFirst: 'Крылья советов',
  rivalSecond: 'Ахмад',
}, {
  id: 33,
  date: '10 сентября',
  time: '23.00',
  place: 'Стадион - Волга',
  rivalFirst: 'Волга',
  rivalSecond: 'Зенит',
}, {
  id: 43,
  date: '16 сентября',
  time: '21.00',
  place: 'Стадион - Рим',
  rivalFirst: 'Реал',
  rivalSecond: 'Торпедо',
}, {
  id: 53,
  date: '28 сентября',
  time: '16.00',
  place: 'Стадион - Киев',
  rivalFirst: 'Динамо',
  rivalSecond: 'Шахтер',
}];

const PREFIXES = [{
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
}];

const SideLabePrefix = {
  LEFT: 'left',
  RIGHT: 'right',
};

function Main() {
  const [matches, setMatches] = useState(MATCHES.slice(0, COUNT_SHOW_MATCH));
  const [mainMatch, setMainMatch] = useState(matches[2]);
  const [prefixes, setPrefixes] = useState(PREFIXES);

  function scrollTo(action, matchId = mainMatch.id) {
    const MAIN_MATCH_INDEX = MATCHES.findIndex((match) => matchId === match.id);

    let matchesForRender;
    let nextFirstMatchIndex;

    const isClick = action === ActionType.CLICK;

    if (isClick) {
      nextFirstMatchIndex = MAIN_MATCH_INDEX - 2;
    } else {
      const isScrollTop = action === ActionType.SCROLL_TOP;
      nextFirstMatchIndex = isScrollTop ? MAIN_MATCH_INDEX - 1 : MAIN_MATCH_INDEX - 3;
    }

    const NEXT_LAST_RENDER_MATCH = nextFirstMatchIndex + COUNT_SHOW_MATCH;

    if (nextFirstMatchIndex >= 0) {
      matchesForRender = MATCHES.slice(nextFirstMatchIndex, NEXT_LAST_RENDER_MATCH);

      const NEXT_MAIN_MATCH = matchesForRender[2];

      setMainMatch(NEXT_MAIN_MATCH);
    } else {
      matchesForRender = MATCHES.slice(0, COUNT_SHOW_MATCH + nextFirstMatchIndex);

      const NEXT_MAIN_MATCH = matchesForRender[2 + nextFirstMatchIndex];

      setMainMatch(NEXT_MAIN_MATCH);
    }

    setMatches(matchesForRender);

    switch (true) {
      case (nextFirstMatchIndex < 0):
        setPrefixes(PREFIXES.slice(nextFirstMatchIndex * -1));
        break;

      default:
        setPrefixes(PREFIXES);
    }
  }

  function getMarkupEventsList() {
    return (
      <AnimatePresence initial={false}>
        {matches.map((match, i) => (
          <motion.li
            key={`${match.id}`}
            className={`main__event main__event--${prefixes[i].MAIN_EVENT}`}
            onClick={() => scrollTo(ActionType.CLICK, match.id)}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            layoutId={`${match.place}${match.date}`}
            transition={{ duration: 1 }}
          >
            <Hexagon
              match={match}
              prefix={prefixes[i].HEXAGON}
              isMain={prefixes[i].HEXAGON === 'main'}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    );
  }

  function handleWheel(evt) {
    const isFirstMatch = mainMatch.id === MATCHES[0].id;
    const isLastMatch = mainMatch.id === MATCHES.slice(-1)[0].id;

    if (evt.deltaY > 0 && !isLastMatch) {
      scrollTo(ActionType.SCROLL_TOP);
    } else if (!isFirstMatch && evt.deltaY < 0) {
      scrollTo(ActionType.SCROLL_DOWN);
    }
  }

  return (
    <main className="main">
      <div className="main__wrapper">
        <SideLabel
          prefix={SideLabePrefix.LEFT}
          teamName={mainMatch.rivalFirst}
        />
        <ul
          className="main__events"
          onWheel={handleWheel}
        >
          {getMarkupEventsList()}
        </ul>
        <SideLabel
          prefix={SideLabePrefix.RIGHT}
          teamName={mainMatch.rivalSecond}
        />
      </div>
    </main>
  );
}

export default Main;
