export type Formats = Record<string, string | string[]>;

export type Targets = Record<string, string>;

type SlotRaw = Partial<{
  init: "true" | "false";
  label: "true";
  name: string;
  formatsDefault: string;
  formatsExtra: string;
  formatsLarge: string;
  formatsMedium: string;
  formatsSmall: string;
}>;

export type Slot = Partial<{
  init: "true" | "false";
  label: "true";
  name: string;
  targeting: Targets;
  formats: Formats;
}>;
