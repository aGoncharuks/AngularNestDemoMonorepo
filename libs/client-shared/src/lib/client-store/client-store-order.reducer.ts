import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Order } from '@wise-guy/data';
import * as OrderActions from './client-store-order.actions';

export interface OrderState extends EntityState<Order> {
  loaded: boolean;
}

export function selectId(order: Order): string {
  return order._id;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter({
  selectId,
  sortComparer: false
})

export const initialState: OrderState = adapter.getInitialState({
  loaded: false
});

const reducer = createReducer(
  initialState,
  on(OrderActions.loadedOrders, (state, {orders}) => {
    return adapter.setAll(orders, state);
  })
);

export function getOrderReducer(state: OrderState, action: Action) {
  return reducer(state, action);
}

export const orderFeatureKey = 'order';

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectOrderFeature = createFeatureSelector<OrderState>(orderFeatureKey);
export const selectOrderLoaded = createSelector(
  selectOrderFeature,
  state => state.loaded
);
export const selectOrderAll = createSelector(
  selectOrderFeature,
  selectAll
);
export const selectOrderEntities = createSelector(
  selectOrderFeature,
  selectEntities
);
export const selectOrder = createSelector(
  selectOrderEntities,
  (orders, props) => orders[props.id]
);
