import * as VideoWatcherNamespace from './namespaces/video-watcher';
import { server } from './setup/server';

VideoWatcherNamespace.init();
server.listen(3000, () => console.log(`🔥 Socket listening on port 3000!`));
