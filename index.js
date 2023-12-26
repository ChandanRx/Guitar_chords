
const bg_changer = document.getElementById('util_button-background')
bg_changer.addEventListener('click', () => {
    api_call()
})
const animate = (key) => {
    const currentKey = document.querySelector(`.${key}`)
    currentKey.classList.add('pressed')
    setTimeout(() => {
        currentKey.classList.remove('pressed')
    }, 250)
}

var audio_volume = 0.6

var image_url;
const api_call = () => {
    const URL = "https://api.unsplash.com/photos/random"
    fetch(URL, {
        headers: {
            'Authorization': 'Client-ID 0xUnl0Zdx1TaDSiub7RTE1tWOCAJtmQG2FmdGxU1zFg'
        }
    }).then(res => res.json())
        .then(res => {
            image_url = res.urls.small

            change_background(image_url)
        })
        .catch(error => console.log(error))
}
api_call()

const change_background = (imgsrc) => {
    let container_style = document.getElementsByClassName('Container')[0]

    let bg_color = getComputedStyle(document.documentElement).getPropertyValue("--background_low")
    container_style.style.background = ` linear-gradient(300deg,${bg_color},${bg_color}) , (url${imgsrc})`
    container_style.style.backgroundSize = 'cover'
    container_style.style.backgroundPosition = 'center'
    console.log(container_style.style);
}




const playMusic = (path) => {
    const audio = new Audio(path)
    audio.volume = audio_volume
    audio.play()
}

document.addEventListener('keypress', (event) => {
    const triggeredKey = event.key;
    makeSound(triggeredKey);
    animate(triggeredKey);
})


//Theme 1

const theme_1_background = "linear-gradient( 90deg,#007175, #a2a4bc ,#474aff , rgb(13, 35, 207))"
const theme_1_background_low = "rgba(9,25,33,0.8)"
const theme_1_text = "white"

//Theme 2

const theme_2_background = "linear-gradient( 90deg,#71f24d, #a2a4bc ,#31c170 , rgb(10, 88, 30) )"
const theme_2_background_low = "rgba(247,195,64,0.85)"
const theme_2_text = "#000"


//0xUnl0Zdx1TaDSiub7RTE1tWOCAJtmQG2FmdGxU1zFg

const change_theme = (theme) => {
    let root = document.documentElement
    if (theme === 'theme_1') {
        root.style.setProperty("--background", theme_1_background)
        root.style.setProperty("--background_low", theme_1_background_low)
        root.style.setProperty("--text", theme_1_text)
        change_background()
    } else {

        root.style.setProperty("--background", theme_2_background)
        root.style.setProperty("--background_low", theme_2_background_low)
        root.style.setProperty("--text", theme_2_text)
        change_background()
    }
}

var current_theme = 'theme_1'
const theme_changer = document.getElementById('util_button-theme')
theme_changer.addEventListener("click", (e) => {

    theme_changer.classList.add(".change_theme_pressed")
    setTimeout(() => {
        theme_changer.classList.remove(".change_theme_pressed")
    }, 200)

    if (current_theme == 'theme_1') {
        change_theme('theme_2')
        current_theme = "theme_2"
    } else {
        change_theme('theme_1')
        current_theme = "theme_1"
    }
})


var auto_music_id;
var auto_music_on = false;
const start_auto_music = () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G','Am', 'Bm', 'Cm', 'Dm', 'Em', 'Fm', 'Gm']

    auto_music_id = setInterval(() => {

        const current_key = letters[Math.floor(Math.random() * letters.length)]
        makeSound(current_key)
        animate(current_key)
    }, 500)

}

const auto_music_button = document.getElementById('util_button-auto')
auto_music_button.addEventListener('click', () => {

    if (auto_music_on) {
        clearInterval(auto_music_id);
        auto_music_on = false;
        auto_music_button.innerText = 'Random Music'
        auto_music_button.classList.remove("auto_music_on")
    }
    else {
        start_auto_music()
        auto_music_on = true;
        auto_music_button.innerText = 'Stop'
        auto_music_button.classList.add("auto_music_on")
    }
})

const slider = document.getElementById("volume_slider")
slider.oninput = (event) => {
    audio_volume = event.target.value / 100
}

const makeSound = (key) => {

    switch (key) {
        case 'A':
            playMusic('sounds/A-major.mp3');
            break;

        case 'B':
            playMusic('sounds/B-major.mp3');
            break;

        case 'C':
            playMusic('sounds/C-major.mp3');
            break;

        case 'D':
            playMusic('sounds/D-major.mp3');
            break;

        case 'E':
            playMusic('sounds/E-major.mp3');
            break;

        case 'F':
            playMusic('sounds/F-major.mp3');
            break;

        case 'G':
            playMusic('sounds/G-major.mp3');
            break;

        case 'Am':
            playMusic('sounds/A-minor.mp3');
            break;

        case 'Bm':
            playMusic('sounds/B-minor.mp3');
            break;

        case 'Cm':
            playMusic('sounds/C-minor.mp3');
            break;

        case 'Dm':
            playMusic('sounds/D-minor.mp3');
            break;

        case 'Em':
            playMusic('sounds/E-minor.mp3');
            break;

        case 'Fm':
            playMusic('sounds/F-minor.mp3');
            break;

        case 'Gm':
            playMusic('sounds/G-minor.mp3');
            break;

        default:
            console.log('wrong button');
    }

}

const handleDrumClick = (event) => {

    var innerHTML = event.target.innerHTML;
    console.log(innerHTML);
    animate(innerHTML);
    makeSound(innerHTML);
}


var drums = document.querySelectorAll('.drum')
for (let i = 0; i < drums.length; i++) {
    drums[i].addEventListener('click', handleDrumClick)
}