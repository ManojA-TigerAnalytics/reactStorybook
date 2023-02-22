import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFilteredRecommendation,
  fetchPromoRecommenderChannel,
  fetchPromoSegment,
  fetchPromoStatus,
} from "../actions/recommender.actions";

type PromoChannel = {
  promo_id: number;
  promo_name: string;
  channel_code: string;
};
type Segment = {
  segment_id: number;
  segment_name: string;
  promo_id: number;
  user_count: number;
};
type StatusType = {
  id: number;
  status_name: string;
};
type InitialRecommenderState = {
  promoChannel: PromoChannel[];
  segment: Segment[];
  statusType: StatusType[];
  recommendationList: FilteredRecommendation;
};
type FilteredRecommendation = {
  count: number;
  data: FilteredRecommendationData[];
};
type FilteredRecommendationData = {
  // need to destructure based on requirment
  offer_config_id: number;
  offer_package_id: string;
  offer_package_name: string;
  status: number;
  start_date: string;
  created_by: string;
  modified_at: string;
  status_name: string;
  promo_name: [
    {
      promo_name: string;
    }
  ];
  segments: [
    {
      segment_config_id: number;
      segment_id: number;
      offer_config_id: number;
      promo_id: number;
      maximize: number;
      segment_name: string;
      promo_name: string;
    },
    {
      segment_config_id: number;
      segment_id: number;
      offer_config_id: number;
      promo_id: 1;
      maximize: 5;
      segment_name: string;
      promo_name: string;
    }
  ];
  created_name: string;
  offer_week_name: string;
  description: string;
  edit: boolean;
};
const recommendationInitialState: FilteredRecommendation = {
  count: 0,
  data: [],
};
const initialState: InitialRecommenderState = {
  promoChannel: [],
  segment: [],
  statusType: [],
  recommendationList: recommendationInitialState,
};

const recommenderSlice = createSlice({
  name: "recommender",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPromoRecommenderChannel.fulfilled, (state, action) => {
      state.promoChannel = action.payload;
    });
    builder.addCase(fetchPromoSegment.fulfilled, (state, action) => {
      state.segment = action.payload;
    });
    builder.addCase(fetchPromoStatus.fulfilled, (state, action) => {
      state.statusType = action.payload;
    });
    builder.addCase(fetchFilteredRecommendation.fulfilled, (state, action) => {
      state.recommendationList = action.payload;
    });
  },
});

export default recommenderSlice.reducer;
