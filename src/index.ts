import * as VideoWatcherNamespace from './namespaces/video-watcher';
import { httpServer } from './setup/server';

VideoWatcherNamespace.init();

httpServer.listen(3003, () => console.log(`🔥 Socket listening on port 3003!`));
