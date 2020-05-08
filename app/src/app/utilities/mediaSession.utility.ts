import * as _ from 'lodash';

export const isMediaSessionAvailable = 'mediaSession' in navigator;

type actonT = () => any;

export const setMetadata = (songMetadata: { artist: string, title: string }) => {
  if (isMediaSessionAvailable) {
    // @ts-ignore
    navigator.mediaSession.metadata = new MediaMetadata({
      title: songMetadata.title,
      artist: songMetadata.artist
    });
  }
};

interface MediaPlaybackHandlersT {
  onPreviousTrack?: actonT;
  onNextTrack?: actonT;
  onPlay?: actonT;
  onPause?: actonT;
  onSeekBackward?: actonT;
  onSeekForward?: actonT;
}

export const setPlaybackEvents = ({
                                    onPreviousTrack = _.noop,
                                    onNextTrack = _.noop,
                                    onPlay = _.noop,
                                    onPause = _.noop,
                                    onSeekBackward = _.noop,
                                    onSeekForward = _.noop
                                  }: MediaPlaybackHandlersT) => {
  // @ts-ignore
  if ('mediaSession' in navigator && navigator.mediaSession.setActionHandler) {
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
