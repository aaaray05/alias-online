import React, {useState, useEffect} from 'react';
import { ChevronRight, ChevronLeft, Play } from 'lucide-react';

export default function App () {
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
    'землетрясение', 'молния', 'метель', 'цунами', 'затмение'
  ];

  const [screen, setScreen] = useState('start');
  const [manualWords, setManualWords] = useState('');
  const [cards, setCards] = useState([]);
  const [wordsPerCard, setWordsPerCard] = useState(1);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [wordSource, setWordSource] = useState('default');

  const shuffleAray = (array) => {
    const newArray = [...array];
    for(let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startGame = async () => {
    let wordList = [];
    if(manualWords.trim()) {
      wordList = manualWords.split(',').map(w => w.trim()).filter(w => w);
      if(wordList.length === 0) {
        alert("Please enter at least one word");
        return;
      }
    } else {
      wordList = shuffleAray(defaultWords);
    }
    
    const newCards = [];
    for(let i = 0; i < wordList.length; i += wordsPerCard) {
      newCards.push(wordList.slice(i, i + wordsPerCard));
    }
    setCards(newCards);
    setCurrentCardIndex(0);
    setScreen('game');
  };

  const nextCard = () => {
    if(currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const prevCard = () => {
    if(currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (screen === 'game') {
        if (e.key === 'ArrowRight') {
          setCurrentCardIndex(prev => prev < cards.length - 1 ? prev + 1 : prev);
        }
        if (e.key === 'ArrowLeft') {
          setCurrentCardIndex(prev => prev > 0 ? prev - 1 : prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [screen, cards.length]);

  if(screen === 'start') {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4'>
        <div className='text-center'>
          <h1 className="text-6xl font-bold text-white mb-8">Alias</h1>
          <p className="text-xl text-white mb-12">Word Guessing Game</p>
          <div className="space-y-4"></div>
          <button
              onClick={() => setScreen('settings')}
              className="bg-white text-purple-600 px-12 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition flex items-center gap-3 mx-auto"
            >
              <Play size = {24} />
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
                Words per card: {wordsPerCard}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={wordsPerCard}
                onChange={(e) => setWordsPerCard(parseInt(e.target.value))}
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
                      if (!manualWords) setManualWords('cat, dog, house');
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
                  placeholder="Leave empty for default words, or add your own: "
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
                disabled={loading}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Loading...' : 'Start Game'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'game') {
    const currentCard = cards[currentCardIndex] || [];
    return(
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center justify-center p-4">
        <div className='mb-4 text-white text-lg'>
          Card {currentCardIndex + 1} of {cards.length}
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-2xl min-w-[400px] min-h-[300px] flex items-center justify-center">
          <div className="text-center space-y-6">
            {currentCard.map((word, idx) => (
              <div key={idx} className="text-5xl font-bold text-gray-800">
                {word}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={prevCard}
            disabled={currentCardIndex === 0}
            className="bg-white text-purple-600 p-4 rounded-full hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextCard}
            disabled={currentCardIndex === cards.length - 1}
            className="bg-white text-purple-600 p-4 rounded-full hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        <button
          onClick={() => {
            setScreen('start');
            setCards([]);
            setCurrentCardIndex(0);
          }}
          className="mt-8 text-white underline hover:no-underline"
        >
          End Game
        </button>
      </div>
    )
  }
}