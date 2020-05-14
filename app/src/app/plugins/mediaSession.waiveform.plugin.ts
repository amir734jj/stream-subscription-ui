import * as WaveSurfer from 'wavesurfer.js';
import {MediaSessionUtility} from '../utilities/injectables/mediaSession.utility';
import {MediaSessionPlaybackState} from '../types/mediaSession.type';

interface Metadata { artist: string; title: string; album: string; }

interface PluginParams {
  deferInit?: boolean;
  params?: PluginParams;
  mediaSessionUtility: MediaSessionUtility;
  metadata: Metadata;
}

export default class MediaSessionPlugin {
  private params: PluginParams;
  private waveSurfer: WaveSurfer;
  private readonly metadata: Metadata;

  static create(params: PluginParams) {
    return {
      name: 'mediasession',
      deferInit: params && params.deferInit ? params.deferInit : false,
      params,
      instance: MediaSessionPlugin
    };
  }

  constructor(params: PluginParams, ws: WaveSurfer) {
    this.params = params;
    this.waveSurfer = ws;

    // update metadata
    this.metadata = this.params.metadata;
    this.update();

    // update metadata when playback starts
    this.waveSurfer.on('play', () => this.update());

    // set playback action handlers
    this.params.mediaSessionUtility.setPlaybackEvents({
      onPlay: () => this.waveSurfer.play(),
      onPause: () => this.waveSurfer.pause(),
      onSeekBackward: () => this.waveSurfer.skipBackward(),
      onSeekForward: () => this.waveSurfer.skipForward(),
    });
  }

  init() {
    this.params.mediaSessionUtility.setPlaybackState(MediaSessionPlaybackState.None);
  }

  destroy() {
    this.params.mediaSessionUtility.setPlaybackState(MediaSessionPlaybackState.None);
  }

  update() {
    this.params.mediaSessionUtility.setMetadata(this.metadata);
  }
}
