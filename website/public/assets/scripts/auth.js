firebase.auth().onAuthStateChanged(user => {
    if (user){
        window.location = "public/pages/dashboard"
    }
})

function login(){
    const EMAIL = document.getElementsByTagName("input")[0].value;
    const PW = document.getElementsByTagName("input")[1].value;
    const errTextRef = document.getElementsByClassName("card-err")[0];

    errTextRef.style.visibility = "hidden";

    firebase.auth().signInWithEmailAndPassword(EMAIL, PW).catch(err => {
        switch (err.code){

            case "auth/invalid-email":
                errTextRef.innerHTML = "Error: Invalid Email";
                errTextRef.style.visibility = "visible";
                break;
                
            case "auth/wrong-password":
            case "auth/operation-not-allowed":
            case "auth/user-not-found":
                errTextRef.innerHTML = "Error: Incorrect or missing credentials";
                errTextRef.style.visibility = "visible";
                break;

            default:
                console.log(err.code)
        }
    })

}