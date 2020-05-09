import * as _ from 'lodash';
import { MediaPlaybackHandlersT, MediaSession, MediaSessionAction, MediaSessionPlaybackState } from '../types/mediaSession.type';

export const isMediaSessionAvailable = () => _.has(navigator, ['mediaSession', 'setActionHandler']);

export const resolveMediaSession = () => _.get(navigator, 'mediaSession') as MediaSession;

export const setMetadata = (songMetadata: { artist: string, title: string }) => {
  if (isMediaSessionAvailable()) {
    resolveMediaSession().metadata = {
      title: songMetadata.title,
      artist: songMetadata.artist,
      album: '',
      artwork: []
    };
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

  if (isMediaSessionAvailable()) {
    resolveMediaSession().setActionHandler(MediaSessionAction.Play, onPlay);
    resolveMediaSession().setActionHandler(MediaSessionAction.Pause, onPause);
    resolveMediaSession().setActionHandler(MediaSessionAction.SeekBackward, onSeekBackward);
    resolveMediaSession().setActionHandler(MediaSessionAction.SeekForward, onSeekForward);
    resolveMediaSession().setActionHandler(MediaSessionAction.PreviousTrack, onPreviousTrack);
    resolveMediaSession().setActionHandler(MediaSessionAction.NextTrack, onNextTrack);
  }
};

export const setPlaybackState = (state: MediaSessionPlaybackState) => resolveMediaSession().playbackState = state;