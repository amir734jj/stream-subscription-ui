type actonT = (...args: any[]) => void;

export interface MediaPlaybackHandlersT {
  onPreviousTrack?: actonT;
  onNextTrack?: actonT;
  onPlay?: actonT;
  onPause?: actonT;
  onSeekBackward?: actonT;
  onSeekForward?: actonT;
}