import { AppConfig, AppPageRoute, NOTIFICATION_MOCK, OrderPriority, OrderType } from '@wise-guy/data';

const SUB_TYPE = {
  BUYING: 'buying',
  RENTING: 'renting',
  SELLING: 'selling',
  RENTINGOUT: 'rentingout'
}

const SUB_TYPE_MATCH = {
  [SUB_TYPE.BUYING]: [SUB_TYPE.SELLING],
  [SUB_TYPE.RENTING]: [SUB_TYPE.RENTINGOUT],
  [SUB_TYPE.SELLING]: [SUB_TYPE.BUYING],
  [SUB_TYPE.RENTINGOUT]: [SUB_TYPE.RENTING]
}

const PROPERTY_TYPE = {
  HOUSE: 'house',
  APARTMENT: 'apartment'
}

export const APP_CONFIG_RE: AppConfig = {
  pages: [
    {
      route: AppPageRoute.STACK,
      nameText: 'Matches',
      show: true
    },
    {
      route: AppPageRoute.DASHBOARD,
      nameText: 'Dashboard',
      show: true,
      texts: {
        bidCategoryNameText: 'Buying and Renting',
        offerCategoryNameText: 'Selling and Renting Out'
      }
    },
    {
      route: AppPageRoute.ORDER_FORM,
      nameText: 'New Posting',
      show: true
    }
  ],
  orderFields: [
    {
      key: 'subType',
      type: 'select',
      templateOptions: {
        label: 'Deal Type',
        required: true,
        options: [
          {
            value: {
              type: OrderType.BID,
              subType: SUB_TYPE.BUYING
            },
            label: 'Buying'
          },
          {
            value: {
              type: OrderType.BID,
              subType: SUB_TYPE.RENTING
            },
            label: 'Want to Rent'
          },
          {
            value: {
              type: OrderType.OFFER,
              subType: SUB_TYPE.SELLING
            },
            label: 'Selling'
          },
          {
            value: {
              type: OrderType.OFFER,
              subType: SUB_TYPE.RENTINGOUT
            },
            label: 'Renting Out'
          },
        ],
      },
      priority: OrderPriority.FIRST,
      matchQueryFactory: (order) => ({
        subType: {
          $exists: true,
          $in: SUB_TYPE_MATCH[order.subType]
        }
      }),
      fixedConditionFactory: order => !!order,
      combined: true
    },
    {
      key: 'propertyType',
      type: 'select',
      templateOptions: {
        label: 'Property Type',
        required: true,
        options: [
          { value: PROPERTY_TYPE.HOUSE, label: 'House' },
          { value: PROPERTY_TYPE.APARTMENT, label: 'Apartment' }
        ],
      },
      priority: OrderPriority.FIRST,
      matchQueryFactory: (order) => ({
        propertyType: {
          $exists: true,
          $eq: order.propertyType
        }
      }),
      fixedConditionFactory: order => !!order
    },
    {
      key: 'minimumSpace',
      type: 'slider',
      templateOptions: {
        label: 'Minimum Space (square m.)',
        required: true,
        min: 1,
        max: 1000,
        step: 1,
        thumbLabel: true
      },
      priority: OrderPriority.FIRST,
      hideExpression: model => model.subType?.type !== OrderType.BID,
      matchQueryFactory: (order) => ({
        space: {
          $exists: true,
          $gte: order.minimumSpace
        }
      })
    },
    {
      key: 'space',
      type: 'input',
      templateOptions: {
        label: 'Space (square m.)',
        required: true,
        type: 'number'
      },
      priority: OrderPriority.FIRST,
      hideExpression: model => model.subType?.type !== OrderType.OFFER,
      matchQueryFactory: (order) => ({
        minimumSpace: {
          $exists: true,
          $lte: order.space
        }
      })
    },
    {
      key: 'maximumPrice',
      type: 'input',
      templateOptions: {
        label: 'Maximum Price (EUR)',
        required: true,
        type: 'number'
      },
      priority: OrderPriority.FIRST,
      hideExpression: model => model.subType?.type !== OrderType.BID,
      matchQueryFactory: (order) => ({
        price: {
          $exists: true,
          $lte: order.maximumPrice
        }
      })
    },
    {
      key: 'price',
      type: 'input',
      templateOptions: {
        label: 'Price (EUR)',
        required: true,
        type: 'number'
      },
      priority: OrderPriority.FIRST,
      hideExpression: model => model.subType?.type !== OrderType.OFFER,
      matchQueryFactory: (order) => ({
        maximumPrice: {
          $exists: true,
          $gte: order.price
        }
      })
    },
    {
      key: 'minimumFloor',
      type: 'slider',
      templateOptions: {
        label: 'Minimum Apartment Floor',
        required: true,
        min: 0,
        max: 100,
        step: 1,
        thumbLabel: true
      },
      priority: OrderPriority.SECOND,
      hideExpression: model => !(model.subType?.type === OrderType.BID && model.propertyType?.includes(PROPERTY_TYPE.APARTMENT)),
      matchQueryFactory: (order) => ({
        space: {
          $exists: true,
          $lte: order.floor
        }
      })
    },
    {
      key: 'floor',
      type: 'input',
      templateOptions: {
        label: 'Apartment Floor',
        required: true,
        type: 'number'
      },
      priority: OrderPriority.SECOND,
      hideExpression: model => model.type !== OrderType.OFFER || model.propertyType !== PROPERTY_TYPE.APARTMENT,
      matchQueryFactory: (order) => ({
        minimumSpace: {
          $exists: true,
          $gte: order.minimumFloor
        }
      })
    }
  ],
  displayNameField: 'propertyType',
  displayNameMap: {
    [PROPERTY_TYPE.APARTMENT]: 'apartment',
    [PROPERTY_TYPE.HOUSE]: 'home'
  },
  imagePlaceholders: {
    [PROPERTY_TYPE.HOUSE]: 'https://platinumplusrealtyky.com/wp-content/uploads/2019/06/HousePlaceholder-5.png',
    [PROPERTY_TYPE.APARTMENT]: 'https://staticssl.ibsrv.net/aptratings/production/images/listing-placeholder.png'
  },
  newOrderNotificationFactory: order => ({
    notification: {
      ...NOTIFICATION_MOCK[0],
      body: `${order.propertyType} ${order.price || order.maximumPrice}`
    }
  })
}

