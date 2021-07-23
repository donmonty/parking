import { useEffect, useReducer, useRef } from "react"
import axios from "axios"

const ACTIONS = {
  PARKING_LIST_REQUEST: 'PARKING_LIST_REQUEST',
  PARKING_LIST_SUCCESS: "PARKING_LIST_SUCCESS",
  PARKING_LIST_FAIL: "PARKING_LIST_FAIL",

  UPDATE_HAS_NEXT_PAGE: "UPDATE_HAS_NEXT_PAGE",

  EXCESS_RESULTS: "EXCESS_RESULTS",
  NO_RESULTS: "NO_RESULTS"
}

const URL = "https://parking-api.onrender.com/api/search"

function reducer(state, action) {

  switch(action.type) {

    case ACTIONS.PARKING_LIST_REQUEST:
      return { parking: [], loading: true }

    case ACTIONS.PARKING_LIST_SUCCESS:
      return { ...state, loading: false, excess: false, noResults:false, parking: action.payload.parking }

    case ACTIONS.PARKING_LIST_FAIL:
      return { ...state, loading: false, error: action.payload.error, parking: [] }

    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage}

    case ACTIONS.EXCESS_RESULTS:
      return { ...state, loading: false, parking: [], excess: action.payload.excess}

    case ACTIONS.NO_RESULTS:
      return { ...state, loading: false, parking: [], noResults: action.payload.noResults}

    default:
      return state
  }
}

export default function useGetParking(location, pageNumber) {

  const [state, dispatch] = useReducer(reducer, { parking: [], loading: true })
  const total = useRef(0)

  useEffect(() => {
    async function fetchData() {
      const cancelToken2 = axios.CancelToken.source()
      const cancelToken1 = axios.CancelToken.source()

      dispatch({ type: ACTIONS.PARKING_LIST_REQUEST })
  
      try {
        const response = await axios({
          method: "GET",
          url: URL + "/total",
          params: { location: location },
          cancelToken: cancelToken2.token,
        })
        console.log("///// DATA.TOTAL: ", response.data.data)
        let count = response.data.data
        total.current = count

        if (count > 1000) return dispatch({ type: ACTIONS.EXCESS_RESULTS, payload: { excess: true } })
        if (count === 0) return dispatch({ type: ACTIONS.NO_RESULTS, payload: { noResults: true }})
  
        const response2 = await axios({
          method: "GET",
          url: URL,
          params: {
            location: location,
            pageNumber: pageNumber,
            total: count
          },
          cancelToken: cancelToken1.token,
        })
  
        let startIndex = response2.data.data[0].startIndex
        let nextPage;
        if (startIndex > 1) {
          nextPage = true;
        } else if (startIndex === 1) {
          nextPage = false;
        }
        console.log("/////START INDEX: ", startIndex)
  
        const allBusinesses = [...response2.data.data]
        console.log("////// ALL BUSINESSES: ", allBusinesses)
  
        dispatch({ type: ACTIONS.PARKING_LIST_SUCCESS, payload: {parking: response2.data.data } })
        dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: nextPage } })
  
      } catch (error) {
        if (axios.isCancel(error)) return
        console.log("/////////// ERROR IN HOOK:", error.message)
        dispatch({ type: ACTIONS.PARKING_LIST_FAIL, payload: { error: error.message } })
      }
    }
    fetchData()
  }, [location, pageNumber])

  return state
}