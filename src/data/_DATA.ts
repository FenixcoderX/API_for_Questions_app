export let users = [
  {
    id: 'fgdsgjsdfgknsfdkgndfbndsfbasdnf',
    email: 'benanderson@gmail.com',  
    password: '$2b$10$rhqBNXYXul8gJEtZ8XJ1SuhkJCW9gyMfp51K6Lliwz/0TyFKHg30q',
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
    password: '$2b$10$rhqBNXYXul8gJEtZ8XJ1SuhkJCW9gyMfp51K6Lliwz/0TyFKHg30q',
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
    password: '$2b$10$rhqBNXYXul8gJEtZ8XJ1SuhkJCW9gyMfp51K6Lliwz/0TyFKHg30q',
    name: 'Luca Rossi',
    avatarURL: 'https://i.postimg.cc/vTHC2Z9J/avatar2.jpg',
    answers: {
      'xj352vofupe1dqz9emx13r': 'optionOne',
      'vthrdm985a262al8qx3do': 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionOne',
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  {
    id: '3894y7ow8ehfkhjsbdnsadjfbasdnbg',
    email: 'dubois@gmail.com', 
    password: '$2b$10$rhqBNXYXul8gJEtZ8XJ1SuhkJCW9gyMfp51K6Lliwz/0TyFKHg30q',
    name: 'Pierre Dubois',
    avatarURL: 'https://i.postimg.cc/J0qdbV2p/avatar3.jpg',
    answers: {
      'xj352vofupe1dqz9emx13r': 'optionOne',
    },
    questions: [],
  },
];

export let questions = [
  {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'fgdsgjsdfgknsfdkgndfbndsfbasdnf',
    timestamp: 1700754192235,
    optionOne: {
      votes: ['fgdsgjsdfgknsfdkgndfbndsfbasdnf'],
      text: 'buy a house in the suburbs',
    },
    optionTwo: {
      votes: [],
      text: 'rent an apartment in the city',
    },
  },
  {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'fuh3o82gkuvsdfkjvebjn394o348',
    timestamp: 1700740000631,
    optionOne: {
      votes: [],
      text: 'take a gap year to travel',
    },
    optionTwo: {
      votes: ['fuh3o82gkuvsdfkjvebjn394o348', 'fgdsgjsdfgknsfdkgndfbndsfbasdnf'],
      text: 'start a new job immediately',
    },
  },
  {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'fgdsgjsdfgknsfdkgndfbndsfbasdnf',
    timestamp: 1700655802264,
    optionOne: {
      votes: [],
      text: 'adopt a dog from a shelter',
    },
    optionTwo: {
      votes: ['fgdsgjsdfgknsfdkgndfbndsfbasdnf'],
      text: 'purchase a purebred puppy from a breeder',
    },
  },
  {
    id: 'loxhs1bqm25b708cmbf3g',
    author: '324ytsdiufygrejkfvmhsdvfm',
    timestamp: 1700575962234,
    optionOne: {
      votes: [],
      text: 'try skydiving for the first time',
    },
    optionTwo: {
      votes: ['fgdsgjsdfgknsfdkgndfbndsfbasdnf'],
      text: 'scuba diving in a coral reef',
    },
  },
  {
    id: 'vthrdm985a262al8qx3do',
    author: '324ytsdiufygrejkfvmhsdvfm',
    timestamp: 1700776863253,
    optionOne: {
      votes: ['324ytsdiufygrejkfvmhsdvfm'],
      text: 'start a new hobby',
    },
    optionTwo: {
      votes: ['fuh3o82gkuvsdfkjvebjn394o348'],
      text: 'continue with current interests',
    },
  },
  {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'fuh3o82gkuvsdfkjvebjn394o348',
    timestamp: 1700747601631,
    optionOne: {
      votes: ['fuh3o82gkuvsdfkjvebjn394o348', '3894y7ow8ehfkhjsbdnsadjfbasdnbg'],
      text: 'explore a dense rainforest alone',
    },
    optionTwo: {
      votes: ['324ytsdiufygrejkfvmhsdvfm'],
      text: 'join a guided wildlife tour in the Amazon',
    },
  },
];
