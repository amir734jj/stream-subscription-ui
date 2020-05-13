import * as _ from 'lodash';
import { Injectable } from '@angular/core';

import {
  MediaPlaybackHandlersT,
  MediaSession,
  MediaSessionAction,
  MediaSessionPlaybackState,
} from '../../types/mediaSession.type';

@Injectable()
export class MediaSessionUtility {

  // @ts-ignore
  private mediaSession = navigator.mediaSession as MediaSession;

  private mediaSessionAvailable = window && window.navigator && ('mediaSession' in window.navigator);

  private positionStateAvailable = this.mediaSessionAvailable && ('setPositionState' in this.mediaSession);

  updatePositionState = (state: { duration: number, position: number }) => {
    if (this.positionStateAvailable) {
      this.mediaSession.setPositionState({
        duration: state.duration,
        playbackRate: 1,
        position: state.position
      });
    }
  }

  setMetadata = (songMetadata: { artist: string, title: string }) => {
    if (this.mediaSessionAvailable) {
      // @ts-ignore
      this.mediaSession.metadata = new MediaMetadata({
        title: songMetadata.title,
        artist: songMetadata.artist,
        album: 'unknown',
        artwork: [{
          src: 'https://dummyimage.com/96x96',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: 'https://dummyimage.com/128x128',
          sizes: '128x128',
          type: 'image/png'
        },
        {
          src: 'https://dummyimage.com/192x192',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'https://dummyimage.com/256x256',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: 'https://dummyimage.com/384x384',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: 'https://dummyimage.com/512x512',
          sizes: '512x512',
          type: 'image/png'
        }]
      });
    }
  }

  setPlaybackEvents = (options: MediaPlaybackHandlersT) => {
    const { onPreviousTrack, onNextTrack, onPlay, onPause, onSeekBackward, onSeekForward } = Object.assign({}, {
      onPreviousTrack: _.noop,
      onNextTrack: _.noop,
      onPlay: _.noop,
      onPause: _.noop,
      onSeekBackward: _.noop,
      onSeekForward: _.noop
    }, options);

    if (this.mediaSessionAvailable) {
      this.mediaSession.setActionHandler(MediaSessionAction.Play, onPlay);
      this.mediaSession.setActionHandler(MediaSessionAction.Pause, onPause);
      this.mediaSession.setActionHandler(MediaSessionAction.SeekBackward, onSeekBackward);
      this.mediaSession.setActionHandler(MediaSessionAction.SeekForward, onSeekForward);
      this.mediaSession.setActionHandler(MediaSessionAction.PreviousTrack, onPreviousTrack);
      this.mediaSession.setActionHandler(MediaSessionAction.NextTrack, onNextTrack);
    }
  }

  setPlaybackState = (state: MediaSessionPlaybackState) => {
    // return this.mediaSession.playbackState = state;
    _.noop(state);
  }
}
