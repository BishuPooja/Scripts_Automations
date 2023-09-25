const rp = require("request-promise");
const _ = require("lodash");
const $event = {
  "salesOrderId": null,
  "fuLineItemIds": null,
  "pod": null,
  "customFields": [
    {
      "indexedValue": [
        "Ship to Party_1010003294"
      ],
      "fieldKey": "Ship to Party",
      "multiple": false,
      "description": null,
      "remark": null,
      "uuid": null,
      "required": false,
      "accessType": null,
      "input": null,
      "unit": null,
      "valueType": "string",
      "options": null,
      "fieldType": "string",
      "value": "1010003294",
      "isRemark": false
    },
    {
      "indexedValue": [
        "Delay Days_000"
      ],
      "fieldKey": "Delay Days",
      "multiple": false,
      "description": null,
      "remark": null,
      "uuid": null,
      "required": false,
      "accessType": null,
      "input": null,
      "unit": null,
      "valueType": "string",
      "options": null,
      "fieldType": "string",
      "value": "000",
      "isRemark": false
    }
  ],
  "loadInfo": {
    "material": "N/A",
    "valueOfGoods": 0,
    "standardMeasurement": {
      "volume": null,
      "packageMeasurement": {
        "actualDeliveredQuantity": null,
        "density": null,
        "netQuantity": 0,
        "moisture": null,
        "claimQuantity": null,
        "unitOfMeasurment": "MT",
        "standardQuantity": 0,
        "actualLoadedQuantity": null,
        "measurmentType": null,
        "grossQuantity": 0,
        "shortage": null,
        "temperature": null,
        "plannedLoadQuantity": null,
        "frieghtDeductableQuantity": null
      },
      "weight": null,
      "containers": null,
      "trucks": null
    },
    "currency": null,
    "measurements": [
      {
        "actualDeliveredQuantity": null,
        "density": null,
        "netQuantity": 0,
        "moisture": null,
        "claimQuantity": null,
        "unitOfMeasurment": "MT",
        "standardQuantity": 0,
        "actualLoadedQuantity": null,
        "measurmentType": null,
        "grossQuantity": 0,
        "shortage": null,
        "temperature": null,
        "plannedLoadQuantity": null,
        "frieghtDeductableQuantity": null
      }
    ]
  },
  "customerPsnNo": null,
  "invoiceValue": "0.0",
  "updates": {
    "traceID": "19ca6002-e743-4549-bc01-5b54d5cf014f",
    "resourceId": "6c1f832d-3210-4f72-b229-1e8724f5f03c",
    "updatedBy": "SYSTEM",
    "changes": null,
    "sourceOfInformation": null,
    "description": null,
    "forwardReasons": [
      "ensure.lineitem.and.mapping"
    ],
    "userId": null,
    "uuid": "72618966-1d46-4315-a210-6c2b349dab18",
    "revision": 28,
    "time": 1680509051087,
    "forwardedFrom": null,
    "resourceType": "Consignment",
    "updateType": null
  },
  "uuid": "6c1f832d-3210-4f72-b229-1e8724f5f03c",
  "orgId": "d255a000-f271-489e-9408-b9fb7d592b44",
  "consigner": {
    "geoFence": null,
    "documents": [],
    "customFields": null,
    "isPortalEnabled": false,
    "type": "customer",
    "updates": null,
    "uuid": "b2d910b5-81c9-4dbb-9968-4e57d851fa62",
    "orgId": "d255a000-f271-489e-9408-b9fb7d592b44",
    "firmType": "INDIVISUAL",
    "gstn": null,
    "voterId": null,
    "verificationTicketId": null,
    "group": {
      "name": "Consignor",
      "partnerType": null,
      "uuid": null,
      "orgId": null
    },
    "address": "{\"address\":\"\",\"city\":null,\"state\":null,\"pincode\":null}",
    "verificationStatus": "unverified",
    "externalId": "SP1200",
    "panNumber": null,
    "aadharNo": null,
    "parentId": null,
    "places": [
      {
        "hubId": null,
        "boundary": null,
        "address": "36A, Sirsa Rd, BHP colony, Industrial Area, Hisar, Haryana 125011, India",
        "accessibility": "public",
        "addedBy": "d255a000-f271-489e-9408-b9fb7d592b44",
        "center": {
          "latitude": 29.1301033,
          "longitude": 75.7728275
        },
        "suggestedRadius": 500,
        "isOwned": false,
        "centerCoordinates": [
          75.7728275,
          29.1301033
        ],
        "placeId": "c4e30b95-ab33-45c6-9c24-bfedf6da5477",
        "geoJsonBoundry": null,
        "externalId": null,
        "source": "FRETRON",
        "places": null,
        "viewport": null,
        "district": null,
        "name": "Jindal Stainless Limited-CRD",
        "state": null,
        "category": "Manufacturing Plant/Factory/Yard",
        "subDistrict": null,
        "controllingBranchId": null
      }
    ],
    "route": null,
    "name": "JSHL-CRD",
    "location": null,
    "fretronId": null,
    "contacts": null,
    "status": "ACTIVE"
  },
  "lineItems": [
    {
      "itemNumber": "1",
      "transportationServiceId": null,
      "material": {
        "unitOfMeasurement": null,
        "measuredQuantity": null,
        "partnerName": null,
        "materialType": null,
        "externalId": null,
        "updates": null,
        "taxCode": null,
        "uuid": "FAKE",
        "orgId": null,
        "pricePerUnit": null,
        "materialDescription": null,
        "division": null,
        "controlCode": null,
        "materialGroup": null,
        "materialGroupId": null,
        "name": "N/A",
        "measurementType": null,
        "partnerId": null,
        "linkedMaterialId": null
      },
      "valueOfGoods": null,
      "customFields": null,
      "externalId": null,
      "invoiceNo": null,
      "customerMaterial": null,
      "uuid": "a378bc2d-3717-4530-b317-9e848bdc52f4"
    }
  ],
  "pssNo": null,
  "eWayBillNumber": null,
  "billingType": null,
  "podDocument": null,
  "invoiceNo": null,
  "deliveryDate": null,
  "associatedShipments": [
    "82924d6b-c0b1-42ef-a99e-2e4b8070eb18"
  ],
  "originalEdd": null,
  "consignee": {
    "geoFence": null,
    "documents": [],
    "customFields": null,
    "isPortalEnabled": false,
    "type": "customer",
    "updates": null,
    "uuid": "6031afa1-9283-4409-a9ee-e3532d71b5c6",
    "orgId": "d255a000-f271-489e-9408-b9fb7d592b44",
    "firmType": "INDIVISUAL",
    "gstn": null,
    "voterId": null,
    "verificationTicketId": null,
    "group": {
      "name": "Consignee",
      "partnerType": null,
      "uuid": null,
      "orgId": null
    },
    "address": "{\"address\":null,\"city\":null,\"state\":null,\"pincode\":null}",
    "verificationStatus": "unverified",
    "externalId": "1010003294",
    "panNumber": null,
    "aadharNo": null,
    "parentId": null,
    "places": [
      {
        "hubId": null,
        "boundary": null,
        "address": "No. 208, Arakkonam Road,,,Sengadu, Sriperumbudur Taluk,,,602002,Tamil Nadu",
        "accessibility": "public",
        "addedBy": "495b8728-c761-4fa7-83fe-db75a7d63221",
        "center": {
          "latitude": 14.0897217,
          "longitude": 79.2291383
        },
        "suggestedRadius": 500,
        "isOwned": false,
        "centerCoordinates": [
          79.2291383,
          14.0897217
        ],
        "placeId": null,
        "geoJsonBoundry": null,
        "externalId": null,
        "source": "FRETRON",
        "places": null,
        "viewport": null,
        "district": null,
        "name": "JOHNSON LIFTS PVT.LTD. - Kanchipuram",
        "state": null,
        "category": "Pick up - Delivery Area",
        "subDistrict": null,
        "controllingBranchId": null
      }
    ],
    "route": null,
    "name": "JOHNSON LIFTS PVT.LTD. - Kanchipuram",
    "location": null,
    "fretronId": null,
    "contacts": [
      {
        "emails": [],
        "address": null,
        "mobileNumbers": [],
        "mobileNumber": null,
        "name": "K Krishna Chaitanya",
        "type": null
      },
      {
        "emails": [
          "gokul@johnsonliftsltd.com"
        ],
        "address": null,
        "mobileNumbers": [
          "044-26490446"
        ],
        "mobileNumber": null,
        "name": "JOHNSON LIFTS PVT.LTD.",
        "type": null
      },
      {
        "emails": [
          "keerthish.ballal@jindalstainless.com "
        ],
        "address": null,
        "mobileNumbers": [],
        "mobileNumber": null,
        "name": "KEERTHISH V BALLAL",
        "type": null
      },
      {
        "emails": [
          "keerthish.ballal@jindalstainless.com "
        ],
        "address": null,
        "mobileNumbers": [],
        "mobileNumber": null,
        "name": "KEERTHISH V BALLAL (KAM)",
        "type": null
      }
    ],
    "status": "ACTIVE"
  },
  "address": null,
  "edd": null,
  "salesOffice": null,
  "consignmentDate": 1680406266077,
  "externalId": "0558064594_6100048276",
  "eWayBillExpiryDate": null,
  "activeShipment": "82924d6b-c0b1-42ef-a99e-2e4b8070eb18",
  "consignmentNo": "8100376354",
  "currentLocation": {
    "latitude": 0,
    "longitude": 29.067466666666668
  },
  "billToParty": null,
  "equipments": null,
  "orderMappings": [
    {
      "quantity": {
        "volume": null,
        "packageMeasurement": {
          "actualDeliveredQuantity": null,
          "density": null,
          "netQuantity": 0,
          "moisture": null,
          "claimQuantity": null,
          "unitOfMeasurment": "MT",
          "standardQuantity": 0,
          "actualLoadedQuantity": null,
          "measurmentType": null,
          "grossQuantity": 0,
          "shortage": null,
          "temperature": null,
          "plannedLoadQuantity": null,
          "frieghtDeductableQuantity": null
        },
        "weight": null,
        "containers": null,
        "trucks": null
      },
      "orderId": null,
      "lineItemId": null,
      "legType": null,
      "consignmentId": null,
      "originLegId": null,
      "isFullyUtilized": null,
      "consignmentLineItemId": "a378bc2d-3717-4530-b317-9e848bdc52f4",
      "source": null,
      "containerId": null,
      "uuid": "e3562441-0273-4e9f-8a84-29b2f552002a",
      "fuMappings": null
    }
  ],
  "contractId": null,
  "workOrderNumber": null,
  "trackingStatus": "In Transit to JOHNSON LIFTS PVT.LTD. - Kanchipuram",
  "eWayBillRegistrationDate": null,
  "contractToParty": null,
  "invoiceStatus": null,
  "poNumber": null,
  "status": "In Transit"
};

