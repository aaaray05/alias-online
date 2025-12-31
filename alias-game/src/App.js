import './App.css';
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
      if(wordList.length == 0) {
        alert("Please enter at least one word");
        return;
      }
    } else {
      wordList = shuffleAray(defaultWords);
    }
    
    const newCards = [];
    for(let i = 0; i < wordList.legnth; i += wordsPerCard) {
      newCards.push(wordList.slice(i, i + wordsPerCard));
    }
    setCards(newCards);
    setCurrentCardIndex(0);
    setScreen('game');
  }
}