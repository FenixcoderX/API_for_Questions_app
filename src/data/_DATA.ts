export let users = [
  {
    id: 'fgdsgjsdfgknsfdkgndfbndsfbasdnf',
    email: 'benanderson@gmail.com',  
    password: '$2b$10$jbC41xyV2d2AOjPZW9QbzO8A12n4Kl/tmQJFN7ObNzuL3S7i90/zy',
    name: 'Benjamin Anderson',
    avatarURL: 'https://i.postimg.cc/FH1nJ6gx/avatar4.jpg',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo',
      'am8ehyc8byjqgar0jgpub9': 'optionTwo',
      'loxhs1bqm25b708cmbf3g': 'optionTwo',
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
  },
  {
    id: '324ytsdiufygrejkfvmhsdvfm',
    email: 'annako@gmail.com',  
    password: '$2b$10$jbC41xyV2d2AOjPZW9QbzO8A12n4Kl/tmQJFN7ObNzuL3S7i90/zy',
    name: 'Anna Kowalczyk',
    avatarURL: 'https://i.postimg.cc/7PnKf47z/avatar1.jpg',
    answers: {
      'vthrdm985a262al8qx3do': 'optionOne',
      'xj352vofupe1dqz9emx13r': 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  {
    id: 'fuh3o82gkuvsdfkjvebjn394o348',
    email: 'lucarossi@gmail.com', 
    password: '$2b$10$jbC41xyV2d2AOjPZW9QbzO8A12n4Kl/tmQJFN7ObNzuL3S7i90/zy',
    name: 'Luca Rossi',
    avatarURL: 'https://i.postimg.cc/vTHC2Z9J/avatar2.jpg',
    answers: {
      'xj352vofupe1dqz9emx13r': 'optionOne',
      'vthrdm985a262al8qx3do': 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionOne',
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r','lsn52v467he1dqzgnexhko'],
  },
  {
    id: '3894y7ow8ehfkhjsbdnsadjfbasdnbg',
    email: 'dubois@gmail.com', 
    password: '$2b$10$jbC41xyV2d2AOjPZW9QbzO8A12n4Kl/tmQJFN7ObNzuL3S7i90/zy',
    name: 'Pierre Dubois',
    avatarURL: 'https://i.postimg.cc/J0qdbV2p/avatar3.jpg',
    answers: {
      'xj352vofupe1dqz9emx13r': 'optionOne',
    },
    questions: [],
  },
  {
    id: 'nc8nrzj9uqjr1zz4gnnn0p',
    email: 'test@gmail.com', 
    password: '$2b$10$IsQIs81eKWOZsIJ3LC6EGuAz0BrKezyzW/pm3CrGYxHhcx4tQL9Ga',
    name: 'Test User',
    avatarURL: 'https://firebasestorage.googleapis.com/v0/b/questions-fenixcoderx.appspot.com/o/1717468313086-Unknown.jpg?alt=media&token=31352872-73b9-4c4a-888c-dea26d4c187c',
    answers: {
    },
    questions: [],
  },
];

export let questions = [
  {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'fgdsgjsdfgknsfdkgndfbndsfbasdnf',
    timestamp: 1715784170023,
    questionText: 'Would you be interested in attending a yoga class on Saturday mornings in the fitness center?',
    optionOne: {
      votes: ['fgdsgjsdfgknsfdkgndfbndsfbasdnf'],
      text: 'Yes, I would attend Saturday morning yoga',
    },
    optionTwo: {
      votes: [],
      text: 'No, I would not attend Saturday morning yoga',
    },
  },
  {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'fuh3o82gkuvsdfkjvebjn394o348',
    timestamp: 1715801294015,
    questionText: 'What type of events would you like to see organized in our apartment complex?',
    optionOne: {
      votes: [],
      text: 'Social gatherings like BBQs or game nights',
    },
    optionTwo: {
      votes: ['fuh3o82gkuvsdfkjvebjn394o348', 'fgdsgjsdfgknsfdkgndfbndsfbasdnf'],
      text: 'Educational workshops or seminars',
    },
  },
  {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'fgdsgjsdfgknsfdkgndfbndsfbasdnf',
    timestamp: 1715959395056,
    questionText: 'What type of improvements would you like to see in our apartment complex?',
    optionOne: {
      votes: [],
      text: 'Renovations in common areas',
    },
    optionTwo: {
      votes: ['fgdsgjsdfgknsfdkgndfbndsfbasdnf'],
      text: 'Upgrades in individual apartments',
    },
  },
  {
    id: 'loxhs1bqm25b708cmbf3g',
    author: '324ytsdiufygrejkfvmhsdvfm',
    timestamp: 1716047154013,
    questionText: 'What security measures should we implement in our apartment complex??',
    optionOne: {
      votes: [],
      text: 'Install more security cameras',
    },
    optionTwo: {
      votes: ['fgdsgjsdfgknsfdkgndfbndsfbasdnf'],
      text: 'Implement a key card access system',
    },
  },
  {
    id: 'vthrdm985a262al8qx3do',
    author: '324ytsdiufygrejkfvmhsdvfm',
    timestamp: 1716541264056,
    questionText: 'Would you like the apartment complex to organize a summer block party with games and food trucks?',
    optionOne: {
      votes: ['324ytsdiufygrejkfvmhsdvfm'],
      text: 'Yes, I would attend a summer block party',
    },
    optionTwo: {
      votes: ['fuh3o82gkuvsdfkjvebjn394o348'],
      text: 'No, I would not attend a summer block party',
    },
  },
  {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'fuh3o82gkuvsdfkjvebjn394o348',
    timestamp: 1716574024019,
    questionText: 'Would you participate in a holiday decorating contest in our apartment complex?',
    optionOne: {
      votes: ['fuh3o82gkuvsdfkjvebjn394o348', '3894y7ow8ehfkhjsbdnsadjfbasdnbg'],
      text: 'Yes, I would participate in a holiday decorating contest',
    },
    optionTwo: {
      votes: ['324ytsdiufygrejkfvmhsdvfm'],
      text: 'No, I would not participate in a holiday decorating contest',
    },
  },
  {
    id: 'lsn52v467he1dqzgnexhko',
    author: 'fuh3o82gkuvsdfkjvebjn394o348',
    timestamp: 1716720840044,
    questionText: 'How often should we hold residents meetings?',
    optionOne: {
      votes: ['fuh3o82gkuvsdfkjvebjn394o348', '3894y7ow8ehfkhjsbdnsadjfbasdnbg'],
      text: 'Monthly',
    },
    optionTwo: {
      votes: ['324ytsdiufygrejkfvmhsdvfm'],
      text: 'Quarterly',
    },
  },
];
