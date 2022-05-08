export type Formats = Record<string, string | string[]>;

export type Targets = Record<string, string>;

type SlotRaw = Partial<{
  init: "true" | "false";
  label: "true";
  name: string;
  targeting: string;
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

export type AdRequestCustParams = {
  device_spoor_id: string;
  guid: string;
  loggedIn: string;
  permutive: string;
  permutiveId: string;
  other: Record<string, string>;
};

export type AdRequest = {
  prev_iu_szs: string;
  prev_scp: string;
  us_privacy: string;
  cust_params: AdRequestCustParams;
  other: Record<string, string>;
}
