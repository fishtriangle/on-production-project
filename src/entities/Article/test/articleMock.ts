import { ArticleBlockType, ArticleType } from '../model/consts/ArticleConsts';
import type { Article } from '../model/types/article';

export const articleMock = {
  id: '1',
  title: 'JS news',
  subtitle: 'Задачи на собеседованиях. Event loop. JS',
  image:
    'https://fuzeservers.ru/wp-content/uploads/7/3/d/73dcbfda2e324bdd9d06bfad3c61224f.jpeg',
  views: 1705,
  createdAt: '26.12.2022',
  user: {
    id: '1',
    username: 'admin',
    avatar: 'https://avatars.githubusercontent.com/u/66234622?v=4',
  },
  type: [ArticleType.JS, ArticleType.ECONOMICS, ArticleType.SCIENCE],
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Event loop',
      paragraphs: [
        'Лучше, чем на https://learn.javascript.ru/event-loop теорию я не объясню,' +
          'так что давайте сразу перейдем к задачкам.',
        'Сначала разберем две задачки из статьи выше, а затем я покажу мои' +
          'размышления по другим задачкам с реальных собесов.',
      ],
    },
    {
      id: '2',
      type: ArticleBlockType.TEXT,
      title: 'Принцип решения задач на Event loop',
      paragraphs: [
        'Основной принцип в решении задачек на событийный цикл.',
        '1.Выполняется основной поток кода (+ выполняются скрипты в теле создания промисов)',
        '2.Выполняются микротаски\nПо факту, микротаски = промисы.\nТакже есть' +
          'возможность принудительно микромизировать задачу с помощью queueMicrotask(f),' +
          'но я так никогда не делал в рабочем коде. Если у кого есть опыт - пожалуйста,' +
          'поделитесь.\n(важно помнить, что исполняются ВСЕ промисы, и нужно об этом' +
          'помнить, так как по факту, так можно застопорить процесс выполнения скриптов' +
          'и очень не скоро приступить к макротаскам)',
        '3. Выполняется макротаска\nМакротаска - это у нас или браузерное API,' +
          'или манипуляции с DOM деревом (дополните меня в комментариях, пожалуйста)',
        '4. Далее, цикл повторяется.\nЕсли основной поток все и микрозадач тоже нет,' +
          'последовательно выполняются макротаски.',
      ],
    },
    {
      id: '5',
      type: ArticleBlockType.CODE,
      title: 'Задача 1',
      code:
        "setTimeout(function timeout() {\n  console.log('Таймаут');\n}, 0);\n\n" +
        "let p = new Promise(function(resolve, reject) {\n  console.log('Создание" +
        "промиса');\n  resolve();\n});\n\np.then(function(){\n  console.log('Обработка" +
        "промиса');\n});\n\nconsole.log('Конец скрипта');",
    },
    {
      id: '9',
      type: ArticleBlockType.IMAGE,
      title: 'Пруфы',
      src: 'https://habrastorage.org/r/w1560/getpro/habr/upload_files/203/e93/c50/203e93c50c92f99e9797262649ed725b.jpg',
    },
    {
      id: '3',
      type: ArticleBlockType.TEXT,
      title: 'Как я предлагаю решать задачи на event loop',
      paragraphs: [
        'В ходе решения задачек, я пришел к выводу, что можно использовать вот такую' +
          'табличку, и с ее помощью неплохо упрощать себе жизнь.',
        'Не стесняйтесь на собеседованиях использовать ее, лучше даже от руки, на' +
          'бумажке.\nРешение в голове, в стрессовой ситуации - большой шанс совершить ошибку.',
        'Заполняйте табличку так, чтобы каждый скрипт, был на отдельной строке! это' +
          'важно.\nНу, давайте приступим. У нас есть простенькая задачка, уровня Junior.',
      ],
    },
    {
      id: '6',
      type: ArticleBlockType.TEXT,
      paragraphs: [
        'Идем сверху-вниз, именно так, как это делает парсер нашего кода.',
      ],
    },
    {
      id: '4',
      type: ArticleBlockType.TABLE,
      rows: [['Основной поток', 'Микрозадачи', 'Макрозадачи']],
    },
    {
      id: '7',
      type: ArticleBlockType.CODE,
      code: "setTimeout(function timeout() { console.log('Таймаут'); }, 0);",
    },
    {
      id: '8',
      type: ArticleBlockType.TEXT,
      paragraphs: [
        'Сначала, видим setTimeout, это макрозадача (браузерное API), и мы должны его зарегистрировать.',
        'Помимо занесения результата выполнения скрипта в нашу табличку, укажем и' +
          'время, через которое он должен сработать (время не точно, но гарантирующее' +
          'задержку, то есть он сработает, не раньше, чем через N секунд).',
      ],
    },
  ],
} as Article;
