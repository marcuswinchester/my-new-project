import React, { useState, useEffect } from 'react';
import { Heart, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

const ProposalPage = () => {
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [deadline] = useState(new Date('2024-12-31T23:59:59'));
  const [answer, setAnswer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [funnyText, setFunnyText] = useState("");
  const [audio, setAudio] = useState(null);

  const funnyResponses = [
    "Hayırrrr, yanlış butona bakıyorsun! 🙈",
    "Bence yeşil buton daha güzel! 💚",
    "Furkan'ı üzmek mi istiyorsun? 🥺",
    "Diğer buton daha çok yakışır sana! ✨",
    "Emin misin? Bir daha düşün! 💭",
    "O buton bozuk galiba! 🛠️",
    "Yanlış yönde gidiyorsun! ⬆️",
    "Aşkın butonu diğeri! 💝"
  ];

  const romanticMessages = [
    {
      text: "Nermin, hayatıma adım attığın o an...",
      subText: "Kalbimin ritmi değişti, dünyam aydınlandı ✨"
    },
    {
      text: "Gözlerindeki o yıldızlar var ya...",
      subText: "Onlar benim en sevdiğim gökyüzü 🌟"
    },
    {
      text: "Her gülüşün bir şiir gibi,\nHer bakışın bir şarkı...",
      subText: "Sen benim en güzel hikayemsin 📖"
    },
    {
      text: "Seninle geçen her an,\nBir ömre bedel...",
      subText: "Ve ben seninle sonsuzluğa yürümek istiyorum 🌹"
    },
    {
      text: "Sen benim eksik kalan yanım,\nYarım kalan şarkım,\nTamamlanmamış hikayemsin...",
      subText: "Ve artık sana bir sorum var... 💝"
    }
  ];

  useEffect(() => {
    if (answer === 'yes') {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
        }));
      }, 250);
    }
  }, [answer]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('Süre doldu!');
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  useEffect(() => {
    // Müzik ayarları
    const backgroundMusic = new Audio('https://example.com/romantic-song.mp3');
    backgroundMusic.loop = true;
    setAudio(backgroundMusic);
  }, []);

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNoButtonMove = (e) => {
    const button = e.target;
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    button.style.position = 'fixed';
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
    
    setFunnyText(funnyResponses[Math.floor(Math.random() * funnyResponses.length)]);
  };

  return (
    <div className="relative min-h-screen max-w-[430px] mx-auto bg-gradient-to-b from-rose-200 via-pink-100 to-purple-100 flex flex-col items-center overflow-hidden shadow-2xl">
      {/* Müzik kontrolü */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 left-4 z-50 p-3 bg-white/80 rounded-full shadow-lg"
      >
        <Music className={`w-6 h-6 ${isPlaying ? 'text-pink-500' : 'text-gray-400'}`} />
      </button>

      {/* Zamanlayıcı */}
      <div className="w-full py-6 text-center bg-white/30 backdrop-blur-sm">
        <p className="text-pink-600 font-medium mb-2">💝 Aşkımıza Kalan Süre 💝</p>
        <div className="text-3xl font-bold text-pink-600">
          {timeLeft}
        </div>
      </div>

      <div className="flex-1 w-full px-6 flex flex-col items-center justify-center">
        {answer ? (
          // Kutlama ekranı
          <div className="text-center space-y-8 animate-fade-in">
            <img
              src="https://example.com/romantic-cats.gif"
              alt="Romantik kediler"
              className="rounded-full shadow-2xl mx-auto w-64 h-64 object-cover"
            />
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-pink-600">
                Seni Çok Seviyorum! 💝
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Bu 'Evet' ile başlayan hikayemizin, her günü aşkla yazılacak bir masala dönüşeceğine söz veriyorum.
                Seni sonsuza dek mutlu edeceğim!
              </p>
              <div className="text-2xl font-serif text-pink-500 animate-pulse py-4">
                Furkan 💘 Nermin
              </div>
            </div>
          </div>
        ) : (
          // Ana akış
          <div className="w-full max-w-md space-y-8">
            {step < romanticMessages.length ? (
              <div className="space-y-6 text-center">
                <p className="text-2xl text-gray-800 font-serif leading-relaxed">
                  {romanticMessages[step].text}
                </p>
                <p className="text-lg text-gray-600 italic">
                  {romanticMessages[step].subText}
                </p>
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-8 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transform transition hover:scale-105 active:scale-95"
                >
                  Devam Et 💫
                                               </button>
                                             </div>
                                           ) : (
                                             <div className="space-y-6 text-center">
                                               <p className="text-2xl text-gray-800 font-serif leading-relaxed">
                                                 Hayatımda birini sevmenin en güzel yolu, ona hep güvenmektir. 💖
                                               </p>
                                               <p className="text-lg text-gray-600 italic">
                                                 Peki, benimle sonsuza kadar bu yolculuğa çıkmak ister misin? 💍
                                               </p>
                                               <div className="space-x-6">
                                                 <button
                                                   onClick={() => setAnswer('yes')}
                                                   className="px-10 py-4 bg-pink-500 text-white rounded-full shadow-xl hover:bg-pink-600 transform transition hover:scale-105 active:scale-95"
                                                 >
                                                   Evet, seni seviyorum! 💍
                                                 </button>
                                                 <button
                                                   onClick={handleNoButtonMove}
                                                   className="px-10 py-4 bg-gray-500 text-white rounded-full shadow-xl hover:bg-gray-600 transform transition hover:scale-105 active:scale-95"
                                                 >
                                                   Hayır, üzgünüm... 😓
                                                 </button>
                                               </div>
                                               {funnyText && <p className="text-lg text-red-500 mt-4">{funnyText}</p>}
                                             </div>
                                           )}
                                         </div>
                                       )}
                                     </div>
                                   </div>
                                 );
                               };

                               export default ProposalPage;
