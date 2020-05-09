import * as _ from 'lodash';
import { MediaPlaybackHandlersT } from '../types/mediaSession.type';

export const isMediaSessionAvailable = () => _.has(navigator, ['mediaSession', 'setActionHandler']);

export const setMetadata = (songMetadata: { artist: string, title: string }) => {
  if (isMediaSessionAvailable()) {
    // @ts-ignore
    navigator.mediaSession.metadata = new MediaMetadata({
      title: songMetadata.title,
      artist: songMetadata.artist
    });
  }
};

export const setPlaybackEvents = (options: MediaPlaybackHandlersT) => {
  const { onPreviousTrack, onNextTrack, onPlay, onPause, onSeekBackward, onSeekForward } = Object.assign({}, {
    onPreviousTrack: _.noop,
    onNextTrack: _.noop,
    onPlay: _.noop,
    onPause: _.noop,
    onSeekBackward: _.noop,
    onSeekForward: _.noop
  }, options);

  // @ts-ignore
  if (isMediaSessionAvailable()) {
    // @ts-ignore
    navigator.mediaSession.setActionHandler('play', onPlay);
    // @ts-ignore
    navigator.mediaSession.setActionHandler('pause', onPause);
    // @ts-ignore
    navigator.mediaSession.setActionHandler('seekbackward', onSeekBackward);
    // @ts-ignore
    navigator.mediaSession.setActionHandler('seekforward', onSeekForward);
    // @ts-ignore
    navigator.mediaSession.setActionHandler('previoustrack', onPreviousTrack);
    // @ts-ignore
    navigator.mediaSession.setActionHandler('nexttrack', onNextTrack);
  }
};
