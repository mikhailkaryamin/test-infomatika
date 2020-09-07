import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Hexagon from './hexagon';
import SideLabel from './side-label';

const COUNT_SHOW_MATCH = 5;

const DirectionScroll = {
  TOP: 'TOP',
  DOWN: 'DOWN',
};

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

function Matches() {
  const [matchesForRender, setMatchesForRender] = useState(MATCHES.slice(0, COUNT_SHOW_MATCH));
  const [mainMatch, setMainMatch] = useState(matchesForRender[2]);
  const [prefixes, setPrefixes] = useState(PREFIXES);
  const [isAnimationComplete, setAnimationComplete] = useState(true);

  function setRenderData(index) {
    let nextFirstMatchIndex = index;

    const NEXT_LAST_MATCH_INDEX = nextFirstMatchIndex + COUNT_SHOW_MATCH;
    const NEXT_MAIN_MATCH = MATCHES[nextFirstMatchIndex + 2];

    if (nextFirstMatchIndex < 0) {
      nextFirstMatchIndex = 0;
    }

    const MATCHES_FOR_RENDER = MATCHES.slice(nextFirstMatchIndex, NEXT_LAST_MATCH_INDEX);
    const PREFIXES_FOR_RENDER = index < 0 ? PREFIXES.slice(index * -1) : PREFIXES.slice();

    setMainMatch(NEXT_MAIN_MATCH);
    setMatchesForRender(MATCHES_FOR_RENDER);
    setPrefixes(PREFIXES_FOR_RENDER);
  }

  function scrollTo(directionScroll) {
    const MAIN_MATCH_INDEX = MATCHES.findIndex((match) => mainMatch.id === match.id);
    const isScrollTop = directionScroll === DirectionScroll.TOP;
    const NEXT_FIRST_MATCH_INDEX = isScrollTop ? MAIN_MATCH_INDEX - 1 : MAIN_MATCH_INDEX - 3;

    setRenderData(NEXT_FIRST_MATCH_INDEX);
  }

  function onClickMatch(matchId) {
    const MAIN_MATCH_INDEX = MATCHES.findIndex((match) => matchId === match.id);
    const NEXT_FIRST_MATCH_INDEX = MAIN_MATCH_INDEX - 2;

    setRenderData(NEXT_FIRST_MATCH_INDEX);
  }

  function getMarkupEventsList() {
    return (
      <AnimatePresence initial={false}>
        {matchesForRender.map((match, i) => (
          <motion.li
            key={`${match.id}`}
            className={`matches__item matches__item--${prefixes[i].MAIN_EVENT}`}
            onClick={() => onClickMatch(match.id)}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            layoutId={`${match.place}${match.date}`}
            transition={{ duration: 0.8 }}
            onAnimationComplete={() => setAnimationComplete(true)}
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

  function onMouseWheel(evt) {
    const isFirstMatch = mainMatch.id === MATCHES[0].id;
    const isLastMatch = mainMatch.id === MATCHES.slice(-1)[0].id;

    if (evt.deltaY > 0 && !isLastMatch) {
      scrollTo(DirectionScroll.TOP);
      setAnimationComplete(false);
    } else if (!isFirstMatch && evt.deltaY < 0) {
      scrollTo(DirectionScroll.DOWN);
      setAnimationComplete(false);
    }
  }

  return (
    <>
      <SideLabel
        prefix={SideLabePrefix.LEFT}
        teamName={mainMatch.rivalFirst}
      />
      <ul
        className="matches"
        onWheel={(evt) => {
          if (isAnimationComplete) {
            onMouseWheel(evt);
          }
        }}
      >
        {getMarkupEventsList()}
      </ul>
      <SideLabel
        prefix={SideLabePrefix.RIGHT}
        teamName={mainMatch.rivalSecond}
      />
    </>
  );
}

export default Matches;
