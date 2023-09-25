// // function greeter(person) {  
// //     return "Hello, " + person;  
// // }  
// // let user = 'JavaTpoint';  
// // console.log(greeter(user));  

// // let firstName:string="Pooja"
// // console.log(firstName);
// // let some:unknown=true
// // some="name"
// // console.log(some);
// // define our tuple
// let ourTuple: [number, boolean, string];

// // initialize incorrectly throws an error
// ourTuple = [6,false, 'Coding God was mistaken'];
// ourTuple.push("some new")
// ourTuple.push(12.33)
// console.log(ourTuple);

// const car: { type: string, model: string, year: number } = {
//     type: "Toyota",
//     model: "Corolla",
//     year: 2009
//   };
// car.type="new car"
//   console.log(car);
  

//   // enum myName{
//   //   firstNo=098,
//   //   secondNo=78
//   // }

//   console.log(myName.firstNo);

//   // function getTime(): number {
//   //   return new Date().getTime();
//   // }

//   console.log(getTime())
  
//   // function getName(V:string):string{
//   //   return "your name is"+V
//   // }

//   console.log(getName("Pooja"))

// //   optional parameters

//   // function getOptinalParameter(a:number,b:number,c?:number):number{
//   //   return a+b+(c||0)
//   // }
//   console.log(getOptinalParameter(11,33))


// //   default parameters

// // function pow(value: number, exponent: number = 10) {
// //     return value ** exponent;
// //   }

//   console.log(pow(1))

// //   named parameters
// // function divide({ dividend, divisor }: { dividend: number, divisor: number }) {
// //     return dividend / divisor;
// //   }

// let answer=divide({dividend:120,divisor:4})
// console.log(answer)
  

// // rest parameters
// // function add(a:number,b:number,...rest:number[]){
// // return a+b+rest.reduce((l,m)=>l+m,0)
// // }

// console.log(add(1,2,3,4,5,6,7,8,9));


// let a:unknown="school"
// console.log((a as string).length);

// // classes
// class person{
//     name:string
// }

// let details=new person()
// details.name="Class"
// console.log(details.name);

// class carDetails{
//      name:string     
// }

// let getCarDetails=new carDetails()
// getCarDetails.name="toyota"

// console.log(getCarDetails.name);

// class Person {
//     private name: string;
  
//     public constructor(name: string) {
//       this.name = name;
//     }
  
//     public getName(): string {
//       return this.name;
//     }
//   }
  
//   const callclass = new Person("Jane");
//   console.log(callclass.getName()); // person.name isn't accessible from outside the class since it's private


//   class fruits{
//     private fruitName:string;
//     public constructor(fruitName: string) {
//         this.fruitName=fruitName
//     }

//     public getFruits():string{
//         return this.fruitName
//     }
//   }

//   let getfruit=new fruits("apple")
//   console.log(getfruit.getFruits());

  
  