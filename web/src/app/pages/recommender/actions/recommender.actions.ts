import { createAsyncThunk } from '@reduxjs/toolkit'
import RecommenderService from 'services/recommender/recommender.service'
import {
  ProductItemsParamsType,
  PromoObjectiveParamsType,
  RecommenderFilterParams,
  SegmentFilterParamsType,
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
  async (params: SegmentFilterParamsType) => {
    const response = await RecommenderService.getFilteredSegment(params)
    return response.data.data
  }
)
export const fetchPromoObjective = createAsyncThunk(
  'recommender/fetchPromoObjective',
  async (params: PromoObjectiveParamsType) => {
    const response = await RecommenderService.getPromoObjective(params)
    return response.data.data
  }
)
export const fetchProductCategory = createAsyncThunk(
  'recommender/fetchProductCategory',
  async () => {
    const response = await RecommenderService.getProductCategory()
    return response.data.data
  }
)
export const fetchProductItems = createAsyncThunk(
  'recommender/fetchProductItems',
  async (params: ProductItemsParamsType) => {
    const response = await RecommenderService.getProductItems(params)
    return response.data.data
  }
)
export const fetchPromoMechanic = createAsyncThunk(
  'recommender/fetchPromoMechanic',
  async () => {
    const response = await RecommenderService.getPromoMechanic()
    return response.data.data
  }
)
