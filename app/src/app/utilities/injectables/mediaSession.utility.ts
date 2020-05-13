import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {
  MediaPlaybackHandlersT,
  MediaSessionAction,
  MediaSessionPlaybackState,
} from '../../types/mediaSession.type';

@Injectable()
export class MediaSessionUtility {
  // @ts-ignore
  isMediaSessionAvailable = () => {
    return window && window.navigator && 'mediaSession' in window.navigator;
  }

  setMetadata = (songMetadata: { artist: string, title: string }) => {
    if (this.isMediaSessionAvailable()) {
      // @ts-ignore
      navigator.mediaSession.metadata = new MediaMetadata({
        title: songMetadata.title,
        artist: songMetadata.artist,
        album: 'unknown',
        artwork: []
      });
    }
  }

  setPlaybackEvents = (options: MediaPlaybackHandlersT) => {
    const {onPreviousTrack, onNextTrack, onPlay, onPause, onSeekBackward, onSeekForward} = Object.assign({}, {
      onPreviousTrack: _.noop,
      onNextTrack: _.noop,
      onPlay: _.noop,
      onPause: _.noop,
      onSeekBackward: _.noop,
      onSeekForward: _.noop
    }, options);

    if (this.isMediaSessionAvailable()) {
      // @ts-ignore
      navigator.mediaSession.setActionHandler(MediaSessionAction.Play, onPlay);
      // @ts-ignore
      navigator.mediaSession.setActionHandler(MediaSessionAction.Pause, onPause);
      // @ts-ignore
      navigator.mediaSession.setActionHandler(MediaSessionAction.SeekBackward, onSeekBackward);
      // @ts-ignore
      navigator.mediaSession.setActionHandler(MediaSessionAction.SeekForward, onSeekForward);
      // @ts-ignore
      navigator.mediaSession.setActionHandler(MediaSessionAction.PreviousTrack, onPreviousTrack);
      // @ts-ignore
      navigator.mediaSession.setActionHandler(MediaSessionAction.NextTrack, onNextTrack);
    }
  }

  setPlaybackState = (state: MediaSessionPlaybackState) => {
    // @ts-ignore
    return navigator.mediaSession.playbackState = state;
  }
}
