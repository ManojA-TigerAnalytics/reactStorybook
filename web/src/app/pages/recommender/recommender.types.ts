export type SegmentFilterType = {
  promo_id: string[]
}
export type PromoChannel = {
  promo_id: number
  promo_name: string
  channel_code: string
}
export type Segment = {
  segment_id: number
  segment_name: string
  promo_id: number
  user_count: number
}
export type StatusType = {
  id: number
  status_name: string
}
export type OfferDuration = {
  offer_week_name: string
  description: string
  offer_duration_id: number
}
export type FilteredSegment = {
  segment_id: number
  segment_name: string
  promo_id: number
  user_count: number
}
export type InitialRecommenderState = {
  promoChannel: PromoChannel[]
  segment: Segment[]
  statusType: StatusType[]
  recommendationList: FilteredRecommendation
  offerDuration: OfferDuration[]
  filteredSegment: FilteredSegment[]
}
export type FilteredRecommendation = {
  count: number
  data: FilteredRecommendationData[]
}
export type FilteredRecommendationData = {
  // need to destructure based on requirment
  offer_config_id: number
  offer_package_id: string
  offer_package_name: string
  status: number
  start_date: string
  created_by: string
  modified_at: string
  status_name: string
  promo_name: [
    {
      promo_name: string
    }
  ]
  segments: [
    {
      segment_config_id: number
      segment_id: number
      offer_config_id: number
      promo_id: number
      maximize: number
      segment_name: string
      promo_name: string
    },
    {
      segment_config_id: number
      segment_id: number
      offer_config_id: number
      promo_id: 1
      maximize: 5
      segment_name: string
      promo_name: string
    }
  ]
  created_name: string
  offer_week_name: string
  description: string
  edit: boolean
}

export type RecommenderFilterParams = {
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

// ui page

export type ConfigurationFilterFormValues = {
  startDate: Date
  channelFilter: AutoCompleteOption[]
  promoDuration: string
}
export type PromoConfigurationFormValues = {
  startDate: Date
  channelFilter: AutoCompleteOption[]
  promoDuration: string
  promoDepth: number
  selectedSegment: string
}
export type AutoCompleteOption = {
  id: string
  label: string
}
export type DropDownOption = {
  label: string
  value: string
}
export type CheckBoxRadioOption = DropDownOption
