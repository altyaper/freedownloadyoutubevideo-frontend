export interface VideoR {
  url: string;
  qualityLabel: string;
  mimeType: string;
}

export interface VideoDownload extends VideoR {
  downloaded?: boolean;
  fileId?: string;
}

export interface AudioR {
  url: string;
  quality: string;
  bitrate: number;
  approxDurationMs: string;
  averageBitrate: number;
  contentLength: string;
  mimeType: string;
}


export interface RelevantVideo {
  videoId: string;
  title: string;
  thumbnails: Thumbnail[];
  videos: VideoDownload[];
  audios: AudioR[];
}

export interface Thumbnail {
  height: number;
  url: string;
  width: number;
}

interface PlaybackTrack {
  baseUrl: string;
  headers: Record<"headerType", string>[]
}

export interface AdaptiveFormat {
  approxDurationMs: string;
  averageBitrate: number;
  bitrate: number;
  contentLength: string;
  fps: number;
  height: number;
  indexRange: { end: string, start: string };
  initRange:{ end: string, start: string };
  itag: number;
  lastModified: string;
  mimeType: string;
  projectionType: string;
  quality: string;
  qualityLabel: string;
  url: string;
  width: number;
}

interface Format {
  approxDurationMs: string;
  audioChannels: number;
  audioQuality: string;
  audioSampleRate: string;
  bitrate: number;
  fps: number;
  height: number;
  itag: number;
  lastModified: string;
  mimeType: string;
  projectionType: string;
  quality: string;
  qualityLabel: string;
  url: string;
  width: number;
}

