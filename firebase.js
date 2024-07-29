const handleSubmit = (e) => {
  e.preventDefault();
  if (isLogin) {
    // Login logic
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  } else {
    // Sign-up logic
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User signed up:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  }
};
