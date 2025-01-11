function send() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            message
        })
    };
    let url = "https://app.jun-suzu.net/contact/";
    function error() {
        document.getElementById("failed").style.display = "block";
        setTimeout(() => {
            document.getElementById("failed").style.display = "none";
        }, 8000);
    };
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            if (data.status == "success") {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
                document.getElementById("success").style.display = "block";
                setTimeout(() => {
                    document.getElementById("success").style.display = "none";
                }, 8000);
            } else {
                error();
            }
        })
        .catch(error());
}
