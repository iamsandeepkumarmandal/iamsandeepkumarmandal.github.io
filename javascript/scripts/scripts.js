class user {
  constructor(email,name){
    this.email = email;
    this.name = name;
  }
  getEmailAndName(){
    console.log("Name : " +this.name +"\n"+'Email :'+ this.email);
  }
}
var userDetails =  new user('priti@gmail.com','Priyanka');
userDetails.getEmailAndName();