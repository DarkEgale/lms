


import { randomUUID } from 'node:crypto';

const sessionId = () => randomUUID();

export { sessionId };