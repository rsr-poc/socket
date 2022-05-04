import * as DrawNamespace from './namespaces/draw';
import { httpServer } from './setup/server';

DrawNamespace.init();

httpServer.listen(3003, () => console.log(`🔥 Socket listening on port 3003!`));
