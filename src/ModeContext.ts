export enum ModeType {
  random,
  upload,
}

export class ModeContext {
  constructor(public mode: ModeType) {}

  setMode(mode: ModeType): void {
    this.mode = mode;
  }
}
