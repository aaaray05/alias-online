import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, SkipForward, Pause, RotateCcw } from 'lucide-react';

export default function App() {
  const defaultWords = [
    // Животные (20)
    'слон', 'пингвин', 'крокодил', 'бабочка', 'медуза',
    'кенгуру', 'осьминог', 'дельфин', 'жираф', 'носорог',
    'фламинго', 'горилла', 'павлин', 'гепард', 'морж',
    'ёж', 'пеликан', 'мангуст', 'зебра', 'хомяк',
    
    // Предметы (20)
    'гитара', 'телескоп', 'зонт', 'микроскоп', 'саксофон',
    'гамак', 'аккордеон', 'бинокль', 'калькулятор', 'компас',
    'термометр', 'эскалатор', 'люстра', 'печатная машинка', 'губная гармошка',
    'метроном', 'перископ', 'стетоскоп', 'ксилофон', 'батут',
    
    // Места (20)
    'вулкан', 'библиотека', 'замок', 'маяк', 'пирамида',
    'собор', 'музей', 'стадион', 'обсерватория', 'монастырь',
    'аквариум', 'фабрика', 'лаборатория', 'кладбище', 'планетарий',
    'больница', 'виноградник', 'крепость', 'каньон', 'ледник',
    
    // Профессии (20)
    'космонавт', 'архитектор', 'археолог', 'фотограф', 'ветеринар',
    'стоматолог', 'журналист', 'фокусник', 'скульптор', 'фармацевт',
    'адвокат', 'детектив', 'пожарный', 'плотник', 'электрик',
    'хирург', 'дипломат', 'биолог', 'механик', 'библиотекарь',
    
    // Действия (10)
    'плавание', 'рисование', 'танцы', 'жонглирование', 'скейтбординг',
    'вязание', 'садоводство', 'скалолазание', 'пение', 'готовка',
    
    // Природа (10)
    'водопад', 'радуга', 'торнадо', 'лавина', 'ураган',
    'землетрясение', 'молния', 'метель', 'цунами', 'затмение',
    
    // Животные 2 (20)
    'верблюд', 'страус', 'лиса', 'волк', 'медведь',
    'тигр', 'лев', 'змея', 'черепаха', 'лягушка',
    'сова', 'орёл', 'попугай', 'краб', 'акула',
    'кит', 'белка', 'енот', 'панда', 'коала',
    
    // Предметы 2 (20)
    'якорь', 'парашют', 'штопор', 'лопата', 'молоток',
    'пила', 'отвёртка', 'ножницы', 'линейка', 'степлер',
    'будильник', 'фонарик', 'свеча', 'лампочка', 'вентилятор',
    'утюг', 'швейная машинка', 'пылесос', 'микрофон', 'наушники',
    
    // Еда и напитки (20)
    'пицца', 'суши', 'бургер', 'торт', 'мороженое',
    'шоколад', 'конфета', 'печенье', 'хлеб', 'сыр',
    'яйцо', 'молоко', 'кофе', 'чай', 'сок',
    'арбуз', 'банан', 'яблоко', 'апельсин', 'виноград',
    
    // Транспорт (10)
    'самолёт', 'вертолёт', 'ракета', 'корабль', 'подводная лодка',
    'поезд', 'велосипед', 'мотоцикл', 'грузовик', 'такси',
    
    // Спорт и игры (10)
    'футбол', 'баскетбол', 'теннис', 'хоккей', 'бокс',
    'шахматы', 'карты', 'домино', 'боулинг', 'гольф'
  ];

  const [screen, setScreen] = useState('start');
  const [manualWords, setManualWords] = useState('');
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [wordSource, setWordSource] = useState('default');
  const [timerDuration, setTimerDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [currentTeam, setCurrentTeam] = useState(1);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startGame = async () => {
    let wordList = [];
    if (manualWords.trim()) {
      wordList = manualWords.split(',').map(w => w.trim()).filter(w => w);
      if (wordList.length === 0) {
        alert('Please enter at least one word');
        return;
      }
    } else {
      wordList = shuffleArray(defaultWords);
    }

    setCards(wordList);
    setCurrentCardIndex(0);
    setTimeLeft(timerDuration);
    setTimerRunning(false);
    setScreen('game');
  };

  const startTimer = () => {
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(timerDuration);
    setTimerRunning(false);
  };

  const correctGuess = () => {
    if (currentTeam === 1) {
      setTeam1Score(team1Score + 1);
    } else {
      setTeam2Score(team2Score + 1);
    }
    removeCurrentWord();
  };

  const skipWord = () => {
    removeCurrentWord();
  };

  const removeCurrentWord = () => {
    const newCards = [...cards];
    newCards.splice(currentCardIndex, 1);
    
    if (newCards.length === 0) {
      alert('No more words! Starting a new game.');
      const wordList = manualWords.trim() 
        ? manualWords.split(',').map(w => w.trim()).filter(w => w)
        : shuffleArray(defaultWords);
      setCards(wordList);
      setCurrentCardIndex(0);
    } else {
      setCards(newCards);
      if (currentCardIndex >= newCards.length) {
        setCurrentCardIndex(newCards.length - 1);
      }
    }
  };

  const switchTeam = () => {
    setCurrentTeam(currentTeam === 1 ? 2 : 1);
    resetTimer();
    setTimerRunning(false);
  };

  useEffect(() => {
    let interval;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-8">Pictionary</h1>
          <p className="text-xl text-white mb-12">Drawing Game</p>
          <button
            onClick={() => setScreen('settings')}
            className="bg-white text-purple-600 px-12 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition flex items-center gap-3 mx-auto"
          >
            <Play size={24} />
            Play
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'settings') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Game Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Timer Duration: {timerDuration} seconds
              </label>
              <input
                type="range"
                min="30"
                max="120"
                step="15"
                value={timerDuration}
                onChange={(e) => setTimerDuration(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Word Source
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="wordSource"
                    className="mr-2"
                    checked={wordSource === 'default'}
                    onChange={() => setWordSource('default')}
                  />
                  Default words
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="wordSource"
                    className="mr-2"
                    checked={wordSource === 'manual'}
                    onChange={() => {
                      setWordSource('manual');
                      if (!manualWords) setManualWords('кот, собака, дом');
                    }}
                  />
                  Manual entry
                </label>
              </div>
            </div>

            {wordSource === 'manual' && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Enter words (comma-separated)
                </label>
                <textarea
                  value={manualWords}
                  onChange={(e) => setManualWords(e.target.value)}
                  placeholder="кот, собака, дом, дерево..."
                  className="w-full border rounded-lg p-3 h-32"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setScreen('start')}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={startGame}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'game') {
    const currentWord = cards[currentCardIndex] || '';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center justify-center p-4">
        {/* Score Board */}
        <div className="flex gap-8 mb-6">
          <div className={`text-center p-4 rounded-lg ${currentTeam === 1 ? 'bg-white' : 'bg-white bg-opacity-50'}`}>
            <div className="text-sm font-semibold text-gray-600">Team 1</div>
            <div className="text-4xl font-bold text-purple-600">{team1Score}</div>
          </div>
          <div className={`text-center p-4 rounded-lg ${currentTeam === 2 ? 'bg-white' : 'bg-white bg-opacity-50'}`}>
            <div className="text-sm font-semibold text-gray-600">Team 2</div>
            <div className="text-4xl font-bold text-blue-600">{team2Score}</div>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6">
          <div className={`text-6xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
            {timeLeft}s
          </div>
        </div>

        {/* Word Card */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl min-w-[400px] min-h-[250px] flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800">
              {currentWord}
            </div>  
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex gap-4 mb-6">
          {!timerRunning && timeLeft === timerDuration && (
            <button
              onClick={startTimer}
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition flex items-center gap-2"
            >
              <Play size={24} />
              Start Timer
            </button>
          )}
          
          {timerRunning && (
            <button
              onClick={pauseTimer}
              className="bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transition flex items-center gap-2"
            >
              <Pause size={24} />
              Pause
            </button>
          )}

          {!timerRunning && timeLeft < timerDuration && timeLeft > 0 && (
            <button
              onClick={startTimer}
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition flex items-center gap-2"
            >
              <Play size={24} />
              Resume
            </button>
          )}
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={correctGuess}
            disabled={!timerRunning}
            className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronRight size={24} />
            Correct!
          </button>
          
          <button
            onClick={skipWord}
            disabled={!timerRunning}
            className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <SkipForward size={24} />
            Skip
          </button>
        </div>

        {/* Round Controls */}
        <div className="flex gap-4">
          <button
            onClick={resetTimer}
            className="text-white underline hover:no-underline flex items-center gap-2"
          >
            <RotateCcw size={20} />
            Reset Timer
          </button>
          
          <button
            onClick={switchTeam}
            className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Switch to Team {currentTeam === 1 ? 2 : 1}
          </button>
          
          <button
            onClick={() => {
              setScreen('start');
              setCards([]);
              setCurrentCardIndex(0);
              setTeam1Score(0);
              setTeam2Score(0);
              setCurrentTeam(1);
              setTimerRunning(false);
            }}
            className="text-white underline hover:no-underline"
          >
            End Game
          </button>
        </div>
      </div>
    );
  }
}