import { createAsyncThunk } from "@reduxjs/toolkit";
import RecommenderService from "services/recommender/recommender.service";

type RecommenderFilterParams = {
  page: string;
  page_size: string;
  offer_package_id?: string;
  offer_package_name?: string;
  promo_id?: string[];
  segment_id?: string[];
  created_by?: string;
  status_name?: string[];
  offer_start_date?: string;
};
export const fetchPromoRecommenderChannel = createAsyncThunk(
  "recommender/fetchPromoRecommenderChannel",
  async () => {
    const response = await RecommenderService.getPromoChannel();
    return response.data.data;
  }
);
export const fetchPromoSegment = createAsyncThunk(
  "recommender/fetchPromoSegment",
  async () => {
    const response = await RecommenderService.getSegment();
    return response.data.data;
  }
);
export const fetchPromoStatus = createAsyncThunk(
  "recommender/fetchPromoStatus",
  async () => {
    const response = await RecommenderService.getStatus();
    return response.data.data;
  }
);
export const fetchFilteredRecommendation = createAsyncThunk(
  "recommender/fetchFilteredRecommendation",
  async (params: RecommenderFilterParams) => {
    const response = await RecommenderService.getFilteredRecommendation(params);
    return response.data.data;
  }
);
