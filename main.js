chrome.runtime.sendMessage({ action: "activatePopup" });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.storage.local.get(['youtube_state'], function (result) {
        const state = result.youtube_state;
        if (request.action === "mainPage") {
            let prediv = document.getElementById("big_image");
            let element2 = document.getElementById("short_image");
            if (element2) {
                element2.style.display = "none";
            }
            if (state == 1 || state == 2) {
                if (prediv)
                    prediv.style.display = "none";
                document.getElementById("contents").style.display = "flex";
                sendResponse("Mainpage not summaryed");
                return;

            }
            $('#contents.ytd-rich-grid-renderer').hide();
            if (prediv) {
                prediv.style.display = "flex";
                sendResponse("Mainpage prediv");
                return;
            }
            let div = document.createElement("div");
            div.id = "big_image";
            div.style.position = 'absolute';
            div.style.minHeight = '300px';
            div.style.minWidth = '200px';
            div.style.marginTop = '200px';
            div.style.marginLeft = '500px';
            div.style.alignContent = 'centre';
            div.innerHTML = `<img src=https://creativez.orbiz.in/wp-content/uploads/2020/01/stay-focused.jpg>`;
            document.body.appendChild(div);
            sendResponse("Mainpage div");
        }

        else if (request.action === "others") {
            let element = document.getElementById("big_image");
            if (element) {
                element.style.display = "none";
            }
            let element2 = document.getElementById("short_image");
            if (element2) {
                element2.style.display = "none";
            }
            sendResponse("others div");
        }

        else if (request.action === "videoPage") {
            let element = document.getElementById("big_image");
            if (element) {
                element.style.display = "none";
            }
            if (state == 3) {
                document.getElementById("comments").style.display = "none";
            }
            else {
                document.getElementById("comments").style.display = "block";
            }
            let element2 = document.getElementById("short_image");
            if (state == 1) {
                if (element2)
                    element2.style.display = "none";
                document.getElementById("related").style.display = "flex";
                sendResponse("videopage state 1");
                return;
            }
            document.getElementById("related").style.display = "none";
            if (!element2) {
                let div = document.createElement('div');
                div.id = "short_image";
                div.style.position = 'relative';
                div.style.marginTop = '20%';
                div.style.marginLeft = '10%';
                div.innerHTML = `<img src=https://creativez.orbiz.in/wp-content/uploads/2020/01/stay-focused.jpg style="height:300px; padding:30%">`;
                document.getElementById('secondary-inner').appendChild(div);
            }
            else {
                element2.style.display = "flex";
            }
            sendResponse("videoPage div");
        }

    })
})