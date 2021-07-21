import axios from "axios"
import { useState, useEffect, useRef } from "react"

//const URL = "https://cors-anywhere.herokuapp.com/http://localhost:3001/api/search"
const URL = "http://localhost:3001/api/search"
//const LIMIT = 10
//const API_KEY = "Bearer grd9edPIdc08b6nHwZNAPEEXk9dqwUITumOk1Pz-2YZDeKt2kd1iCZNIyjKG5-3q6WCFn4iFt9A2VmZ1dpbwr-3kKaAaoSsI84OUhxBmfTlae1rK2SFsH2YiADX2YHYx"

export default function useParkingSearch(location, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [parking, setParking] = useState([])
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const total = useRef(0)

  useEffect(() => {
    setParking([])
  }, [location])

  useEffect(() => {

    setLoading(true)
    setError(false)

    //const start = (total.current - ((pageNumber - 1) * LIMIT)) + 1
    
    const cancelToken2 = axios.CancelToken.source()
    axios({
      method: "GET",
      url: URL + "/total",
      params: {
        location: location,
      },
      cancelToken: cancelToken2.token,
      // headers: { 
      //   "user-key": API_KEY,
      //   "Accept": "application/json",
      //   "Content-Type": "application/json",
      //   "Acces-Control-Allow-Headers": "*",
      //   "Access-Control-Allow-Origin": "http://localhost:3000",
      // }
    }).then(res => {
      console.log("///// DATA.TOTAL: ", res.data.total)
      let count = res.data.total
      total.current = count
      console.log("////// TOTAL.CURRENT: ", total.current)
    }).catch(error => {
      if (axios.isCancel(error)) return
      setError(true)
    })

    const cancelToken1 = axios.CancelToken.source()
    axios({
      method: "GET",
      url: URL,
      params: {
        location: location,
        pageNumber: pageNumber,
        total: total.current
      },
      cancelToken: cancelToken1.token,
    }).then(res => {
      setParking(prevParking => {
        return [...prevParking, ...res.data.businesses.map(business => business.name)]
      })
      setHasMore(res.data.businesses.length > 0)
      setLoading(false)
    }).catch(error => {
      if (axios.isCancel(error)) return
      setError(true)
    })

    return () => {
      cancelToken1.cancel()
      cancelToken2.cancel()
    }

    
  }, [location, pageNumber])

  return { loading, error, parking, hasMore }


  // useEffect(() => {
  //   setLoading(true)
  //   setError(false)

  //   const start = (total.current - ((pageNumber - 1) * LIMIT)) + 1

  //   // let start = total.current - LIMIT
  //   // total.current = start
  //   // if (start < 0) start = 1

  //   let cancel
  //   axios({
  //     method: "GET",
  //     url: URL,
  //     params: {
  //       location: query,
  //       offset: start,
  //       sort_by: "rating"
  //     },
  //     cancelToken: new axios.CancelToken(c => cancel = c)
  //   }).then(res => {
  //     setParking(prevParking => {
  //       return [...prevParking, ...res.data.businesses.map(business => business.name)].reverse()
  //     })
  //     sethasMore(res.data.businesses.length > 0)
  //     setLoading(false)
  //   }).catch(error => {
  //     if (axios.isCancel(error)) return
  //     setError(true)
  //   })
  //   return () => cancel()
  // }, [location, pageNumber])

  // return { loading, error, parking, hasMore }
}