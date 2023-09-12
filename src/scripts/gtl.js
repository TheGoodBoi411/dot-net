import likeFullIcon from '../../public/icons/likeFull.svg';
import likeIcon from '../../public/icons/like.svg';

// game round
let totalRounds = 5;

function round (round) {
    console.log("round: "+round);
    if (round > totalRounds) {
        
        document.getElementById("gameDiv").style = "visibility:hidden;"
        document.getElementById("vidEmbed").src = "";

        document.getElementById("finalScore").textContent = score.toLocaleString();
        let search = true;
        if (currentPlaylistId == "PL-Bkvpy-EvAQ8d0X-nwSoU2cZQzu7fq-i") {
            console.log("octagon played, recalculating grade");
            score *= 0.625;
        }
        grades.forEach(num => {
            if (score >= num[0] && search) {
                document.getElementById("grade").textContent = num[1];
                document.getElementById("grade").style.textShadow = "7px 7px "+num[2];
                search = false;
            };
        });
        

        document.getElementById("resultsDiv").style = "visibility:visible;"
        return;
    };

    currentId = gameVideoIdList[round-1];

    document.getElementById("count").textContent = `Round ${round}/${totalRounds}`;
    document.getElementById("vidEmbed").src = `https://www.youtube.com/embed/`+currentId;

    var part = 'snippet,statistics';

    var url = 'https://www.googleapis.com/youtube/v3/videos';
    url += '?part=' + encodeURIComponent(part);
    url += '&id=' + encodeURIComponent(currentId);
    url += '&key=' + encodeURIComponent(apiKey);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            video = data.items[0];
            console.log(video);
            document.getElementById("title").textContent = video.snippet.title;
        }
    );
};

var apiKey = 'AIzaSyDM--mkxwtx9bReE5H5CU-Halc5_ed7Ol4';
let listIds = [
    ["GoodBoi's Selection", "PL-Bkvpy-EvAS9zQ_zaMCVDL5QVcGeQrOg"],
    ["1", "PL3dGPfkLzu7zHzMkfQNn8UvEHj_74G8vs"],
    ["2", "PL-Bkvpy-EvAQ8d0X-nwSoU2cZQzu7fq-i"]
]
let currentPlaylistId = "";
let fullVideoIdList = [];
let gameVideoIdList = [];
let currentRound = 0;

// get playlist
function playlist(play) {

    if (play == "2") {
        totalRounds = 8;
    };

    listIds.forEach(id => {
        console.log(id);
        if (id[0] == play) {
            currentPlaylistId = id[1];
            console.log("selected playlist:"+currentPlaylistId);
        }
    });

    let listUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
    listUrl += '?part=' + encodeURIComponent('id,snippet');
    listUrl += '&maxResults=' + encodeURIComponent('50');
    listUrl += '&playlistId=' + encodeURIComponent(currentPlaylistId);
    listUrl += '&key=' + encodeURIComponent(apiKey);

    fetch(listUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.items.forEach(vid => {
                fullVideoIdList.push(vid.snippet.resourceId.videoId);
            });
            console.log("videos found: " + fullVideoIdList.length);
            while (gameVideoIdList.length < totalRounds) {
                let works = true;
                let newId = fullVideoIdList[randomInt(0, fullVideoIdList.length-1)];
                gameVideoIdList.forEach(vid => {
                    if (vid == newId) {
                        works = false;
                    };
                });
                if (works) {
                    gameVideoIdList.push(newId);
                }
            }
            console.log("playing with: " + gameVideoIdList);
            currentRound = 1;
            round(currentRound);
            document.getElementById("gameDiv").hidden = false;
        }
    );
};

// functions

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const roundNum = (value, decimals) => Number(Math.round(value + "e" + decimals) + "e-" + decimals);

// variables

