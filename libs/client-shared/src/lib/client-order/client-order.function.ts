import { AnyObject, AppConfig, FieldConfig, Order } from '@wise-guy/data';

export function toFlatOrderModel(model: AnyObject, fields: FieldConfig[]): Order {
  return Object.entries(model).reduce((acc, [key, value]) => {
    const fieldConfig = findFieldByKey(key, fields);
    if (fieldConfig?.combined && typeof value === 'object') {
      return { ...acc, ...value as AnyObject};
    }
    return { ...acc, [key]: value};
  }, {} as Order)
}

export function findFieldByKey(key: string, fields: FieldConfig[]): FieldConfig {
  return fields.find(field => field.key === key);
}

export function getPresetValue(field: FieldConfig, order: Order): unknown {
    let presetValue;
    const fieldKey = field.key as string;
    if (!field.combined) {
      presetValue = order[fieldKey];
    } else {
      const fieldOptions = field.templateOptions?.options as Array<unknown>;
      if (!Array.isArray(fieldOptions)) { return; }
      const optionFound = fieldOptions.find(option => {
        if (typeof option !== 'object') {
          return false;
        }
        return option.value[fieldKey] === order[fieldKey];
      });
      presetValue = optionFound?.value;
    }
    return presetValue;
}

export function getFixedCondition(field: FieldConfig, order: Order): boolean {
  if (typeof field.fixedConditionFactory !== 'function') {
    return false;
  }
  return field.fixedConditionFactory(order);
}


export function complementByDefaultImages(orders: Order[], config: AppConfig): Order[] {
  return orders.map(order => order.images?.length ?
    order :
    {
      ...order,
      images: [config.imagePlaceholders[order[config.displayNameField] as string]]
    }
  )
}
