const rp = require("request-promise");
const FRT_PUB_BASE_URL = "https://apis.fretron.com";
const TOKEN =
  "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTU2MjgwOTAsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiYzI0ZjdjOTEtMzBiYS00NTMzLWI4NmQtOWVjYTY0NGU2NjA1IiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.-iK8iiWVwkg1boobjfzptu7Sj8B_iDTUKxaWWjKoZHU";

const orgData = [
  {
    _id: "90444766-788f-47bc-920a-1f4a3a61b26c",

    uuid: "90444766-788f-47bc-920a-1f4a3a61b26c",

    buisnessPartnerId: "b18c90b8-8b02-44f1-ba05-f829684fc065",
  },

  {
    _id: "1c4cc9db-5bb1-41bb-92c3-677b9ebc84d5",

    uuid: "1c4cc9db-5bb1-41bb-92c3-677b9ebc84d5",

    buisnessPartnerId: "030f56ff-94f5-4d4d-9d87-c9f0b1ca6c88",
  },

  {
    _id: "a92bfc9b-1265-4e54-b0c0-10cd0ac13711",

    uuid: "a92bfc9b-1265-4e54-b0c0-10cd0ac13711",

    buisnessPartnerId: "c218bab8-dc07-4d78-9314-bdb6b613448d",
  },

  {
    _id: "817c9e7d-32e0-4074-98ec-8119d6b7b8e5",

    uuid: "817c9e7d-32e0-4074-98ec-8119d6b7b8e5",

    buisnessPartnerId: "f1ee343c-00ab-465b-b883-38ee0baa3c96",
  },

  {
    _id: "947a1576-aea8-481f-b6fc-d87dfbd84ee1",

    uuid: "947a1576-aea8-481f-b6fc-d87dfbd84ee1",

    buisnessPartnerId: "f3fc18f6-d5bc-4b5e-a5c6-e0f751c2ee67",
  },

  {
    _id: "dd0895b5-aec8-4555-ba46-f4078f898060",

    uuid: "dd0895b5-aec8-4555-ba46-f4078f898060",

    buisnessPartnerId: "257a58cb-d6c1-4625-ac4f-069b16583197",
  },

  {
    _id: "a850fbda-2dde-4e79-ab67-1ea783173899",

    uuid: "a850fbda-2dde-4e79-ab67-1ea783173899",

    buisnessPartnerId: "0870c639-2f86-4606-ac9d-5b794e8ab7d4",
  },

  {
    _id: "50f4e386-c6d8-41df-979f-6d5fb9c97c47",

    uuid: "50f4e386-c6d8-41df-979f-6d5fb9c97c47",

    buisnessPartnerId: "4f7399e7-fe88-4745-9a2a-5a7f95418894",
  },

  {
    _id: "18a4f2c2-d0da-4f24-88d9-cec349e2d4a1",

    uuid: "18a4f2c2-d0da-4f24-88d9-cec349e2d4a1",

    buisnessPartnerId: "fcaa1cc3-d9e6-45b8-b91d-b350fb37a523",
  },

  {
    _id: "45114e10-9e3c-4ae8-a73d-ba7a7f363b8a",

    uuid: "45114e10-9e3c-4ae8-a73d-ba7a7f363b8a",

    buisnessPartnerId: "6b05e1b0-326d-453f-b572-30d816eca375",
  },

  {
    _id: "8058e610-e7d6-4fc0-9445-0f720ceb5871",

    uuid: "8058e610-e7d6-4fc0-9445-0f720ceb5871",

    buisnessPartnerId: "ac8f3ebb-6f71-426a-ad5e-1af293eb5dcb",
  },

  {
    _id: "b0763ea6-d50e-4cf7-8151-f8ac8b3c6327",

    uuid: "b0763ea6-d50e-4cf7-8151-f8ac8b3c6327",

    buisnessPartnerId: "3a388b2a-3916-4c22-b4f6-5bfbb1b7513a",
  },

  {
    _id: "0bf1637a-c8f4-4583-aab1-5a3742dbed80",

    uuid: "0bf1637a-c8f4-4583-aab1-5a3742dbed80",

    buisnessPartnerId: "ed2cde9a-4402-4a5c-b3df-8fdadc3280a4",
  },

  {
    _id: "c3a1b63d-2dc5-4b14-8079-3ab29274b69a",

    uuid: "c3a1b63d-2dc5-4b14-8079-3ab29274b69a",

    buisnessPartnerId: "d6b600e8-52b1-4d56-b447-5d1ab0a38587",
  },

  {
    _id: "a1316c2f-e19a-4f0e-b036-6bf53dbebd35",

    uuid: "a1316c2f-e19a-4f0e-b036-6bf53dbebd35",

    buisnessPartnerId: "2e617ec5-cc53-478c-8d72-be7a1e1d7415",
  },

  {
    _id: "e2d54372-89da-4890-b119-a938e642687e",

    uuid: "e2d54372-89da-4890-b119-a938e642687e",

    buisnessPartnerId: "25f3c5fc-fc64-415d-9e3d-68b07a77ae5b",
  },

  {
    _id: "f47d0306-970f-4e4a-a412-b8a558f64122",

    uuid: "f47d0306-970f-4e4a-a412-b8a558f64122",

    buisnessPartnerId: "c9c0987f-cd91-437e-be96-be85e62a9d16",
  },

  {
    _id: "484ce40b-df8e-4e51-a081-63ca714f5c56",

    uuid: "484ce40b-df8e-4e51-a081-63ca714f5c56",

    buisnessPartnerId: "f5219c45-694a-462e-8296-aec98fd7e35e",
  },

  {
    _id: "92c60c6b-111d-440b-8888-fd7896feb08c",

    uuid: "92c60c6b-111d-440b-8888-fd7896feb08c",

    buisnessPartnerId: "83453321-0d33-4b1a-8e9c-3a03ec885b00",
  },

  {
    _id: "36152822-12ee-4bc1-9db4-1843561d7681",

    uuid: "36152822-12ee-4bc1-9db4-1843561d7681",

    buisnessPartnerId: "c936298c-e669-41e5-8c74-8a4f22857654",
  },

  {
    _id: "3cde3306-167a-400f-a99c-31863f982d22",

    uuid: "3cde3306-167a-400f-a99c-31863f982d22",

    buisnessPartnerId: "86444cdf-53d7-4a99-8163-e816e89ec112",
  },

  {
    _id: "d17f43d6-6c68-4681-a7e2-91ff74e012a1",

    uuid: "d17f43d6-6c68-4681-a7e2-91ff74e012a1",

    buisnessPartnerId: "ee29c5f7-cd37-4f09-89ea-0b9797160009",
  },

  {
    _id: "8bb72797-0040-4e5e-89a0-bd00e0ffb901",

    uuid: "8bb72797-0040-4e5e-89a0-bd00e0ffb901",

    buisnessPartnerId: "e985c7d3-ad26-4fe6-9586-685a2e5e71f8",
  },

  {
    _id: "bc7308d9-e0a4-4e84-8b85-5d643141533b",

    uuid: "bc7308d9-e0a4-4e84-8b85-5d643141533b",

    buisnessPartnerId: "331e0078-1076-4b55-bd3f-54acf01f8287",
  },

  {
    _id: "2f9cbb36-405c-41b8-869a-81c97dec0d88",

    uuid: "2f9cbb36-405c-41b8-869a-81c97dec0d88",

    buisnessPartnerId: "657238f0-4f09-4666-a26b-c662c22bdcb1",
  },

  {
    _id: "a80512f8-d28a-4f72-b45c-cf9651cf47ee",

    uuid: "a80512f8-d28a-4f72-b45c-cf9651cf47ee",

    buisnessPartnerId: "eee49518-c75b-4e2f-a207-aee6e3de8837",
  },

  {
    _id: "ed737b63-05ea-457b-9eb8-d27f323e5c18",

    uuid: "ed737b63-05ea-457b-9eb8-d27f323e5c18",

    buisnessPartnerId: "96cdff10-67b9-4920-bf26-5276497314c0",
  },

  {
    _id: "a55b6cba-2ad3-4a0f-87da-0401864f29a9",

    uuid: "a55b6cba-2ad3-4a0f-87da-0401864f29a9",

    buisnessPartnerId: "edcf8c9d-117d-47ff-b4b4-17d527947565",
  },

  {
    _id: "3ceb3351-ba42-459d-afa9-16cd4bf883b5",

    uuid: "3ceb3351-ba42-459d-afa9-16cd4bf883b5",

    buisnessPartnerId: "44c21450-77f6-4c2e-a786-838a7358e600",
  },

  {
    _id: "8b6f41c0-495e-46ef-aa24-b19be10d28a2",

    uuid: "8b6f41c0-495e-46ef-aa24-b19be10d28a2",

    buisnessPartnerId: "20e93384-2441-4ad9-887b-cf425d34659c",
  },

  {
    _id: "d2bdc2ae-2875-442a-8229-a48997f4f47d",

    uuid: "d2bdc2ae-2875-442a-8229-a48997f4f47d",

    buisnessPartnerId: "89edb6f8-fdd2-462c-bbac-5d1d0dd2a2ea",
  },

  {
    _id: "c44d3866-f0df-4acf-bcd1-963a1da95ddc",

    uuid: "c44d3866-f0df-4acf-bcd1-963a1da95ddc",

    buisnessPartnerId: "a2f68b6a-c5e3-495b-a899-44fba9a6c810",
  },

  {
    _id: "7b884da6-84d9-4891-b35e-342500082633",

    uuid: "7b884da6-84d9-4891-b35e-342500082633",

    buisnessPartnerId: "5f7dbd33-7570-4d2a-baf4-90757867bc1b",
  },

  {
    _id: "3d975b54-d710-4e44-9f3c-468b42eb5c62",

    uuid: "3d975b54-d710-4e44-9f3c-468b42eb5c62",

    buisnessPartnerId: "56e79981-e74d-4c2f-aa9d-ea1be224eedb",
  },

  {
    _id: "89a65f6b-57ab-4ca1-82fc-a8ab210697ca",

    uuid: "89a65f6b-57ab-4ca1-82fc-a8ab210697ca",

    buisnessPartnerId: "a013b9d2-0b7e-4b5d-b971-430ce5b761f7",
  },

  {
    _id: "ee786488-f2fb-4704-9bbd-25b8e3aa766c",

    uuid: "ee786488-f2fb-4704-9bbd-25b8e3aa766c",

    buisnessPartnerId: "c612c55e-7fc7-4e51-b7ed-0db1410e8465",
  },

  {
    _id: "37b348e8-98a6-4493-bbaa-66d01b4ad432",

    uuid: "37b348e8-98a6-4493-bbaa-66d01b4ad432",

    buisnessPartnerId: "60f3ce82-b9be-4d9e-ab3b-f20e75f6ccea",
  },

  {
    _id: "b2caeb24-1206-43ef-940a-894d26b18c2a",

    uuid: "b2caeb24-1206-43ef-940a-894d26b18c2a",

    buisnessPartnerId: "7aa71f9d-b1ac-49b9-a522-47c1928dc7ec",
  },

  {
    _id: "65ccd250-1620-473c-b839-891ccc150f8d",

    uuid: "65ccd250-1620-473c-b839-891ccc150f8d",

    buisnessPartnerId: "21b84ed5-07d2-4bd6-b4e9-610179bfebc1",
  },

  {
    _id: "817f05e3-7264-45f6-a125-08d51802878e",

    uuid: "817f05e3-7264-45f6-a125-08d51802878e",

    buisnessPartnerId: "5f94ac47-2a2b-4469-9f75-74a1d9c8bd4e",
  },

  {
    _id: "1ffef4a1-ae6a-49e6-97af-557015b23ae9",

    uuid: "1ffef4a1-ae6a-49e6-97af-557015b23ae9",

    buisnessPartnerId: "42086c9a-32bd-4357-bfd7-d4c6bc747530",
  },

  {
    _id: "3f1550d5-e038-45b3-9121-a1cb742fb40f",

    uuid: "3f1550d5-e038-45b3-9121-a1cb742fb40f",

    buisnessPartnerId: "f7963767-3a00-4609-a012-61c5fa86fcec",
  },

  {
    _id: "c35e4ca7-dbe7-4928-ac66-fda22d35bd93",

    uuid: "c35e4ca7-dbe7-4928-ac66-fda22d35bd93",

    buisnessPartnerId: "93b882ba-4b82-475e-9733-7ab44955c0b6",
  },

  {
    _id: "227ef263-5543-44ce-b0e0-7a16e58372f0",

    uuid: "227ef263-5543-44ce-b0e0-7a16e58372f0",

    buisnessPartnerId: "31e4719e-a51f-419f-9d1e-26f5b8f2fc21",
  },

  {
    _id: "b2016693-10e1-468f-97ac-adf8de7bb35b",

    uuid: "b2016693-10e1-468f-97ac-adf8de7bb35b",

    buisnessPartnerId: "36d00594-6f68-4f2f-be65-af3de3d3890b",
  },

  {
    _id: "600a55c1-c855-412f-a05f-a0266c2e0e09",

    uuid: "600a55c1-c855-412f-a05f-a0266c2e0e09",

    buisnessPartnerId: "93b882ba-4b82-475e-9733-7ab44955c0b6",
  },

  {
    _id: "fc0d5928-1db1-4de9-99d1-d02b15d76c79",

    uuid: "fc0d5928-1db1-4de9-99d1-d02b15d76c79",

    buisnessPartnerId: "72963d3f-6242-4836-8cf9-244d1ccb3b05",
  },

  {
    _id: "1cd947ac-4376-4eae-a74c-a0c9d18fe27a",

    uuid: "1cd947ac-4376-4eae-a74c-a0c9d18fe27a",

    buisnessPartnerId: "078a7b02-22f2-41ab-a72f-b4c362b0c22d",
  },

  {
    _id: "fae77f36-3109-45b2-8380-3efba9b49d8c",

    uuid: "fae77f36-3109-45b2-8380-3efba9b49d8c",

    buisnessPartnerId: "c746d533-db84-4193-9f7f-9e2e47c1b3df",
  },

  {
    _id: "8ba2d52e-7b6a-4279-99c4-2ce16fcc81c4",

    uuid: "8ba2d52e-7b6a-4279-99c4-2ce16fcc81c4",

    buisnessPartnerId: "2e6e74d5-bf1f-427f-a9fb-defd4706c0c9",
  },

  {
    _id: "412b1506-c778-403c-8b8b-e946eb045e61",

    uuid: "412b1506-c778-403c-8b8b-e946eb045e61",

    buisnessPartnerId: "3d4e828e-f0c7-4853-ba9a-71f0c3d85b2b",
  },

  {
    _id: "cc02de36-b517-4fee-bbd6-2838289210dd",

    uuid: "cc02de36-b517-4fee-bbd6-2838289210dd",

    buisnessPartnerId: "a06aaa8c-f21f-4466-86c5-970df544f071",
  },

  {
    _id: "aab5e04f-a123-48c9-ad51-ce22e92eb1be",

    uuid: "aab5e04f-a123-48c9-ad51-ce22e92eb1be",

    buisnessPartnerId: "6a64cb60-63f1-4131-a6c8-abd00d9d28f3",
  },
];

