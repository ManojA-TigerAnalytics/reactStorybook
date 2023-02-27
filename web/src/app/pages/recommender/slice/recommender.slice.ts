import { createSlice } from '@reduxjs/toolkit'
import {
  fetchFilteredRecommendation,
  fetchFilteredSegment,
  fetchOfferDuration,
  fetchPromoRecommenderChannel,
  fetchPromoSegment,
  fetchPromoStatus,
} from '../actions/recommender.actions'
import {
  FilteredRecommendation,
  InitialRecommenderState,
} from '../recommender.types'

const recommendationInitialState: FilteredRecommendation = {
  count: 0,
  data: [],
}
const initialState: InitialRecommenderState = {
  promoChannel: [],
  segment: [],
  statusType: [],
  recommendationList: recommendationInitialState,
  offerDuration: [],
  filteredSegment: [],
}

const recommenderSlice = createSlice({
  name: 'recommender',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPromoRecommenderChannel.fulfilled, (state, action) => {
      state.promoChannel = action.payload
    })
    builder.addCase(fetchPromoSegment.fulfilled, (state, action) => {
      state.segment = action.payload
    })
    builder.addCase(fetchPromoStatus.fulfilled, (state, action) => {
      state.statusType = action.payload
    })
    builder.addCase(fetchFilteredRecommendation.fulfilled, (state, action) => {
      state.recommendationList = action.payload
    })
    builder.addCase(fetchOfferDuration.fulfilled, (state, action) => {
      state.offerDuration = action.payload
    })
    builder.addCase(fetchFilteredSegment.fulfilled, (state, action) => {
      state.filteredSegment = action.payload
    })
  },
})

export default recommenderSlice.reducer
