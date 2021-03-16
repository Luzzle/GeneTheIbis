firebase.auth().onAuthStateChanged(user => {
    if (user){
        console.log(user);
    }
})



async function login(){
    const EMAIL = document.getElementsByTagName("input")[0].value;
    const PW = document.getElementsByTagName("input")[1].value;

    console.log(EMAIL, PW);
}