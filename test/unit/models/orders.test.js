// const expect = require("chai").expect;
const order = require("../../../models/order");

// describe("Order", function(){
//     describe("validateOrder", function(){
//         it("should check if incoming order has orderNumber and address", function () {
//             const order = {
//                 orderNumber: 1,
//                 address: "1234 NW 1st st"
//             };
//             const responce = validateOrder(order);
//             expect(responce.error).not.exist;
//             expect(responce.value).eql(order);
//         });
//         it("should reject if no orderNumber is passed", function(){
//             const order ={
//                 address: "1234 NW 1st st"
//             };
//             const responce = validateOrder(order);
//             expect(responce.error).exist;
//         })
//     })
// })