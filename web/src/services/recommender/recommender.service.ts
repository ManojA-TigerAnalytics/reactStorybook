import {
  ProductItemsParamsType,
  PromoObjectiveParamsType,
  SegmentFilterParamsType,
} from 'app/pages/recommender/recommender.types'
import client from '../../axios'

type RecommenderFilterParams = {
  page: string
  page_size: string
  offer_package_id?: string
  offer_package_name?: string
  promo_id?: string[]
  segment_id?: string[]
  created_by?: string
  status_name?: string[]
  offer_start_date?: string
}
const RecommenderService = {
  getPromoChannel() {
    return client.get('/offer_configuration/promochannel/')
  },
  getSegment() {
    return client.get('/offer_configuration/all/segments/')
  },
  getStatus() {
    return client.get('/offer_configuration/status/list/')
  },
  getFilteredRecommendation(params: RecommenderFilterParams) {
    return client.get(`/offer_configuration/list`, { params })
  },
  getDuration() {
    return client.get(`offer_configuration/offer_duration/`)
  },
  getFilteredSegment(params: SegmentFilterParamsType) {
    return client.get(`offer_configuration/segment/list/`, { params })
  },
  getPromoObjective(params: PromoObjectiveParamsType) {
    return client.get(`offer_configuration/promoobjective/list/`, { params })
  },
  getProductCategory() {
    return client.get(`offer_configuration/product-category/`)
  },
  getProductItems(params: ProductItemsParamsType) {
    return client.get(`offer_configuration/getitem/`, { params })
  },
  getPromoMechanic() {
    return client.get(`offer_configuration/promomechanic/`)
  },
}

export default RecommenderService
