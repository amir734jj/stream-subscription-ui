export const isMediaSessionAvailable = 'mediaSession' in navigator;

export const setMetadata = (songMetadata: { artist: string, title: string }) => {
  if (isMediaSessionAvailable) {
    // @ts-ignore
    navigator.mediaSession.metadata = new MediaMetadata({
      title: songMetadata.title,
      artist: songMetadata.artist
    });
  }
}

export const setPlaybackEvents = (options: { onPrev: () => any, onNext: () => any }) => {
  // @ts-ignore
  if ('mediaSession' in navigator && navigator.mediaSession.setActionHandler) {
    // @ts-ignore
    navigator.mediaSession.setActionHandler('previoustrack', options.onPrev);

    // @ts-ignore
    navigator.mediaSession.setActionHandler('nexttrack', options.onNext);
  }
}
