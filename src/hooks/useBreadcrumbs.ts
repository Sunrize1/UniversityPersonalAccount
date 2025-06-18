import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../store/store';
import { setBreadcrumbs, addBreadcrumb, clearBreadcrumbs } from '../store/breadcrumbsSlice/breadcrumbsSlice';
import { BreadcrumbItem } from '../types/redux/BreadcrumbsState';

export const useBreadcrumbs = () => {
  const dispatch = useDispatch();
  const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs.items);

  const setBreadcrumbItems = useCallback((items: BreadcrumbItem[]) => {
    dispatch(setBreadcrumbs(items));
  }, [dispatch]);

  const addBreadcrumbItem = useCallback((item: BreadcrumbItem) => {
    dispatch(addBreadcrumb(item));
  }, [dispatch]);

  const clearBreadcrumbItems = useCallback(() => {
    dispatch(clearBreadcrumbs());
  }, [dispatch]);

  return {
    breadcrumbs,
    setBreadcrumbItems,
    addBreadcrumbItem,
    clearBreadcrumbItems
  };
}; 