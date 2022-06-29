function examppljs() {
    let menu = document.createElement('div')
    menu.className = 'dropDown'
    let menuBtn = document.createElement('button')
    menuBtn.innerHTML += '<p class="kool">' + 'Head' + '</p>' + '<svg class="coolDown" id="koom" viewBox="0 0 24 24">' + '<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>' + '</svg>\n'
    menuBtn.className = 'dropBtn'
    let dropContent = document.createElement('div')
    dropContent.className = 'drop'
    dropContent.innerHTML += '<a class="dropper" href="https://gf.sunborngame.com/">' + 'GFL' + '</a>' + '<a class="dropper" href="https://www.reddit.com/r/girlsfrontline/">' + 'GFL Extra' + '</a>\n'
    leftSide = document.querySelector('.container')
    menu.appendChild(menuBtn)
    menu.appendChild(dropContent)
    leftSide.appendChild(menu)

}
examppljs()
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


let ranGif = document.querySelector('.randomGif');
let gifEvent = document.querySelector('#gifSubmit')
let n = 0;
async function getGif(add) {
    try {
        let apiLinker = ('https://api.giphy.com/v1/gifs/translate?api_key=vY9zLSTgrTY2cld7vhi6I76JuqNdnHHR&s=' + add)
        let response = await fetch(apiLinker, { mode: 'cors' })
        let gifData = await response.json()
        ranGif.src = gifData.data.images.original.url
        n++
        console.log(n)
    } catch (error) {
        console.log('error')
        console.log(error)

    }
}
gifEvent.addEventListener('click', function() {
    let gifSearcher = document.querySelector('#searchGif').value
    let ss = document.querySelector('#searchGif')
    let res = gifSearcher.replace(/\s+/g, '').toLowerCase();
    console.log(res)
    if (n <= 3 && gifSearcher != '') {
        getGif(res)
        ss.value = ''
    } else if (n <= 3 && gifSearcher === '') {
        return alert('Dont leave empty string')
    } else {
        return alert('you have used the api too many times')
    }
})

async function showPosition(position) {
    try {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        let currentApi = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=55fbc09aaeed3d561259c624f8e6bbdc'
        let response = await fetch(currentApi, { mode: 'cors' })
        let locData = await response.json()
        console.log(`Latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`)
        document.querySelector('#submitter').disabled = true;
        let wether = locData.weather[0].main
        let temp = locData.main.temp
        let humid = locData.main.humidity
        let wind = locData.wind.speed
        let dataShow = document.querySelector('.weatherAPIS')
        let showTemp = document.createElement('li')
        showTemp.innerText = ('temp: ' + temp + ' kelvin')
        dataShow.appendChild(showTemp)
        let showhumidity = document.createElement('li')
        showhumidity.innerText = ('Humidity: ' + humid + '%')
        dataShow.appendChild(showhumidity)
        let showWether = document.createElement('li')
        showWether.innerText = ('Weather: ' + wether)
        dataShow.appendChild(showWether)
        let windShow = document.createElement('li')
        windShow.innerText = ('Wind Speed: ' + wind + 'mph')
        dataShow.appendChild(windShow)
    } catch (error) {
        console.log(error)
    }
}



document.querySelector('#submitter').addEventListener('click', async function() {
    let passFirst = document.querySelector('#password')
    let passConfirm = document.querySelector('#confirm')
    let email = document.querySelector('#email')
    let user = document.querySelector('#username')
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (passFirst.value != passConfirm.value) {
        passFirst.style.borderColor = 'red'
        passConfirm.style.borderColor = 'red'
        passFirst.setCustomValidity('Password and Confirm Password are different')
        passConfirm.setCustomValidity('Password and Confirm Password are different')
        return
    } else if ((passConfirm.value === '' || passFirst.value === '')) {
        passFirst.style.borderColor = 'red'
        passConfirm.style.borderColor = 'red'
        passFirst.setCustomValidity('Passwords were blank')
        passConfirm.setCustomValidity('Password/s were blank')
        return
    } else if (!(email.value.match(mailformat))) {
        email.setCustomValidity('not an appropriate email')
        return email.style.borderColor = 'red'
    } else if (user === '') {
        user.setCustomValidity('Cant leave blank')
        return user.style.borderColor = 'red'
    } else {
        passFirst.setCustomValidity('')
        passConfirm.setCustomValidity('')
        email.setCustomValidity('')
        user.setCustomValidity('')
        user.style.borderColor = 'green'
        email.style.borderColor = 'green'
        passFirst.style.borderColor = 'green'
        passConfirm.style.borderColor = 'green'
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    }
})