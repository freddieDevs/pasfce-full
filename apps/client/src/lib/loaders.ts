import axios, { AxiosRequestConfig } from 'axios';
import { requireAuth } from "./require-auth";
import { Cluster, Staff } from '@/types/types';

export async function clustersLoader () {
  const config = await requireAuth() as AxiosRequestConfig;
  try {
    const response = await axios.get('/api/clusters', config)as {data: Cluster[]}
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return 'unauthorized';
    } else {
      throw 'Internal server Error';
    }
  }
   
}

export async function staffsLoader() {
  const config = await requireAuth() as AxiosRequestConfig;

  try {
    const response = await axios.get('/api/staff', config) as {data: Staff[]};
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return 'unauthorized';
    } else {
      throw 'Internal Server Error';
    }
  }
}