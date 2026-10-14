// ==========================================
// 📝 HOW TO ADD NEW BLOGS & MUSIC LATER:
// ==========================================
// Just add a new block inside the `blogsData` array below.
// - `title`: The title of your blog/memory
// - `date`: Date or subtitle
// - `image`: Path to your image inside the 'images/' folder
// - `audio`: Path to your custom background music for this blog inside 'music/' folder
// - `content`: Your story or blog text
// ==========================================

const introAudioSrc = "music/intro.mp3"; // Music playing on welcome screen

const blogsData = [
    {
        id: 1,
        title: "The Day We First Met",
        date: "October 14, 2024",
        image: "images/memory1.jpg",
        audio: "music/song1.mp3",
        content: `That was the day everything changed. The sky was clear, the breeze felt like a gentle whisper, and when our eyes met, time seemed to pause for a second. I never knew a single moment could hold so much magic until I met you.`
    },
    {
        id: 2,
        title: "Our Starlight Coffee Date",
        date: "December 25, 2024",
        image: "images/memory2.jpg",
        audio: "music/song2.mp3",
        content: `Sitting across from you under the dim warm lights, sipping hot coffee while you laughed at my silly jokes. Every second spent talking to you feels like poetry written just for us.`
    }
    // ADD NEW MEMORIES HERE LIKE THIS:
    // {
    //     id: 3,
    //     title: "Your Title Here",
    //     date: "Date Here",
    //     image: "images/your-image.jpg",
    //     audio: "music/your-song.mp3",
    //     content: "Your blog story here..."
    // }
];

// App Logic
const welcomeScreen = document.getElementById('welcomeScreen');
const mainContent = document.getElementById('mainContent');
const enterBtn = document.getElementById('enterBtn');
const bgAudio = document.getElementById('bgAudio');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const nowPlayingText = document.getElementById('nowPlayingText');
const blogsContainer = document.getElementById('blogsContainer');

const blogModal = document.getElementById('blogModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalImage = document.getElementById('modalImage');
const modalText = document.getElementById('modalText');

let currentPlayingAudio = introAudioSrc;
let isPlaying = false;

// Floating Hearts Generator
function createHeart() {
    const container = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 1rem + 0.8rem) + 'px';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 500);

// Render Blogs on Screen
function renderBlogs() {
    blogsContainer.innerHTML = '';
    blogsData.forEach(blog => {
        const card = document.createElement('div');
        card.className = "group bg-slate-900/60 border border-rose-500/20 rounded-2xl overflow-hidden shadow-xl hover:border-rose-500/60 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col";
        card.innerHTML = `
            <div class="h-56 overflow-hidden relative">
                <img src="${blog.image}" alt="${blog.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                <span class="absolute bottom-3 left-4 text-xs font-medium text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-500/30">${blog.date}</span>
            </div>
            <div class="p-6 flex flex-col flex-grow justify-between">
                <div>
                    <h3 class="font-['Great_Vibes'] text-3xl text-rose-200 mb-2">${blog.title}</h3>
                    <p class="text-slate-400 text-xs md:text-sm line-clamp-2 font-light">${blog.content}</p>
                </div>
                <div class="mt-4 flex items-center justify-between text-rose-400 text-xs font-medium">
                    <span class="flex items-center gap-1">🎵 Custom Melody</span>
                    <span class="group-hover:translate-x-1 transition-transform">Read Story →</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openBlogModal(blog));
        blogsContainer.appendChild(card);
    });
}

// Enter World Button Click
enterBtn.addEventListener('click', () => {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('opacity-100');
    }, 1000);

    // Play intro music
    bgAudio.src = introAudioSrc;
    bgAudio.play().then(() => {
        isPlaying = true;
        nowPlayingText.innerText = "Intro Melody";
        musicToggleBtn.innerText = "⏸";
    }).catch(e => console.log("Audio autoplay restricted by browser:", e));

    renderBlogs();
});

// Open Individual Blog Modal & Switch Song
function openBlogModal(blog) {
    modalTitle.innerText = blog.title;
    modalDate.innerText = blog.date;
    modalImage.src = blog.image;
    modalText.innerHTML = `<p>${blog.content.replace(/\n/g, '</p><p>')}</p>`;
    blogModal.classList.remove('hidden');

    // Switch background music to this blog's specific song
    if (blog.audio) {
        bgAudio.src = blog.audio;
        bgAudio.play().then(() => {
            isPlaying = true;
            nowPlayingText.innerText = blog.title;
            musicToggleBtn.innerText = "⏸";
        }).catch(e => console.log("Audio play error:", e));
    }
}

// Close Modal
closeModalBtn.addEventListener('click', () => {
    blogModal.classList.add('hidden');
    // Switch back to intro or main theme music
    bgAudio.src = introAudioSrc;
    bgAudio.play().catch(e => console.log(e));
    nowPlayingText.innerText = "Our World Theme";
});

// Music Toggle Button
musicToggleBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgAudio.pause();
        isPlaying = false;
        musicToggleBtn.innerText = "▶";
        nowPlayingText.innerText = "Music Paused";
    } else {
        bgAudio.play();
        isPlaying = true;
        musicToggleBtn.innerText = "⏸";
        nowPlayingText.innerText = "Playing Melody";
    }
});
      
