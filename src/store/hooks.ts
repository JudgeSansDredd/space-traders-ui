import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppDispatch = useDispatch as () => AppDispatch;
export const useAppSelector = useSelector as TypedUseSelectorHook<RootState>;
