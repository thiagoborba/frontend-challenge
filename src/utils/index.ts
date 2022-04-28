import { PAGE_SIZE } from "../constants";

export function paginate(currentPage: number, array: any[]) {
  return array?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )
}

export function getSearchParams(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  const params = urlParams.get(param);
  return params;
}

export const page = getSearchParams("page");

