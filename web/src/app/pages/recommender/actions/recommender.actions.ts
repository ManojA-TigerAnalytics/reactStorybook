import { createAsyncThunk } from "@reduxjs/toolkit";
import RecommenderService from "services/recommender/recommender.service";

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
  async () => {
    const response = await RecommenderService.getFilteredRecommendation();
    return response.data.data;
  }
);
