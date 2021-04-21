export const CLIENT_TYPES = {
  desktop: 'desktop',
  mobile: 'mobile',
  web: 'web',
} as const;

export const CLIENT_TYPE = CLIENT_TYPES.web;

export const SOCKET_EVENTS = {
  PLAY_NEXT: 'PLAY_NEXT',
  PLAY_PAUSE: 'PLAY_PAUSE',
  PLAY_PREVIOUS: 'PLAY_PREVIOUS',
  SWITCH_TRACK: 'SWITCH_TRACK',
} as const;
