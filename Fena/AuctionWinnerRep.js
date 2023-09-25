const rp = require("request-promise");
const TOKEN = "";

const brachWiseMails = {
  SURAJPUR: "rksharma@fena.com",
  ROORKEE: "sandeeppal@fena.com",
  HOWRAH: "santukoley@fena.com",
  SILVASSA: "srpatil@fena.com",
  PUDUCHERRY: "ssuresh@fena.com",
  GUWAHATI: "ashokdas@fena.com",
  KATHUA: "sureshkumar@fena.com",
};
async function sendMails(auctionId, emails) {
  try {
    let url = `http://34.93.148.238:8084/fena/reports/daily-freight-approval/email?auction_order_id=${auctionId}&emails=${emails}`;
    let res = await rp({
      uri: url,
      method: "GET",
      json: true,
      body: payload,
      headers: {
        aurhorization: TOKEN,
      },
    });
    return res;
  } catch (e) {
    console.log(`Caught Error sending Mails auctionId ${auctionId} ${e.message}`);
  }
}

async function main(auction) {
  try {
    let auctionId = auction?.uuid;
    if (!auctionId) {
      console.log(`auctionId not Found`);
    }
    let branchName = auction?.branch?.name;
    branchName = branchName?.split("-")?.[1];
    if(!branchName){
      console.log(`Branch Name Not Found For auction ${auctionId}`)
      return
    }
    console.log(`Branch Name ${branchName}`);
    let mails = [];
    if ( brachWiseMails[branchName]) {
      mails.push(brachWiseMails[branchName]);
    }
    if (!mails?.length) {
      console.log(`Mails Not found For branch ${branchName}`);
      return;
    }
    let mailRes = await sendMails(auctionId, mails);
    console.log(mailRes);
  } catch (e) {
    console.log(`Error Catched Main ${e.message}`);
  }
}



try{
 await main(auction);
}catch(e){
  console.log(`Automation catched Error ${e.message}`)
}
