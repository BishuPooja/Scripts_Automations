const rp = require("request-promise")
const token = "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODI5MzY1NjEsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiM2FlZGE1MjctZWIzZS00MTNiLWFiNzgtY2FlNzdlMTE5N2QwIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.ST0foPG9WIbe8gScaqvPgaAJkZSs2wL35eadMMFIkMI"
var FRT_PUB_BASE_URL = "https://apis.fretron.com"
async function getShipments(from, till) {
    try {
        let res = await rp({
            url: `https://apis.fretron.com/shipment-view/shipments/v1?filters={"shipmentDate":{"isTillExpression":false,"isFromExpression":false,"from":${from},"till":${till}},"__version":2}&size=1000  `,
            method: "GET",
            json: true,
            headers: {
                authorization: token
            }
        })
        // console.log(res)
        return res

    }
    catch (e) {
        console.log(`error getting shipments: ${e.message}`)
    }

}
async function mailer(to, cc, subject, html) {
    try {
        let url = `${FRT_PUB_BASE_URL}/notifications/emails/email`

        let options = {
            uri: url,
            method: "POST",
            json: true,
            headers: {
                Authorization: token
            },
            body: {
                to: to,
                cc: cc,
                subject: subject,
                html: html
            }
        }

        return await rp(options)
    } catch (error) {
        console.log(`Some error sending mail ${error.message}`)
    }
}
async function main() {
    let to = ["pooja.bishu@fretron.com"]
    let cc = ["suyash.kumar@fretron.com"]
    let subject = "test html"
    let html = `<!DOCTYPE html>
    <html>
    
    <head>
        <style>
            .line-container {
                display: flex;
            }
    
            .line {
                width: 50%;
                border-bottom: 1px solid black;
            }
    
            .heading {
                color: black;
                font-size: 17px;
                font-weight: bold;
                line-height: 1.5;
    
            }
    
            .newHead {
                color: black;
                font-size: 17px;
                font-weight: bold;
                line-height: 1.5;
                text-decoration: underline;
                padding-right: 100px;
                padding-left: 40px;
            }
    
            .td {
                padding-right: 30px;
            }
    
            .div {
                padding-left: 30px;
                padding-top: 30px;
                padding-right: 30px;
                padding-bottom: 30px;
                margin-top: 2px;
                margin-left: 2px;
                margin-right: 2px;
                margin-bottom: 2px;
            }
    
            ol {
                display: inline-block;
                margin: 0;
                padding-left: 40;
            }
    
            li {
                list-style: none;
                margin: 0px;
            }
    
            .vertical {
                height: 50%;
                border-left: 2px;
                position: absolute;
                left: 50%
            }
        </style>
    </head>
    
    <body style="overflow-wrap: break-word;">
    
        <div class="div">
            <h3 style="text-align: center;">Jindal Saw - Neeraj Kanagat Ji</h3><br><br><br>
            <span>Hello Neeraj Kanagat Ji</span><br><br>
            <span>Below is summary of you logistics operation from 24th April( 10 AM to 10 AM ).
            </span><br><br>
            <span class="heading">Overview</span><br>
            <ol>
                <li>On-Time Deliveries Y'Day</li>
                <li>90%</li>
            </ol>
            <ol>
                <li>In-Transit Shipments: 300</li>
                <li> .</li>
            </ol>
            <ol>
                <li>Total Dispatch Y'Day: 600</li>
                <li>MT</li>
            </ol>
            <br><br><br><br><br>
    
            <span class="heading">Vehicle Requests
            </span><br><br>
            <span class="newHead">Live (at 10 AM)</span>
            <div class="vertical"></div>
            <span class="newHead">Y'Day Summary</span><br><br>
            <ol style="overflow-wrap: break-word;">
                <li>Open VR - 23 (400 MT)</li>
                <li style="padding-left: 40px;list-style-type: disc;">Delayed - 35 MT</li>
                <li style="padding-left: 40px;list-style-type: disc;">Delayed (> 48Hr) - 8 MT</li>
                <li style="padding-left: 40px;list-style-type: disc;"></li>
            </ol>
            <ol>
                <li>
                    <div style="border-left: 1px solid black; height: 100px;"></div>
                </li>
            </ol>
    
    
    
            <ol>
                <li>Placed - 400 MT / 18 trucks</li>
                <li style="padding-left: 40px;list-style-type: disc;">2 vehicle (8%) were placed late</li>
                <li>New VR - 28 MT</li>
            </ol>
    
            <span>
                <hr width="50%" align="left" />
            </span><br><br>
            <ol style="overflow-wrap: break-word;">
                <li>Plant Wise Pending VR</li><br>
                <li style="padding-left: 40px;list-style-type: disc;">SGDI - <span style="color:red"> 30 MT
                    </span>200 MT</li>
                <span style="padding-left: 40px;list-style-type: disc;">KOSS - <span style="color:red">5 MT
                    </span>25 MT</li>
                    <li style="padding-left: 40px;list-style-type: disc;">SGSS - <span style="color:red">2 MT</span> 25 MT
                    </li>
            </ol>
            <ol>
                <li>
                    <div style="border-left: 1px solid black; height: 100px;"></div>
                </li>
            </ol>
    
    
            <ol>
                <li>Placed Late </li><br>
                <li style="padding-left: 40px;list-style-type: disc;"> On Time - 190 MT</li>
                <li style="padding-left: 40px;list-style-type: disc;"> 24 Hr - 30 MT</li>
                <li style="padding-left: 40px;list-style-type: disc;"> 48+ Hr - 20 MT</li>
    
            </ol>
            <br><br><br><br>
            <ol>
                <li>Transporter Wise Pending VR </li><br>
                <li style="padding-left: 40px;list-style-type: disc;"> CCI - 230 MT <span style="color:red">(5MT
                        Delayed)</span></li>
    
            </ol><br><br>
            <span>
                <hr width="50%" align="left">
            </span><br><br>
            <span class="heading">Dispatch
            </span><br><br>
            <span class="newHead">Live (at 10 AM)</span>
            <span class="newHead">Y'Day Summary</span><br><br>
            <ol>
                <li>Vehicle In Plant - 5 </li><br>
                <li style="padding-left: 40px;list-style-type: disc; text-decoration: underline;"> 1 vehicle have breached
                    sla
                </li>
    
            </ol>
            <ol>
                <li>
                    <div style="border-left: 1px solid black; height: 100px;"></div>
                </li>
            </ol>
            <ol>
                <li>Dispatched - 18 trucks (300 MT)
                </li><br>
                <li style="padding-left: 40px;list-style-type: disc; text-decoration: underline;"> 2 vehicle (8%) breached
                    GIGO sla of 6
                    Hr</li><br>
                <li style="padding-left: 40px;list-style-type: disc; text-decoration: underline;"> Average TAT - 5.5 Hour
                </li>
            </ol>
            <br><br>
            <span>
                <hr width="50%" align="left">
            </span><br><br>
    
            <ol>
                <li>Vehicle In Plant by Material
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> SS -<span style="color:red">3 MT,</span> 20
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> DI -<span style="color:red">5 MT, </span> 25 MT
    
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> COKE - <span style="color:red">2 MT,</span> 25 MT
    
                </li>
            </ol>
            <ol>
                <li>
                    <div style="border-left: 1px solid black; height: 100px;"></div>
                </li>
            </ol>
            <ol>
                <li>TAT Breakdown by substage
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> GI to TW - 3 Hr</li>
                <li style="padding-left: 40px;list-style-type: disc; ">TW to GW - 8 H</li>
    
                <li>Top Reasons
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> Loading queue - 4.4 Hr
                </li>
                <li style="padding-left: 40px;list-style-type: disc; ">Lunch Break - 1 Hr</li>
            </ol><br><br><br><br>
            <span>
                <hr width="50%" align="left">
            </span><br><br>
            <span class="heading">Shipments
            </span><br><br>
            <span class="newHead">Live (at 10 AM)</span>
            <span class="newHead">Y'Day Summary</span>
            <br><br>
            <ol>
                <li>Vehicle In Transit - 190
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> 1 vehicle have breached edd
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> 24+ Hr - 1
    
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> 48+ Hr - 0
    
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> 3 vehicle are running late</li>
                <li class="heading">Consignee Wise Delay
    
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> MPPC STEEL PVT LTD - 5
                </li>
                <li style="padding-left: 40px;list-style-type: disc; ">POOJA FORGE LIMITED - 3 </li>
                <li class="heading">Active Disconnected
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> 5 Vehicle
                </li>
    
            </ol>
            <ol>
                <li>
                    <div style="border-left: 1px solid black; height: 100px;"></div>
                </li>
            </ol>
            <ol>
                <li>Reported at destination - 18 trucks (300 MT)
    
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> 8 vehicle (18%) reported late
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> Average TAT - 5.5 Hour
    
                </li>
                <li class="heading">Tracking Compliance
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> Total Blackout (disconnects) Reported
                    - 30 shipment (5%)
                </li>
                <li style="padding-left: 40px;list-style-type: disc; ">On Time Delivery %
    
    
            </ol>
            <br><br><br><br>
            <span>
                <hr width="50%" align="left">
            </span><br><br>
            <span class="heading">Unloading
            </span><br><br>
            <span class="newHead">Live (at 10 AM)</span>
            <span class="newHead">Y'Day Summary</span>
            <br><br>
            <ol>Vehicle at Consignee - 30
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> 1 vehicle have breached edd
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> 24+ Hr - 1
    
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> 48+ Hr - 0
    
                </li>
                <li class="heading">Consignee Wise Detained Vehicle
    
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> MPPC STEEL PVT LTD - 5
                </li>
                <li style="padding-left: 40px;list-style-type: disc; ">POOJA FORGE LIMITED - 3 </li>
    
    
            </ol>
            <ol>
                <li>
                    <div style="border-left: 1px solid black; height: 100px;"></div>
                </li>
            </ol>
            <ol>
                <li>Unloading Complete - 18 trucks (300 MT)
    
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> 8 vehicle (18%) breached unloading
                    SLA
                </li><br>
                <li style="padding-left: 40px;list-style-type: disc; ">Average TAT - 25.5 Hour
                </li>
                <li class="heading">Consignee Wise TAT
                </li>
                <li style="padding-left: 40px;list-style-type: disc; "> MPPC STEEL PVT LTD - 24 Hr, 6 Vehicle
                </li>
    
    
            </ol>
    
        </div>
    
    </body>
    
    
    
    </html>`

    mailer(to, cc, subject, html)
}

main()

