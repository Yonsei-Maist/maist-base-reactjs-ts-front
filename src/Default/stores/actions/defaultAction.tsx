/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.10.26
 */
import { DefaultRequest } from "../../models/request";
import { ResponseMessage } from "../../models/response";
import {
  FETCH_DEFAULT,
  FETCH_DEFAULT_SUCCESS,
  FETCH_DEFAULT_FAILURE,
} from "../types";

export const fetchDefault = (data: DefaultRequest) => ({
  type: FETCH_DEFAULT,
  payload: data,
});

export const fetchDefualtSuccess = (data: ResponseMessage) => ({
  type: FETCH_DEFAULT_SUCCESS,
  payload: data,
});

export const fetchDefaultFailure = (error: any) => ({
  type: FETCH_DEFAULT_FAILURE,
  error,
});
