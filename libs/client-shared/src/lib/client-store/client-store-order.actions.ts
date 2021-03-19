import { createAction, props, union } from '@ngrx/store';
import { Order } from '@wise-guy/data';

export const loadOrders = createAction('[Order] Load Orders');
export const loadedOrders = createAction('[Order] Loaded Orders', props<{orders: Order[]}>());

const allOrderActions = union({loadOrders});
export type OrderActionsUnion = typeof allOrderActions;