let video = {};
let currentId = "d-PPKvEo83s";
let score = 0;
let grades = [
    [5000, "CHEATER", "#000"],
    [4950, "SSS+", "#a81394"],
    [4900, "SSS", "#a81394"],
    [4700, "SS+", "#c92ab4"],
    [4400, "SS", "#c92ab4"],
    [4000, "S+", "#c533ff"],
    [3600, "S", "#c533ff"],
    [3300, "A+", "#516cdb"],
    [3000, "A", "#516cdb"],
    [2500, "B+", "#3fb18e"],
    [2000, "B", "#3fb18e"],
    [1500, "C+", "#c9c35a"],
    [1000, "C", "#c9c35a"],
    [500, "D", "#ff6d33"],
    [50, "F", "#f33"],
    [1, "F-", "#f33"],
    [0, "Z", "#000"],
]

// start button

document.getElementById("start").addEventListener('click', () => {
    playlist(document.getElementById("choiche").value);
    console.log("playlist type: " + document.getElementById("choiche").value);

    document.getElementById("startDiv").hidden = true;
    
});

// calculate score

let perColor = "text-success";
let points = 0;

document.getElementById("guess").addEventListener('click', () => {
    document.getElementById("likeBtnIcon").src = likeFullIcon;
    document.getElementById("guess").disabled = true;

    let guess = document.getElementById("likes").value.replace(/,/gi, "");
    console.log("guess: "+guess);
    if (!guess || guess < 1 || isNaN(parseInt(guess))) {
        document.getElementById("likes").value = 1;
        guess = 1;
    };

    let likes = video.statistics.likeCount;
    document.getElementById("likesReal").textContent = likes.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&,');
    document.getElementById("views").textContent = video.statistics.viewCount.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&,');
    let commentCount = video.statistics.commentCount;
    if (commentCount > 0) {
        document.getElementById("comments").textContent = commentCount.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&,');
    };

    let percent = roundNum(likes/guess*100-100, 1);
    let ratio = guess/likes;
    if (ratio >= 1) {
        points = Math.floor(1000/(Math.sqrt(ratio)*1.3-0.3));
    } else {
        points = Math.floor(1000*(Math.sqrt(ratio)*1.2-0.2));
    };
    if (points < 0) {
        points = 0;
    };

    if (percent >= 0) {
        percent = "+" + percent;
        perColor = "text-success";
    } else {
        perColor = "text-danger";
    };

    document.getElementById("percent").textContent = percent.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&,')+"%";
    document.getElementById("percent").classList.remove("text-success", "text-danger");
    document.getElementById("percent").classList.add(perColor);

    score += points;
    document.getElementById("score").textContent = "+"+points.toLocaleString()+" points";

    document.getElementById("stats").style = "visibility:visible;"
});

document.getElementById("continue").addEventListener('click', () => {
    document.getElementById("likeBtnIcon").src = likeIcon;
    document.getElementById("stats").style = "visibility:hidden;"
    document.getElementById("guess").disabled = false;
    document.getElementById("likes").value = "";
    currentRound++;
    round(currentRound);
});

// commmas

document.getElementById("likes").onkeydown = function(){
    let it = document.getElementById("likes");
    setTimeout(function(){
        it.value = it.value.replace(/,/gi, "").replace(/\d(?=(?:\d{3})+$)/g, '$&,');
    }, 0);
};

// playlist description

document.getElementById("selectBox").addEventListener('click', () => {
    switch (document.getElementById("choiche").value) {

        case "GoodBoi's Selection":
            document.getElementById("playlistDesc").textContent = "A selection of videos hand-picked by yours truly."
            break;

        case "1":
            document.getElementById("playlistDesc").textContent = "A mix of high quality rips from your favorite video games."
            break;
        
        case "2":
            document.getElementById("playlistDesc").textContent = "A batch of octagon-centered YTPMV's. Some have ten likes, some have ten thousand."
            break;
    
        default:
            break;
    }
});
// console.log("ehhlel");