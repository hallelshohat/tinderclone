export enum ModeType {
  random,
  upload,
}

export class ModeContext {
  constructor(public mode: ModeType, public id: string) {}

  setMode(mode: ModeType): void {
    this.mode = mode;
  }
}
