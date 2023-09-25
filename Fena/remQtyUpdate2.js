const rp = require("request-promise");
const _ = require("lodash");
let FRT_PUB_BASE_URL = "https://apis.fretron.com";
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTQ0OTUxODEsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIzZTRjZGVlOS0wYjNiLTQ2ZGQtOWI5OC1kZjBlMzhhMDI3MWMiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.MeUywmvGd3YlixL-FIwEYr2C3VfgN0ERhYU2ozS0IcE";
var ordersToExclude = [];

async function task() {
  let orders = await getNext100Orders();
  let totalOrders = 0;
  let lastOrder = null;
  // if (orders?.length == 100) {
    return orders;
    totalOrders += orders.length;
    await processOrders(orders);
    lastOrder = _.last(orders);
  // }
  console.log(`Total Orders till now: ${totalOrders}`);
  while (lastOrder && orders?.length) {
    let offset = [lastOrder.orderDate, lastOrder.uuid];
    orders = await getNext100Orders(offset);
    if (orders?.length) {
      totalOrders += orders.length;
      await processOrders(orders);
      lastOrder = _.last(orders);

      console.log(`Total Orders till now: ${totalOrders}`);
    }
  }
  return orders;
  // console.log(`Orders to exclude: ${JSON.stringify(ordersToExclude)}`);
}

async function getNext100Orders(offset) {
  let limit = 100;
  let filter = {
    status: ["CLOSED"],
    "lineItems.status": ["CLOSED"],
    orderType: ["Order", "MTROrder", "MarketOrder"],
  };


  allFields = true;
  let url = `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=${limit}&filters=${encodeURIComponent(
    JSON.stringify(filter)
  )}&source=${encodeURIComponent(JSON.stringify(allFields))}&byLineItems=true`;
  if (offset) {
    url += `&offset=${JSON.stringify(offset)}`;
  }
  return await rp({
    url: url,
    json: true,
    headers: {
      Authorization: token,
    },
  });
}

async function getFreightUnits(orderId, orderLineItemIds) {
  try {
    let url = `https://apis.fretron.com/order-manager-v2/sales-orders/v1/freightunits/extended/v2?orderId=${orderId}&lineItems=${orderLineItemIds.join(",")}`;
    let res = await rp({
      url: url,
      json: true,
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    if (res?.data?.freightUnits?.length) {
      return res.data.freightUnits;
    }
    console.log(`Some Error getting FU for orderId ${orderId} : | lineItemIds: ${orderLineItemIds.join(",")} | Error ${res?.error}`);
  } catch (err) {
    console.log(`Some Error getting FU for orderId ${orderId} : | lineItemIds: ${orderLineItemIds} | Error ${err.message}`);
  }
  return [];
}

async function updateOrder(order) {
  let options = {
      method: 'PUT',
      uri: `http://apis.fretron.com/order-manager-v2/v1/admin/sales-order`,
      headers: {
          'Content-Type': 'application/json'
      },
      body: order,
      json: true,
  }

  return rp(options)
      .then((_) => {
          if (_.status == 200)
              return _.data
          else {
              console.error(`Other then 200 while update order ${JSON.stringify(_)}`)
              return null
          }
      })
      .catch((e) => {
          console.log('Exception While Update Order\n' + e.message)
          return null
      })
}
async function processOrders() {
  try {
    let orders = await task();
    for (let order of orders) {
      let orderTotalQty = {};
      let orderId = order?.uuid;
      let lineItems = order?.lineItems;
      let lineItemIds = []
      for (let item of lineItems) {
        let lineItemId = item.uuid;
        lineItemIds.push(lineItemId)
        let qty = item.loadInfo.standardMeasurement;
        orderTotalQty[lineItemId] = qty;
      }
      let remaingQtyByItem = JSON.parse(JSON.stringify(orderTotalQty));
      let needToUpdateOrder = false
      let funits = await getFreightUnits(orderId, lineItemIds);
      for (let funit of funits) {
        for (let mappings of funit?.lineItems[0]?.salesOrderMappings) {
          let funitOrderId = mappings.orderId;
          if (funitOrderId == orderId) {
            let funitLineItemId = mappings.lineItemId;
            let itemConsumedQty = mappings?.quantity;
            let itemRemainingQty = remaingQtyByItem[funitLineItemId]
            let packageMeasurementNetQty = (orderTotalQty[funitLineItemId]['packageMeasurement']?.netQuantity ?? 0) - (itemConsumedQty?.packageMeasurement?.netQuantity ?? 0)
            itemRemainingQty['packageMeasurement'].netQuantity = packageMeasurementNetQty
            let weightNetQty = (orderTotalQty[funitLineItemId]['weight']?.netQuantity ?? 0) - (itemConsumedQty?.weight?.netQuantity ?? 0)
            itemRemainingQty['weight'].netQuantity = weightNetQty
            if (weightNetQty || packageMeasurementNetQty) { needToUpdateOrder = true }
          }
        }
      }
      for (let key in remaingQtyByItem) {
        let remQtyObj = remaingQtyByItem[key]
        let orderItem = (order?.lineItems ?? []).find(({ uuid }) => uuid == key );
        if (orderItem) {
          orderItem.remainingPlannedQuantity = remQtyObj
          orderItem.status = "PARTIALLY_PLANNED";
        }
      }
      if (needToUpdateOrder) {
        order.status = "OPEN"
        order.secondaryStatus = "PLACED"
        console.log(`order No ${order.orderNumber}`);
        await updateOrder(order)
      }
      break;
    }
  } catch (e) {
    console.log(`Catched Error In Process Orders ${e.message}`);
  }
}

processOrders();