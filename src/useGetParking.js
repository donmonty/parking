import { useEffect, useReducer } from "react"
import axios from "axios"

const ACTIONS = {
  PARKING_LIST_REQUEST: 'PARKING_LIST_REQUEST',
  PARKING_LIST_SUCCESS: "PARKING_LIST_SUCCESS",
  PARKING_LIST_FAIL: "PARKING_LIST_FAIL"
}

const URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search"

function reducer(state, action) {

  switch(action.type) {

    case ACTIONS.PARKING_LIST_REQUEST:
      return { parking: [], loading: true }

    case ACTIONS.PARKING_LIST_SUCCESS:
      return { ...state, loading: false, parking: action.payload.parking }

    case ACTIONS.PARKING_LIST_FAIL:
      return { ...state, loading: false, error: action.payload.error, parking: [] }

    default:
      return state
  }
}

const LIMIT = 10;

export default function useGetParking(params, page) {

  const [state, dispatch] = useReducer(reducer, { parking: [], loading: true })
  let OFFSET = ((page - 1) * limit) + 1

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()
    dispatch({ type: ACTIONS.PARKING_LIST_REQUEST })
    axios.get({
      URL,
      cancelToken: cancelToken.token,
      params: {
        offset: OFFSET,
        limit: LIMIT,
        ...params
      }
    }).then(res => {
      const count = res.data.total
      let pages = Math.ceil(count / LIMIT)
      let nextPage
      let previousPage
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      if (endIndex < count) nextPage = page + 1;
      if (startIndex > 0) previousPage = page - 1;

      const data = {
        ...res.data,
        pages,
        page,
        nextPage,
        previousPage,
      }

      dispatch({ type: ACTIONS.PARKING_LIST_SUCCESS, payload: { parking: data } })
    }).catch (error => {
      if (axios.isCancel(error)) return
      dispatch({ type: ACTIONS.PARKING_LIST_FAIL, payload: { error: error } })
    })

    return () => {
      cancelToken.cancel()
    }

  }, [params, page])
}