import { useState } from 'react'
import RecommenderService from 'services/recommender/recommender.service'

function useFetchObjective() {
  const [isLoading, setIsLoading] = useState(false)
  setIsLoading(true)
  const { status, data } = RecommenderService.getPromoChannel()
  if (status === 200) {
    setIsLoading(false)
  } else {
    setIsLoading(false)
  }

  return { data, isLoading }
}

export default useFetchObjective
