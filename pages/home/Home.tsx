import React, { memo, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import WebTorrent from 'webtorrent';

import decodeLink from '../../utilities/decode-link';
import log from '../../utilities/log';
import { SOCKET_EVENTS } from '../../constants';
import useRefState from '../../hooks/use-ref-state';
import { WEBSOCKETS_URL } from '../../configuration';

function Home(): React.ReactElement {
  const [socketClient, setSocketClient] = useRefState<Socket>({} as Socket);
  const [torrentClient, setTorrentClient] = useRefState<any>({} as any);
  const [trackData, setTrackData] = useState('');

  const handleSwitchTrack = (event: any) => {
    log(event);
    setTrackData(JSON.stringify(event.data.track));
    torrentClient?.current?.add(decodeLink(event.data.link), (torrent) => {
      torrent.files.forEach((file) => {
        file.appendTo('body');
      });
    });
  };

  useEffect(
    () => {
      const torrent = new WebTorrent();
      setTorrentClient(torrent);

      const connection: Socket = io(
        WEBSOCKETS_URL,
        {
          autoConnect: true,
          // query: {
          //   token,
          // },
          reconnection: true,
          reconnectionAttempts: 10,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 10000,
        },
      );

      setSocketClient(connection);

      connection.on('connect', () => log(`connected ${connection.id}`));

      connection.on(SOCKET_EVENTS.SWITCH_TRACK, handleSwitchTrack);

      return () => {
        connection.off(SOCKET_EVENTS.SWITCH_TRACK, handleSwitchTrack);
        connection.close();
      };
    },
    [],
  );

  const handleNextClick = () => {
    log('is next');
    if (socketClient?.current?.connected) {
      socketClient.current.emit(SOCKET_EVENTS.PLAY_NEXT);
    }
  };

  const handlePreviousClick = () => {
    log('is previous');
    if (socketClient?.current?.connected) {
      socketClient.current.emit(SOCKET_EVENTS.PLAY_PREVIOUS);
    }
  };

  return (
    <>
      <div>
        Home
      </div>
      <button
        onClick={handlePreviousClick}
        type="button"
      >
        Previous
      </button>
      <button
        onClick={handleNextClick}
        type="button"
      >
        Next
      </button>
      <div>
        { trackData }
      </div>
    </>
  );
}

export default memo(Home);
