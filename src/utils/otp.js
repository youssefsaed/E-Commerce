const OTP=(length=6)=>{
    let char='X0Z8C9MCN7BOG0H7Y6TKO2P6EJQ8WP'
    let code=''
    for(let i=0;i<length;i++){
      const num=  Math.floor(Math.random()*30)
      code+=char[num]
    }
    return code 
}
export default OTP