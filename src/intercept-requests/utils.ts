import type { AdRequest, AdRequestCustParams } from "../../types";

function processCustParams(cust_params: string): AdRequestCustParams {
  const custValues = new URLSearchParams(cust_params);
  const {
    device_spoor_id,
    guid,
    loggedIn,
    permutive,
    "permutive-id": permutiveId,
    ...other
  } = Object.fromEntries(custValues);

  return {
    device_spoor_id,
    guid,
    loggedIn,
    permutive,
    permutiveId,
    other,
  };
}

export function processRequest(url: string): AdRequest {
  const reqUrl = new URL(url);
  const allParams = Object.fromEntries(reqUrl.searchParams);

  const { cookie, correlator, prev_iu_szs, prev_scp, us_privacy, cust_params, ...other } =
    allParams;

  return {
    prev_iu_szs,
    prev_scp,
    us_privacy,
    cust_params: processCustParams(cust_params),
    other,
  };
}