const FRT_PUB_BASE_URL = "https://apis.fretron.com";
const token = "";
const moment = require("moment");
async function main() {

  try {
    const consigneeIds = [
      "1090000231",
      "1090000212",
      "1090000178",
      "1090000113",
      "1090000118",
      "1090000116",
      "1030000168",
      "1030000020",
      "1030000010",
      "1030000073",
      "1030000016",
      "1030000015",
      "1030000248",
      "1030000077",
    ];

    const cn = $event;

    let cnNo = cn.consignmentNo;
    let cosigneeExternalId = cn.consignee.externalId
    /*Check if consignee's external id match with consigneeIds
        1. If Match then trigger mail
        2. Else log consignee external id does not match
    */
    let matchId = consigneeIds.includes(cosigneeExternalId)
    if (matchId) {
      console.log(`Executing for consignment ${cnNo}`);
      var uuid = cn?.associatedShipments?.[0];

      if (!uuid) {
        console.log("Shipment Id not found.... Cannot map details");
        return;
      }
      let sh = await shipmentGET(uuid, token);

      if (!sh) return;

      let cfs = sh.customFields;

      let foNumber =
        cfs?.find(({ fieldKey }) => fieldKey === "FO Number")?.value ?? "";

      let vehicleNumber = sh.fleetInfo.vehicle.vehicleRegistrationNumber;
      let externalId = cn.consignee.externalId;

      var lastStage = _.last(sh.shipmentStages);

      let vehiclearrivalTime = lastStage.arrivalTime;

      let vehicleReportingDate = vehiclearrivalTime
        ? new Date(vehiclearrivalTime + 19800000).toLocaleString()
        : "";

      let unloadingStartTime = lastStage.actualActivityStartTime;

      let unloadingStartDate = unloadingStartTime
        ? new Date(unloadingStartTime + 19800000).toLocaleString()
        : "";

      let unloadingFinishTime = lastStage.actualActivityEndTime;

      let unloadingFinishDate = unloadingFinishTime
        ? new Date(unloadingFinishTime + 19800000).toLocaleString()
        : "";

      const POD = await ensurePod(cn.uuid, token);
      var frontUrl = "";
      var backUrl = "";
      var shortage_damaged_list = "";
      if (!POD) {
      } else {
        frontUrl =
          POD.documents?.find(({ name }) => name.includes("Front_"))?.value ?? "";
        backUrl =
          POD.documents?.find(({ name }) => name.includes("Back_"))?.value ?? "";

        let shortDamageMap = {};

        for (let items of POD.deliveryItems) {
          if (items.issues.includes("Shortage")) {
            shortDamageMap["Shortage"] = {};
            shortDamageMap["Shortage"]["url"] = items.documents[0].downloadUrl;
            shortDamageMap["Shortage"]["amount"] = items.estimatedShortageAmount;
            shortDamageMap["Shortage"]["remarks"] = items.remarks;
            shortDamageMap["Shortage"]["shortageReason"] = items.shortageReason;
          }

          if (items.issues.includes("Damaged")) {
            shortDamageMap["Damaged"] = {};
            shortDamageMap["Damaged"]["url"] = items.documents[0].downloadUrl;
            shortDamageMap["Damaged"]["amount"] = items.estimatedDamangedAmount;
            shortDamageMap["Damaged"]["remarks"] = items.remarks;
            shortDamageMap["Damaged"]["damageReason"] = items.damageReason;
          }
        }

        if (Object.keys(shortDamageMap).length) {
          for (let key in shortDamageMap) {
            let obj = shortDamageMap[key];
            shortage_damaged_list += `
                                    <ul>
                                    <li>Type- ${key}</li>
                                    <li>Amount ${key}- ${obj.amount}</li>
            `;
            if (obj.url) {
              shortage_damaged_list += `<li>Attachment Link- <a href="${obj.url}">Attachment</a></li>`;
            }
            if (obj.remarks) {
              shortage_damaged_list += `<li>Remarks- ${obj.remarks}</li>`;
            }
            if (obj.shortageReason) {
              shortage_damaged_list += `<li>Shortage Reason- ${obj.shortageReason}</li>`;
            }
            if (obj.damageReason) {
              shortage_damaged_list += `<li>Damaged Reason- ${obj.damageReason}</li>`;
            }
            shortage_damaged_list += "</ul>";
          }
        }
      }
      frontUrl = frontUrl ? `<a href="${frontUrl}">E-POD Front</a>` : "";
      backUrl = backUrl ? `<a href="${backUrl}">E-POD Back</a>` : "";
      var html = `
                <html>
                <body>
                <p>Dear sir,</p>
                <p>Greetings from Fretron!</p>
                <br />
                <p>Please find below the details of E-POD completion of consignment ${cnNo} along with neccessary details.</p>
                <br />
                <ul>
                <li><b>FO Number</b>- ${foNumber}</li>
                <li><b>Vehicle Number</b>- ${vehicleNumber}</li>
                <li><b>Consignment Number</b>- ${cnNo}</li>
                <li><b>Ship to Party External Id</b>- ${externalId}</li>
                <li><b>Vehicle Reporting Date</b>- ${vehicleReportingDate}</li>
                <li><b>Unloading Start Date</b>- ${unloadingStartDate}</li>
                <li><b>Unloading Finish Date</b>- ${unloadingFinishDate}</li>
                <li><b>E-POD</b>- ${frontUrl} ${backUrl}</li>
                <li><b>Short/Damage Details</b>-</li>
                ${shortage_damaged_list}
                </ul>
                </body>
                </html>
      `;

      const subject = `FRETRON <> JSL E-POD Submission ${moment(
        Date.now() + 19800000
      ).format("DD-MM-YY")} `;
      const to = [];
      const cc = [];

      //Call Mailer function
      let mailerRes = await mailer(to, cc, subject, html);
      async function mailer(to, cc, subject, html) {
        try {
          var url = `${FRT_PUB_BASE_URL}/notifications/emails/email`;

          var options = {
            uri: url,
            method: "post",
            json: true,
            body: {
              to: to,
              cc: cc,
              subject: subject,
              html: html,
              content: "",
            },
          };

          return await rp(options);
        } catch (error) {
          console.log(`Some error sending mail ${error.message}`);
          return null;
        }
      }

      async function shipmentGET(uuid, token) {
        try {
          var url = `${FRT_PUB_BASE_URL}/shipment/v1/shipment/${uuid}?skipCn=true`;

          var options = {
            url: url,
            method: "get",
            json: true,
            headers: {
              Authorization: token,
            },
          };

          let res = await rp(options);

          if (res.error) {
            console.log(`Error in fetching shipment ${res.error}`);
          }
        } catch (error) {
          console.log(`Some error in getting shipment ${error.message}`);

          return null;
        }
      }

      async function ensurePod(uuid, token) {
        try {
          var url = `${FRT_PUB_BASE_URL}/pod/v1/action/ensure-pod?consignmentId=${uuid}`;

          var options = {
            uri: url,
            method: "get",
            json: true,
            headers: {
              Authorization: token,
            },
          };

          let response = await rp(options);

          if (response.error) {
            console.log(`Error in getting POD from reponse ${response.error}`);
            return null;
          }

          return response.data;
        } catch (error) {
          console.log(`Some error in getting POD ${error.message}`);
        }
      }
    }
    else {
      console.log(`consignee external id does not match for this consignment ${cnNo}`);
    }

  } catch (error) {
    console.log(`Some error executing automation ${error.message}`);
  }
}

main()
