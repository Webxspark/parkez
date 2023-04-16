const getAccessFormSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const ENDPOINT = "https://hackverseind-2023.webxspark.com/science/getAccess.php";
  const email = formData.get("email");

  if (email === "") {
    alert("Please fill all the required fields!");
    return;
  }
  const data = new FormData();
  data.append("email", email);
  data.append("add", true);
  fetch(ENDPOINT, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        alert(data.message);
        e.target.reset();
      } else {
        alert(data.error);
      }
    });
};

export { getAccessFormSubmit };