export interface Video {
  adBreakHeartbeatParams?: string;
  heartbeatParams?: {
    heartbeatServerData: string;
    softFailOnError: boolean;
  }
  playabilityStatus?: {
    playableInEmbed: boolean;
    status: string;
  }
  playbackTracking?: Record<string, PlaybackTrack>[],
  playerConfig?: {
    audioConfig: {
      enablePerFormatLoudness: boolean;
      loudnessDb: number;
      perceptualLoudnessDb: number;
    },
    exoPlayerConfig: {
      allowCacheOverrideToLowerQualitiesWithinRange: number;
      allowDroppingUndecodedFrames: boolean;
      allowTrackSelectionWithUpdatedVideoItagsForExoV2: boolean;
      audioBufferSegmentCount: number;
      avoidReusePlaybackAcrossLoadvideos: boolean;
      bearerMinDurationToRetainAfterDiscardMs: number[];
      blacklistFormatOnError: boolean;
      bufferChunkSizeKb: number;
      cacheCheckDirectoryWritabilityOnce: boolean;
      canPlayHdDrm: boolean;
      cronetResetTimeoutOnRedirects: boolean;
      disableCacheAwareVideoFormatEvaluation: boolean;
      disableLibvpxLoopFilter: boolean;
      drmMaxKeyfetchDelayMs: number;
      drmMetricsQoeLoggingFraction: number;
      emitVideoDecoderChangeEvents: boolean;
      enableBandaidHttpDataSource: boolean;
      enableCacheAwareStreamSelection: boolean;
      enableDynamicHdr: boolean;
      enableDynamicHdrInHardware:boolean;
      enableExoplayerReuse: boolean;
      enableHighlyAvailableFormatFallbackOnPcr: boolean;
      enableInfiniteNetworkLoadingRetries: boolean;
      enableLibvpxFallback: boolean;
      enableLibvpxHdr: boolean;
      enableLibvpxVideoTrackRenderer: boolean;
      enableMaxReadaheadAbrThreshold:boolean;
      enableMediaCodecHdr:boolean;
      enableMediaCodecSwHdr: boolean;
      enableOpus: boolean;
      enableRedirectorHostFallback: boolean;
      enableSurfaceviewResizeWorkaround:boolean;
      enableV2Gapless: boolean;
      enableVariableSpeedPlayback: boolean;
      enableVp9EncryptedIfInHardware: boolean;
      enableVp9EncryptedIfThresholdsPass: boolean;
      enableVp9IfInHardware: boolean;
      enableVp9IfThresholdsPass: boolean;
      enableVpxMediaView: boolean;
      estimatedServerClockHalfLife: number;
      estimatedServerClockStrictOffset: boolean;
      forceWidevineL3: boolean;
      hdrMaxScreenBrightnessThreshold: number;
      hdrMinScreenBrightness: number;
      highPoolLoad: number;
      highWatermarkMs: number;
      httpConnectTimeoutMs: number;
      httpLoadTimeoutMs: number;
      httpNonplayerLoadTimeoutMs: number;
      httpReadTimeoutMs: number;
      ignoreLoadTimeoutForFallback: boolean;
      ignoreUnneededSeeksToLiveHead: boolean;
      ignoreViewportSizeWhenSticky: boolean;
      libvpxEnableGl: boolean;
      liveOnlyBufferHealthHalfLifeSeconds: number;
      liveOnlyMinBufferHealthRatio: number;
      liveOnlyMinLatencyToSeekRatio: number;
      liveOnlyPegStrategy: string;
      liveOnlyReadaheadStepSizeChunks: number;
      liveOnlyWindowChunks: number;
      logMediaRequestEventsToCsi: boolean;
      lowAudioQualityBandwidthThresholdBps: number;
      lowPoolLoad: number;
      lowWatermarkMs: number;
      manifestlessPartialChunkStrategy: string;
      manifestlessSequenceMethod: string;
      matchQualityToViewportOnUnfullscreen: boolean;
      maxAllowableTimeBeforeMediaTimeUpdateSec: number;
      maxDurationForQualityDecreaseMs: number;
      maxFrameDropIntervalMs: number;
      maxInitialByteRate: number;
      maxReadAheadMediaTimeMs: number;
      maxResolutionForWhiteNoise: number;
      maxVideoDurationPerFetchMs: number;
      maxVideoEstimatedLoadDurationMs: number;
      minAdaptiveVideoQuality: number;
      minChunksNeededToPreferOffline: number;
      minDurationForPlaybackRestartMs: number;
      minDurationForPlaybackStartMs: number;
      minDurationForQualityIncreaseMs: number;
      minDurationToRetainAfterDiscardMs: number;
      minErrorsForPcrFallback: number;
      minErrorsForRedirectorHostFallback: number;
      minReadAheadMediaTimeMs: number;
      minRetryCount: number;
      minimumBandwidthSampleBytes: number;
      nonHardwareMediaCodecNames: string[];
      lowAudioQualityConnTypes: string[];
      numAudioSegmentsPerFetch: number;
      numVideoSegmentsPerFetch: number;
      numVideoSegmentsPerFetchStrategy: string;
      onesieDataSourceAboveCacheDataSource: boolean;
      onesieFixNonZeroStartTimeFormatSelection: boolean;
      onesieVideoBufferLoadTimeoutMs: string;
      onesieVideoBufferReadTimeoutMs: string;
      onlyVideoBandwidth: boolean;
      platypusBackBufferDurationMs: number;
      predictorType: string;
      preferOnesieBufferedFormat: boolean;
      preventVideoFrameLaggingWithLibvpx: boolean;
      readAheadGrowthRate: number;
      recordTrackRendererTimingEvents: boolean;
      reportExoPlayerStateOnTransition: boolean;
      secondsToMaxAggressiveness: number;
      serverBweMultiplier: number;
      serverProvidedBandwidthHeader: string;
      slidingPercentile: number;
      slidingPercentileScalar: number;
      slidingWindowSize: number;
      sufficientBandwidthOverhead: number;
      ultralowAudioQualityBandwidthThresholdBps: number;
      useAbruptSplicing: boolean;
      useAdaptiveBitrate: boolean;
      useAverageBitrate: boolean;
      useDashForLiveStreams: boolean;
      useDashForOtfAndCompletedLiveStreams: boolean;
      useDynamicReadAhead: boolean;
      useExoCronetDataSource: boolean;
      useExoPlayer: boolean;
      useExoPlayerV2: boolean;
      useLiveDvrForDashLiveStreams: boolean;
      useLiveHeadTimeMillis: boolean;
      useLiveHeadWindow: boolean;
      useMediaTimeCappedLoadControl: boolean;
      useMedialibAudioTrackRendererForLive: boolean;
      useOpusMedAsLowQualityAudio: boolean;
      usePredictedBuffer: boolean;
      useRadioTypeForInitialQualitySelection: boolean;
      useRedirectorOnNetworkChange: boolean;
      useStickyRedirectHttpDataSource: boolean;
      useYtVodMediaSourceForV2: boolean;
      v2MinTimeBetweenAbrReevaluationMs: number;
      v2PerformEarlyStreamSelection: boolean;
      v2UsePlaybackStreamSelectionResult: boolean;
      videoBufferSegmentCount: number;
      whiteNoiseOffset: number;
      whiteNoiseRenderEffectMode: string;
      whiteNoiseScale: number;
    }
  },
  responseContext: {
    maxAgeSeconds: number;
    visitorData: string;
  },
  streamingData: {
    adaptiveFormats: AdaptiveFormat[];
    expiresInSeconds: number;
    formats: Format[];
  }
  trackingParams: string;
  videoDetails: {
    allowRatings: boolean;
    author: string;
    channelId: string;
    isCrawlable: boolean;
    isLiveContent: boolean;
    isOwnerViewing: boolean;
    isPrivate: boolean;
    isUnpluggedCorpus: boolean;
    keywords: string[];
    lengthSeconds: string;
    shortDescription: string;
    thumbnail: {
      thumbnails: Thumbnail[]
    }
    title: string;
    videoId: string;
    viewCount: string;
  }
}