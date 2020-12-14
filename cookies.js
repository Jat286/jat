var x = document.cookie;
document.cookie = "username=username";
document.cookie = "password=*********";
document.cookie = "dateofbirth=ddmmyyyy";
            function othername() {
                var input = document.getElementById("userInput").value;
                document.cookie = input;
            }