function begin(){
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDMXzhvRImJVnht7BdXdduXKBUpOONyID8",
        authDomain: "chat-62a58.firebaseapp.com",
        databaseURL: "https://chat-62a58.firebaseio.com",
        projectId: "chat-62a58",
        storageBucket: "chat-62a58.appspot.com",
        messagingSenderId: "589207331645"
    };
    firebase.initializeApp(config);
    var ref = firebase.database().ref();
}