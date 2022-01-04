var accessToeken = "";
var baseURL = "https://api-ssl.bitly.com/v4";
var shortURL;

//navigator.clipboard.readText("hello");

async function shorten() {
  var URL = document.getElementById("shorten-url").value;

  var group_info = await getGroupID();
  var group_guid = group_info.groups[0].guid;

  var shortenURL = baseURL + "/shorten";
  var response = await fetch(shortenURL, {
    method: "POST",
    headers: {
      authorization: "Bearer " + accessToeken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      long_url: URL,
      domain: "bit.ly",
      group_guid: group_guid,
    }),
  });

  const results = await response.json();
  localStorage.setItem("shortened-url", results.link);
  document.getElementById("final-url").innerText =
    "Bit.ly URL : " + results.link;
}

async function getGroupID() {
  const groupsURL = baseURL + "/groups";
  let results = await fetch(groupsURL, {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToeken}`,
    },
  });
  return await results.json();
}

function copyToClip() {
  navigator.clipboard.writeText(localStorage.getItem("shortened-url"));
}
