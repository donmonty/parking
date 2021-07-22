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

    

    (async function fetchData() {
      setLoading(true)
      setError(false)
      const cancelToken2 = axios.CancelToken.source()
      const cancelToken1 = axios.CancelToken.source()
      try {
        const response = await axios({
          method: "GET",
          url: URL + "/total",
          params: { location: location },
          cancelToken: cancelToken2.token,
        })
        console.log("///// DATA.TOTAL: ", response.data.total)
        let count = response.data.total
        total.current = count
        console.log("////// TOTAL.CURRENT: ", total.current)


        const response2 = await axios({
          method: "GET",
          url: URL,
          params: {
            location: location,
            pageNumber: pageNumber,
            total: total.current
          },
          cancelToken: cancelToken1.token,
        })
        const allBusinesses = [...response2.data.businesses]
        console.log("////// ALL BUSINESSES: ", allBusinesses)
        setParking(prevParking => {
          return [...prevParking, ...response2.data.businesses]
          //return [...prevParking, ...res.data.businesses.map(business => business.name)]
        })
        setHasMore(response2.data.businesses.length > 0)
        setLoading(false)

      } catch (error) {
        if (axios.isCancel(error)) return
        setError(true)
      }
    })()

    ///////////////////////////////////////////////////
    
    // const cancelToken2 = axios.CancelToken.source()
    // axios({
    //   method: "GET",
    //   url: URL + "/total",
    //   params: {
    //     location: location,
    //   },
    //   cancelToken: cancelToken2.token,
    // }).then(res => {
    //   console.log("///// DATA.TOTAL: ", res.data.total)
    //   let count = res.data.total
    //   total.current = count
    //   console.log("////// TOTAL.CURRENT: ", total.current)
    // }).catch(error => {
    //   if (axios.isCancel(error)) return
    //   setError(true)
    // })

    // const cancelToken1 = axios.CancelToken.source()
    // axios({
    //   method: "GET",
    //   url: URL,
    //   params: {
    //     location: location,
    //     pageNumber: pageNumber,
    //     total: total.current
    //   },
    //   cancelToken: cancelToken1.token,
    // }).then(res => {
    //   const allBusinesses = [...res.data.businesses]
    //   console.log("////// ALL BUSINESSES: ", allBusinesses)
    //   setParking(prevParking => {
    //     return [...prevParking, ...res.data.businesses]
    //     //return [...prevParking, ...res.data.businesses.map(business => business.name)]
    //   })
    //   setHasMore(res.data.businesses.length > 0)
    //   setLoading(false)
    // }).catch(error => {
    //   if (axios.isCancel(error)) return
    //   setError(true)
    // })

    // return () => {
    //   cancelToken1.cancel()
    //   cancelToken2.cancel()
    // }

    
  }, [location, pageNumber])

  return { loading, error, parking, hasMore }

}