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
  private mediaSession = navigator.mediaSession as MediaSession;

  private mediaSessionAvailable = window && window.navigator && ('mediaSession' in window.navigator);

  private positionStateAvailable = this.mediaSessionAvailable && ('setPositionState' in this.mediaSession);

  updatePositionState = (state: { duration: number, position: number }) => {
    if (this.positionStateAvailable) {
      if (state) {
        this.mediaSession.setPositionState({
          duration: state.duration,
          playbackRate: 1,
          position: state.position
        });
      } else {
        this.mediaSession.setPositionState(null);
      }
    }
  }

  setMetadata = (songMetadata: { artist: string, title: string, album: string; }) => {
    if (this.mediaSessionAvailable) {
      // @ts-ignore
      this.mediaSession.metadata = new MediaMetadata({
        title: songMetadata.title,
        artist: songMetadata.artist,
        album: songMetadata.album ? songMetadata.album : '',
        artwork: []
      });
    }
  }

  setPlaybackEvents = ({onPreviousTrack, onNextTrack, onPlay, onPause, onSeekBackward, onSeekForward}: MediaPlaybackHandlersT) => {

    if (this.mediaSessionAvailable) {
      if (onPlay) {
        this.mediaSession.setActionHandler(MediaSessionAction.Play, onPlay);
      }
      if (onPause) {
        this.mediaSession.setActionHandler(MediaSessionAction.Pause, onPause);
      }
      if (onSeekBackward) {
        this.mediaSession.setActionHandler(MediaSessionAction.SeekBackward, onSeekBackward);
      }
      if (onSeekForward) {
        this.mediaSession.setActionHandler(MediaSessionAction.SeekForward, onSeekForward);
      }
      if (onPreviousTrack) {
        this.mediaSession.setActionHandler(MediaSessionAction.PreviousTrack, onPreviousTrack);
      }
      if (onNextTrack) {
        this.mediaSession.setActionHandler(MediaSessionAction.NextTrack, onNextTrack);
      }
    }
  }

  setPlaybackState = (state: MediaSessionPlaybackState) => {
    return this.mediaSession.playbackState = state;
  }
}
