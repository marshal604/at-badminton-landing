export const tournaments = {
  '2026-02-07': {
    id: '2026-02-07',
    title: '2026 AT 羽球盃',
    subtitle: '第二次開打',
    date: '2026/02/07（六）',
    venue: '',
    maxTeams: 8,
    entryFee: 200,
    rules: {
      groupStage: {
        points: 15,
        deuceMax: 20,
        description: '預賽採 15 分制，Deuce 上限 20 分',
      },
      finals: {
        points: 21,
        description: '決賽採 21 分制',
      },
      advancement: '取前四組進決賽，依勝場數排序，相同則依失分數少者晉級',
      finalBracket: '前兩名打冠亞軍，三四名打季殿軍',
    },
    prizes: [
      { rank: '冠軍', prize: '500 元刮刮樂 / 人', icon: '🏆' },
      { rank: '亞軍', prize: '300 元刮刮樂 / 人', icon: '🥈' },
      { rank: '季軍', prize: '200 元刮刮樂 / 人', icon: '🥉' },
      { rank: '參加獎', prize: '100 元刮刮樂 / 人', icon: '🎟️' },
    ],
    bonuses: [
      '報名即享「百萬現金抽獎」機會',
      '冠軍加碼「千萬現金抽獎」機會',
    ],
    teams: [
      {
        id: 1,
        type: 'mixed',
        typeLabel: '混雙',
        players: [
          { name: 'Hubert', avatar: null },
          { name: 'Esther', avatar: null },
        ],
      },
      {
        id: 2,
        type: 'mens',
        typeLabel: '男雙',
        players: [
          { name: 'Alex', avatar: null },
          { name: 'Robert', avatar: null },
        ],
      },
      {
        id: 3,
        type: 'mens',
        typeLabel: '男雙',
        players: [
          { name: '1000', avatar: null },
          { name: '小明', avatar: null },
        ],
      },
      {
        id: 4,
        type: 'mens',
        typeLabel: '男雙',
        players: [
          { name: '國翔', avatar: null },
          { name: '俊廷', avatar: null },
        ],
      },
      {
        id: 5,
        type: 'mens',
        typeLabel: '男雙',
        players: [
          { name: '家睿', avatar: null },
          { name: 'Andy', avatar: null },
        ],
      },
      {
        id: 6,
        type: 'mens',
        typeLabel: '男雙',
        players: [
          { name: 'Matthew', avatar: null },
          { name: 'Eric', avatar: null },
        ],
      },
      {
        id: 7,
        type: 'mixed',
        typeLabel: '混雙',
        players: [
          { name: 'Jacky', avatar: null },
          { name: '茄子', avatar: null },
        ],
      },
      {
        id: 8,
        type: 'mixed',
        typeLabel: '混雙',
        players: [
          { name: 'Angela', avatar: null },
          { name: 'Leo', avatar: null },
        ],
      },
    ],
    schedule: {
      format: '8 隊單一組別循環對打',
      courts: 2,
      rules: [
        '混雙三組互相對打',
        '4 支男雙各遇混雙 2 次',
        '家睿 & Andy 遇混雙 1 次（對手為 Hubert & Esther）',
        '男雙之間互相對打',
      ],
      rounds: [
        {
          round: 1,
          matches: [
            { court: 'A', team1: 'Hubert & Esther', team1Type: 'mixed', team2: 'Jacky & 茄子', team2Type: 'mixed' },
            { court: 'B', team1: 'Alex & Robert', team1Type: 'mens', team2: '1000 & 小明', team2Type: 'mens' },
          ],
        },
        {
          round: 2,
          matches: [
            { court: 'A', team1: 'Angela & Leo', team1Type: 'mixed', team2: '國翔 & 俊廷', team2Type: 'mens' },
            { court: 'B', team1: '家睿 & Andy', team1Type: 'mens', team2: 'Matthew & Eric', team2Type: 'mens' },
          ],
        },
        {
          round: 3,
          matches: [
            { court: 'A', team1: 'Hubert & Esther', team1Type: 'mixed', team2: 'Angela & Leo', team2Type: 'mixed' },
            { court: 'B', team1: 'Alex & Robert', team1Type: 'mens', team2: '國翔 & 俊廷', team2Type: 'mens' },
          ],
        },
        {
          round: 4,
          matches: [
            { court: 'A', team1: 'Jacky & 茄子', team1Type: 'mixed', team2: 'Matthew & Eric', team2Type: 'mens' },
            { court: 'B', team1: '1000 & 小明', team1Type: 'mens', team2: '家睿 & Andy', team2Type: 'mens' },
          ],
        },
        {
          round: 5,
          matches: [
            { court: 'A', team1: 'Hubert & Esther', team1Type: 'mixed', team2: '1000 & 小明', team2Type: 'mens' },
            { court: 'B', team1: 'Jacky & 茄子', team1Type: 'mixed', team2: 'Angela & Leo', team2Type: 'mixed' },
          ],
        },
        {
          round: 6,
          matches: [
            { court: 'A', team1: 'Alex & Robert', team1Type: 'mens', team2: '家睿 & Andy', team2Type: 'mens' },
            { court: 'B', team1: '國翔 & 俊廷', team1Type: 'mens', team2: 'Matthew & Eric', team2Type: 'mens' },
          ],
        },
        {
          round: 7,
          matches: [
            { court: 'A', team1: 'Hubert & Esther', team1Type: 'mixed', team2: 'Alex & Robert', team2Type: 'mens' },
            { court: 'B', team1: '1000 & 小明', team1Type: 'mens', team2: '國翔 & 俊廷', team2Type: 'mens' },
          ],
        },
        {
          round: 8,
          matches: [
            { court: 'A', team1: 'Jacky & 茄子', team1Type: 'mixed', team2: '國翔 & 俊廷', team2Type: 'mens' },
            { court: 'B', team1: 'Angela & Leo', team1Type: 'mixed', team2: 'Matthew & Eric', team2Type: 'mens' },
          ],
        },
        {
          round: 9,
          matches: [
            { court: 'A', team1: 'Hubert & Esther', team1Type: 'mixed', team2: '家睿 & Andy', team2Type: 'mens' },
            { court: 'B', team1: 'Alex & Robert', team1Type: 'mens', team2: 'Matthew & Eric', team2Type: 'mens' },
          ],
        },
        {
          round: 10,
          matches: [
            { court: 'A', team1: 'Jacky & 茄子', team1Type: 'mixed', team2: 'Alex & Robert', team2Type: 'mens' },
            { court: 'B', team1: 'Angela & Leo', team1Type: 'mixed', team2: '1000 & 小明', team2Type: 'mens' },
          ],
        },
        {
          round: 11,
          matches: [
            { court: 'A', team1: '1000 & 小明', team1Type: 'mens', team2: 'Matthew & Eric', team2Type: 'mens' },
            { court: 'B', team1: '國翔 & 俊廷', team1Type: 'mens', team2: '家睿 & Andy', team2Type: 'mens' },
          ],
        },
      ],
      finals: {
        description: '前四名晉級決賽',
        matches: [
          { round: '冠亞軍賽', team1: '第一名', team2: '第二名', points: 21 },
          { round: '季殿軍賽', team1: '第三名', team2: '第四名', points: 21 },
        ],
      },
    },
    moreInfo: {
      pastEvents: [],
      videos: [],
      links: [],
    },
  },
};
