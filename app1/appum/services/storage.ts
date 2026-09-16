import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppState } from '../types';
import { createInitialState, hydrateMedia } from '../data/mockData';

const STORAGE_KEY = '@vizzy/state/v2-sanca';

export async function loadAppState(): Promise<AppState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as AppState;
    return hydrateMedia({ ...createInitialState(), ...parsed });
  } catch {
    return createInitialState();
  }
}

export async function saveAppState(state: AppState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
