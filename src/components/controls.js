import xs from 'xstream';
import {div, button, input} from '@cycle/dom';

export default function Controls(sources) {
  const play$ = sources.DOM.select('.play').events('click');
  const pause$ = sources.DOM.select('.pause').events('click');
  const prev$ = sources.DOM.select('.prev').events('click');
  const next$ = sources.DOM.select('.next').events('click');

  const vdom$ = xs.combine(sources.player$, sources.tracks$)
    .map(([state, tracks]) => {
      const currentIndex = state.track
        ? tracks.findIndex(x => x.id === state.track.id) : -2;

      const volume$ = sources.DOM.select('.volume')
        .events('input')
        .map(ev => ev.target.value);

      const volumeValue = state.volume.gain.value * 100;

      const res$ = xs.merge(
        play$.map(x => state.track),
        next$.map(x => tracks[currentIndex + 1]),
        prev$.map(x => tracks[currentIndex - 1])
      );

      if (!state.track) {
        return {
          DOM: xs.of(1)
            .map(_ =>
              div([
                'nothing is playing'
              ])),
          play: res$
        };
      }

      return {
        DOM: xs.of(volumeValue)
          .map(value =>
            div([
              state.track.title,
              'is playing!!!',
              button('.play', [
                'PLAY!!!'
              ]),
              button('.pause', [
                'PAUSE!!!!!'
              ]),
              button('.prev', [
                'PREV'
              ]),
              button('.next', [
                'NEXT'
              ]),
              input('.volume', { attrs: { type: 'range', min: 0, max: 100, value } }),
              value
            ])),
        play: xs.merge(
          res$.map(x => ({ type: 'play_track', track: x })),
          volume$.map(x => ({ type: 'volume', value: x }))
        )
      };
    })
  const sinks = {
    DOM: vdom$.map(({ DOM }) => DOM).flatten(),
    play: vdom$.map(({ play }) => play).flatten()
  };

  return sinks;
}
