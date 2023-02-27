import { createAsyncThunk } from '@reduxjs/toolkit'
import RecommenderService from 'services/recommender/recommender.service'
import {
  RecommenderFilterParams,
  SegmentFilterType,
} from '../recommender.types'

export const fetchPromoRecommenderChannel = createAsyncThunk(
  'recommender/fetchPromoRecommenderChannel',
  async () => {
    const response = await RecommenderService.getPromoChannel()
    return response.data.data
  }
)
export const fetchPromoSegment = createAsyncThunk(
  'recommender/fetchPromoSegment',
  async () => {
    const response = await RecommenderService.getSegment()
    return response.data.data
  }
)
export const fetchPromoStatus = createAsyncThunk(
  'recommender/fetchPromoStatus',
  async () => {
    const response = await RecommenderService.getStatus()
    return response.data.data
  }
)
export const fetchFilteredRecommendation = createAsyncThunk(
  'recommender/fetchFilteredRecommendation',
  async (params: RecommenderFilterParams) => {
    const response = await RecommenderService.getFilteredRecommendation(params)
    return response.data.data
  }
)
export const fetchOfferDuration = createAsyncThunk(
  'recommender/fetchOfferDuration',
  async () => {
    const response = await RecommenderService.getDuration()
    return response.data.data
  }
)
export const fetchFilteredSegment = createAsyncThunk(
  'recommender/fetchFilteredSegment',
  async (params: SegmentFilterType) => {
    const response = await RecommenderService.getFilteredSegment(params)
    return response.data.data
  }
)
