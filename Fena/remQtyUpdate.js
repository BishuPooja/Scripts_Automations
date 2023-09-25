const rp = require("request-promise");
const _ = require("lodash");
let FRT_PUB_BASE_URL = "https://apis.fretron.com";
const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTQ0OTUxODEsInVzZXJJZCI6Ijk3MTIyZGE4LWY1ZTEtNDVjZi05YmE4LWFiYmY2OTQzYWEyYyIsImVtYWlsIjoicG9vamEuYmlzaHVAZnJldHJvbi5jb20iLCJtb2JpbGVOdW1iZXIiOiI4NTY5OTc3OTE1Iiwib3JnSWQiOiIzZTRjZGVlOS0wYjNiLTQ2ZGQtOWI5OC1kZjBlMzhhMDI3MWMiLCJuYW1lIjoiUG9vamEgQmlzaHUiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.MeUywmvGd3YlixL-FIwEYr2C3VfgN0ERhYU2ozS0IcE";
var ordersToExclude = [];

async function task() {
  let orders = await getNext100Orders();
  let totalOrders = 0;
  let lastOrder = null;
  if (orders?.length == 100) {
    return orders;
    totalOrders += orders.length;
    await processOrders(orders);
    lastOrder = _.last(orders);
  }

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
  console.log(`Orders to exclude: ${JSON.stringify(ordersToExclude)}`);
}

async function getNext100Orders(offset) {
  let limit = 100;

  let filter = {
    status: ["CLOSED"],
    "lineItems.status": ["CLOSED"],
    orderType: ["Order", "MTROrder", "MarketOrder"],
  };

  let allFields = ["orderNumber", "uuid"];

  allFields = true;
  let url = `https://apis.fretron.com/shipment-view/sales/v2/orders?limit=${limit}&filters=${encodeURIComponent(
    JSON.stringify(filter)
  )}&source=${encodeURIComponent(JSON.stringify(allFields))}&byLineItems=true`;

  if (offset) {
    url += `&offset=${JSON.stringify(offset)}`;
  }

  // console.log(url);

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
    let url = `https://apis.fretron.com/order-manager-v2/sales-orders/v1/freightunits/extended/v2?orderId=${orderId}&lineItems=${orderLineItemIds.join(
      ","
    )}`;

    // console.log(url);
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
    console.log(
      `Some Error getting FU for orderId ${orderId} : | lineItemIds: ${orderLineItemIds.join(
        ","
      )} | Error ${res?.error}`
    );
  } catch (err) {
    console.log(
      `Some Error getting FU for orderId ${orderId} : | lineItemIds: ${orderLineItemIds} | Error ${err.message}`
    );
  }
  return [];
}

async function orderPut(payload) {
  try {
    let url = `https://apis.fretron.com/order-manager-v2/sales-orders/v1/order`;
    let res = await rp({
      uri: url,
      method: "PUT",
      json: true,
      body: payload,
      headers: {
        authorization: token,
      },
    });

    if (res?.status != 200) {
      console.log(`order Put Error ${res.status}`);
    } else {
      console.log(`order Updated Successfully  ${res.status}`);
    }
  } catch (e) {
    console.log(`Order Put Catched Error ${e.message}`);
  }
}

async function processOrders() {
  try {
    let orders = await task();
    let orderTotalQty = {};
    let consumedQty = {};
    let isRem = false;
    if (!orders?.length) {
      console.log(`Order Not Found`);
      return;
    }
    for (let order of orders) {
      let orderId = order?.uuid;
      let lineItems = order?.lineItems;
      let lineItemIds = [];
      for (let item of lineItems) {
        let lineItemId = item.uuid;
        lineItemIds.push(lineItemId);
        let netQty = item.loadInfo.standardMeasurement;
        orderTotalQty[`${item.uuid}`] = netQty;
      }
      let funits = await getFreightUnits(orderId, lineItemIds);
      if (!funits?.length) {
        console.log(`freight units Not Found For ${order?.orderNumber}`);
        continue;
      }
      if (funits) {
        for (let funit of funits) {
          if (!funit?.lineItems[0]?.salesOrderMappings?.length) {
            console.log(
              `salesOrderMappings Not Found For ${order?.orderNumber}`
            );
            continue;
          }
          for (let mappings of funit?.lineItems[0]?.salesOrderMappings) {
            let funitOrderId = mappings.orderId;
            if (funitOrderId == orderId) {
              let funitLineItemId = mappings.lineItemId;
              let funitQty = mappings?.quantity;
              consumedQty[`${funitLineItemId}`] = funitQty;

              let packageNetQty =
                orderTotalQty[`${funitLineItemId}`].packageMeasurement
                  .netQuantity;

              let consumedPackageNetQty =
                consumedQty[`${funitLineItemId}`].packageMeasurement
                  .netQuantity;

                  orderTotalQty[`${funitLineItemId}`].packageMeasurement.netQuantity=packageNetQty-consumedPackageNetQty

              console.log(
                orderTotalQty[`${funitLineItemId}`].packageMeasurement
                  .netQuantity);

              let weightNetQty =
                orderTotalQty[`${funitLineItemId}`].weight.netQuantity;
              let consumedWeightNetQty =
                consumedQty[`${funitLineItemId}`].weight.netQuantity;

              orderTotalQty[`${funitLineItemId}`].weight.netQuantity =
                weightNetQty - consumedWeightNetQty;

              if (
                orderTotalQty[`${funitLineItemId}`].packageMeasurement
                  .netQuantity ||
                orderTotalQty[`${funitLineItemId}`].packageMeasurement.weight
              ) {
                isRem = true;
              }
            }
          }
        }
      }

      if (isRem) {
        for (let key in orderTotalQty) {
          let orderItem = (order?.lineItems ?? []).find(
            ({ uuid }) => uuid == key
          );
          if (orderItem) {
            orderItem.remainingPlannedQuantity = orderTotalQty[`${key}`];
            orderItem.status = "PARTIALLY_PLANNED";
            console.log(`order No ${order.orderNumber}`);
          }
        }
      }
    }
  } catch (e) {
    console.log(`Catched Error In Process Orders ${e.message}`);
  }
}

processOrders();
