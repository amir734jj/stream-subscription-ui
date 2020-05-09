type actonT = (...args: any[]) => void;

export interface MediaPlaybackHandlersT {
  onPreviousTrack?: actonT;
  onNextTrack?: actonT;
  onPlay?: actonT;
  onPause?: actonT;
  onSeekBackward?: actonT;
  onSeekForward?: actonT;
}

export const enum MediaSessionAction {
  Play = "play",
  Pause = "pause",
  Stop = "stop",
  SeekBackward = "seekbackward",
  SeekForward = "seekforward",
  SeekTo = "seekto",
  PreviousTrack = "previoustrack",
  NextTrack = "nexttrack",
  SkipAd = "skipad",
}

export const enum MediaSessionPlaybackState {
  None = "none",
  Paused = "paused",
  Playing = "playing",
}

export type SeekAction = MediaSessionAction.SeekBackward | MediaSessionAction.SeekForward;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface MediaSessionActionDetails {
  action: MediaSessionAction;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface MediaSessionSeekActionDetails extends MediaSessionActionDetails {
  /**
   * Time in seconds to move the playback time by
   */
  seekOffset?: number;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface MediaSessionSeekToActionDetails extends MediaSessionActionDetails {
  /**
   * Time in seconds to move the playback time to
   */
  seekTime: number;
  /**
   * Will be `true` if the `seekto` action is being called multiple times
   * as part of a sequence and this is not the last call in that sequence
   */
  fastSeek?: boolean;
}

export type MediaSessionActionHandler<T extends MediaSessionActionDetails> = (details: T) => void;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface MediaImage {
  src: string;
  sizes?: string;
  type?: string;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface MediaMetadataInit {
  title: string;
  artist: string;
  album: string;
  artwork: MediaImage[];
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface MediaMetadata {
  title: string;
  artist: string;
  album: string;
  artwork: MediaImage[];
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface MediaSessionState {
  duration?: number;
  playbackRate?: number;
  position?: number;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface MediaSession {
  metadata?: MediaMetadata;
  playbackState?: MediaSessionPlaybackState;
  setActionHandler(
    type: SeekAction,
    handler: MediaSessionActionHandler<MediaSessionSeekActionDetails> | null,
  ): void;
  setActionHandler(
    type: MediaSessionAction.SeekTo,
    handler: MediaSessionActionHandler<MediaSessionSeekToActionDetails> | null,
  ): void;
  setActionHandler(
    type: MediaSessionAction,
    handler: MediaSessionActionHandler<MediaSessionActionDetails> | null,
  ): void;
  setPositionState?(
    state?: MediaSessionState,
  ): void;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface Navigator {
  mediaSession?: MediaSession;
}