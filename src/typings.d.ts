// SystemJS module definition
declare var module: NodeModule;

interface NodeModule {
	id: string;
}

declare module 'chart.js';
declare module 'thaw-common-utilities.js';
declare module 'thaw-reversi-engine';