async function getPartnerDetials(partnerId) {
  try {
    let filters = {
      type: [],
      isPortalEnabled: [],
      group: [],
      city: [],
      status: [],
      verificationStatus: [],
      _customeField: {},
      "parentId.keyword": [`${partnerId}`],
    };
    let url = `http://apis.fretron.com/business-partners/v2/admin/partners?key=parentId&value=${partnerId}`;
    console.log(url);
    let res = await rp({
      uri: url,
      method: "GET",
      json: true,
    });
    if (res?.status != 200) {
      console.log(`Fetch PatnerDetials Error ${res.error}`);
    }
    return res.data;
  } catch (e) {
    console.log(`Catched Error in Get Bp data ${e.message}`);
  }
  return null;
}

async function updateOrgData(payload) {
  try {
    let url = `${FRT_PUB_BASE_URL}/organisations/v1/admin/saveforward/organisations`;
    let res = await rp({
      uri: url,
      method: "POST",
      json: true,
      body: payload,
      headers: {
        authorization: TOKEN,
      },
    });

    return res;
  } catch (e) {
    console.log(`Catched Error in Udpating Org Data ${e.message}`);
  }
}

async function getOrgDeitailsbyId(orgId) {
  try {
    let url = `https://apis.fretron.com/organisations/v1/admin/organisation?key=uuid&value=${orgId}&expandAll=true`;
    let res = await rp({
      uri: url,
      method: "GET",
      json: true,
    });
    if (res?.status != 200) {
      console.log(`Fetch OrgData error ${res.error}`);
    } else {
      return res?.data;
    }
  } catch (e) {
    console.log(`Catched Error While Getting OrgName ${e.message}`);
  }
  return null;
}

async function main() {
  try {
    for (let orgDetail of orgData) {
      let orgDetialRes = await getOrgDeitailsbyId(orgDetail._id);
      //   console.log(orgDetialRes);
      let parentOrgId = orgDetialRes?.parentOrgUuid;
      console.log(`parentOrgId ${parentOrgId}`);
      if (parentOrgId == "c24f7c91-30ba-4533-b86d-9eca644e6605") {
        continue;
      }
      let partnerDetails = await getPartnerDetials(orgDetail.buisnessPartnerId);
      console.log(partnerDetails);
      let childIds = partnerDetails?.map((v) => v.uuid);
      orgDetialRes.bPartnerChildIds = childIds;
      console.log(childIds);
      //   break
    }
  } catch (e) {
    console.log(`Catched Error in Main ${e.message}`);
  }
}

main();
