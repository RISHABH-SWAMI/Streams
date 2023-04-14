//This is going to be contain all of our action creators.

import streams from "../apis/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "./types";
import history from "../history";

// Action Creator signIn
export const signIn = (userId) => {
  // returns an action
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

// Action Creator signOut
export const signOut = () => {
  // returns an action
  return {
    type: SIGN_OUT,
  };
};

// Making post request to the json-server with asynchronous action creator.
export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", {...formValues, userId});

  dispatch({ type: CREATE_STREAM, payload: response.data });
  // Do some programmatic navigation to get the user back to root route(List of streams).

  //push is used for how we navigate the user around our application.
  history.push('/');
};

// For displaying all streams present in the application.
export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// For displaying particular stream out of number of streams.
export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

//For updating any particular stream
export const editStream = (id, formValues) => async (dispatch) => {
  // With put request the properties mentioned in the body of put request are going to reflected on the screen and the all old properties of the stream are dropped or replaced by the new ones(properties which are mentioned in the put request).
  // const response = await streams.put(`/streams/${id}`, formValues);
  
  // Patch request does not perform any dropoff operation with the stream we trying to update.
  // It updates the values of properties which are mentioned in the body of its request without dropping or replacing other properties that are already present in the object.
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

// For deleting any particular stream
export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
