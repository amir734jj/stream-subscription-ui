import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {
  MediaPlaybackHandlersT,
  MediaSession,
  MediaSessionAction,
  MediaSessionPlaybackState,
} from '../../types/mediaSession.type';

@Injectable()
export class MediaSessionUtility {
  // @ts-ignore
  isMediaSessionAvailable = () => {
    return window && window.navigator && 'mediaSession' in window.navigator;
  }

  resolveMediaSession = () => {
    return _.get(navigator, 'mediaSession') as MediaSession;
  }

  setMetadata = (songMetadata: { artist: string, title: string }) => {
    if (this.isMediaSessionAvailable()) {
      // @ts-ignore
      this.resolveMediaSession().metadata = new MediaMetadata({
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
      this.resolveMediaSession().setActionHandler(MediaSessionAction.Play, onPlay);
      this.resolveMediaSession().setActionHandler(MediaSessionAction.Pause, onPause);
      this.resolveMediaSession().setActionHandler(MediaSessionAction.SeekBackward, onSeekBackward);
      this.resolveMediaSession().setActionHandler(MediaSessionAction.SeekForward, onSeekForward);
      this.resolveMediaSession().setActionHandler(MediaSessionAction.PreviousTrack, onPreviousTrack);
      this.resolveMediaSession().setActionHandler(MediaSessionAction.NextTrack, onNextTrack);
    }
  }

  setPlaybackState = (state: MediaSessionPlaybackState) => {
    return this.resolveMediaSession().playbackState = state;
  }
}
