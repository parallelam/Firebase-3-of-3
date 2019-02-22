// Initialize Firebase
var config = {
  apiKey: "AIzaSyBpRmrJOF4sho5Ap6-OgCgYNZjANsDFtQo",
  authDomain: "guest-book-364df.firebaseapp.com",
  databaseURL: "https://guest-book-364df.firebaseio.com",
  projectId: "guest-book-364df",
  storageBucket: "",
  messagingSenderId: "384980323412"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var comments = "";

$("#btnSubmit").on("click", function(event) {
  event.preventDefault();

  name = $("#txtName").val().trim();
  comments = $("#txtComments").val().trim();

  database.ref().push({
    name: name,
    comments: comments,
    date: firebase.database.ServerValue.TIMESTAMP
  });
});

database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  // $("#guestBook").empty();

  name = snapshot.val().name;
  comments = snapshot.val().comments;
  date = snapshot.val().date;
  var formattedDate;
  if (date) {
    formattedDate = moment(date).format("MM/DD/YYYY hh:mm A");
  } else {
    formattedDate = '';
  }
  $("#guestBook").append(name + " " + comments + " - " + formattedDate + "<br />");

}, function(error) {
  console.log(error);
});
