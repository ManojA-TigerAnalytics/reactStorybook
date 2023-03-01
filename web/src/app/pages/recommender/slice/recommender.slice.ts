import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  fetchFilteredRecommendation,
  fetchFilteredSegment,
  fetchOfferDuration,
  fetchProductCategory,
  fetchProductItems,
  fetchPromoMechanic,
  fetchPromoObjective,
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
  promoObjective: [],
  productCategory: [],
  productItems: [],
  promoMechanic: [],
  current: {
    promoId: [],
  },
}

const recommenderSlice = createSlice({
  name: 'recommender',
  initialState,
  reducers: {
    setCurrentPromoIdSelection: (state, action: PayloadAction<number[]>) => {
      state.current.promoId = action.payload
    },
  },
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
    builder.addCase(fetchPromoObjective.fulfilled, (state, action) => {
      state.promoObjective = action.payload
    })
    builder.addCase(fetchProductCategory.fulfilled, (state, action) => {
      state.productCategory = action.payload
    })
    builder.addCase(fetchProductItems.fulfilled, (state, action) => {
      state.productItems = action.payload
    })
    builder.addCase(fetchPromoMechanic.fulfilled, (state, action) => {
      state.promoMechanic = action.payload
    })
  },
})

export const { setCurrentPromoIdSelection } = recommenderSlice.actions

export default recommenderSlice.reducer
