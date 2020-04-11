const DATA = [{
    id: 1,
    name: '项目 A',
    endTime: '2018-12-01',
    lead: 'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
      'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
      'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
    ],
    percent: 60,
    status: 'ACTIVE',
    color: '#666',
    state: 'success',
  },
  {
    id: 2,
    name: '项目 B',
    endTime: '2018-12-02',
    lead: 'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
      'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
      'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
    ],
    percent: 30,
    status: 'ACTIVE',
    color: '#666',
    state: 'error',
  },
  {
    id: 3,
    name: '项目 C',
    endTime: '2018-12-03',
    lead: 'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
    ],
    percent: 70,
    status: 'PENDING',
    color: '#ee706d',
    state: 'success',
  },
  {
    id: 4,
    name: '项目 D',
    endTime: '2018-12-04',
    lead: 'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
      'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
    ],
    percent: 40,
    status: 'ACTIVE',
    color: '#666',
    state: 'error',
  },
  {
    id: 5,
    name: '项目 E',
    endTime: '2018-12-05',
    lead: 'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
      'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
      'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
    ],
    percent: 60,
    status: 'ACTIVE',
    color: '#666',
    state: 'normal',
  },
  {
    id: 6,
    name: '项目 F',
    endTime: '2018-12-06',
    lead: 'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
    ],
    percent: 20,
    status: 'CLOSED',
    color: '#f7da47',
    state: 'error',
  },
  {
    id: 7,
    name: '项目 G',
    endTime: '2018-12-07',
    lead: 'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
    ],
    percent: 80,
    status: 'ACTIVE',
    color: '#666',
    state: 'success',
  },
  {
    id: 8,
    name: '项目 H',
    endTime: '2018-12-08',
    lead: 'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
      'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
      'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
    ],
    percent: 45,
    status: 'CLOSED',
    color: '#f7da47',
    state: 'normal',
  },
  {
    id: 9,
    name: '项目 I',
    endTime: '2018-12-09',
    lead: 'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
      'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
    ],
    percent: 50,
    status: 'PENDING',
    color: '#ee706d',
    state: 'normal',
  },
  {
    id: 10,
    name: '项目 G',
    endTime: '2018-12-10',
    lead: 'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
    ],
    percent: 60,
    status: 'PENDING',
    color: '#ee706d',
    state: 'normal',
  },
  {
    id: 11,
    name: '项目 K',
    endTime: '2018-12-11',
    lead: 'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
      'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
      'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
    ],
    percent: 30,
    status: 'ACTIVE',
    color: '#666',
    state: 'normal',
  },
  {
    id: 12,
    name: '项目 L',
    endTime: '2018-12-12',
    lead: 'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
    team: [
      'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
      'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
    ],
    percent: 40,
    status: 'PENDING',
    color: '#ee706d',
    state: 'normal',
  },
];

const DATA1 = [{
  "id": "202010",
  "name": "Mrs. Vincenzo Wisozk",
  "age": 7920,
  "username": "123",
  "password": "123",
  "sex": "Female",
  "votes": [5494],
  "tel": "13600000000"
}, {
  "id": "202011",
  "name": "Mrs. Henry Bradtke",
  "age": 2211,
  "username": "Olga_Emmerich",
  "password": "4Kianna49",
  "sex": "Female",
  "votes": [6653, 6662, 2844, 2831, 6102],
  "tel": "13600000000"
}, {
  "id": "202012",
  "name": "Miss Arturo Kassulke",
  "age": 7162,
  "username": "Eichmann_Yasmeen",
  "password": "6Durward34",
  "sex": "Female",
  "votes": [3575, 6531, 8637, 1389, 1270],
  "tel": "13600000000"
}, {
  "id": "202013",
  "name": "Ms. Lori Rolfson",
  "age": 1079,
  "username": "Lisette.Rippin",
  "password": "2Ferne62",
  "sex": "Male",
  "votes": [752, 7770, 8400],
  "tel": "13600000000"
}, {
  "id": "202014",
  "name": "Ms. Jodie Gibson",
  "age": 2606,
  "username": "Calista_Steuber",
  "password": "0Moshe92",
  "sex": "Female",
  "votes": [7128, 7613, 8968, 3166],
  "tel": "13600000000"
}, {
  "id": "202015",
  "name": "Mr. Devyn Denesik",
  "age": 911,
  "username": "Buster.Bosco",
  "password": "7Dion04",
  "sex": "Male",
  "votes": [4973, 8546, 8476],
  "tel": "13600000000"
}, {
  "id": "202016",
  "name": "Miss Cleveland Dare",
  "age": 295,
  "username": "Maverick.Stiedemann",
  "password": "9Clemmie31",
  "sex": "Female",
  "votes": [9081, 6230, 6846, 2312, 5126],
  "tel": "13500000000"
}, {
  "id": "202017",
  "name": "Ms. Colten Hodkiewicz",
  "age": 8062,
  "username": "Lilliana.Kuphal",
  "password": "0Consuelo16",
  "sex": "Female",
  "votes": [7611, 7494],
  "tel": "13600000000"
}, {
  "id": "202018",
  "name": "Miss Rosemarie Mills",
  "age": 4294,
  "username": "Abshire_Alfonzo",
  "password": "8Jolie90",
  "sex": "Female",
  "votes": [1885, 9075, 5915],
  "tel": "13600000000"
}, {
  "id": "202019",
  "name": "Mr. Pasquale Thiel",
  "age": 2479,
  "username": "Monahan.Granville",
  "password": "4Ezequiel72",
  "sex": "Female",
  "votes": [1008, 9936, 776, 8821, 2673],
  "tel": "13500000000"
}, {
  "id": "2020110",
  "name": "Mr. Ola Will",
  "age": 7979,
  "username": "Schamberger_Lela",
  "password": "8Amy75",
  "sex": "Male",
  "votes": [8548, 5072, 8429, 3097],
  "tel": "13600000000"
}, {
  "id": "2020111",
  "name": "Mrs. Prudence Pacocha",
  "age": 5223,
  "username": "Matteo.Turcotte",
  "password": "4Mina61",
  "sex": "Female",
  "votes": [6471, 2132],
  "tel": "13600000000"
}, {
  "id": "2020112",
  "name": "Mrs. Candido Yost",
  "age": 487,
  "username": "Reynold.Murray",
  "password": "5Mohamed76",
  "sex": "Male",
  "votes": [5621],
  "tel": "13600000000"
}, {
  "id": "2020113",
  "name": "Miss Chanel Schmitt",
  "age": 2686,
  "username": "Nyah.Rosenbaum",
  "password": "4Thalia56",
  "sex": "Female",
  "votes": [9808, 8226, 7548, 1881, 1022],
  "tel": "13500000000"
}, {
  "id": "2020114",
  "name": "Miss Dayton Tromp",
  "age": 1703,
  "username": "Bud.Jakubowski",
  "password": "9Letitia00",
  "sex": "Female",
  "votes": [8683],
  "tel": "13500000000"
}, {
  "id": "2020115",
  "name": "Mrs. Raina Klein",
  "age": 4346,
  "username": "Sydney.Medhurst",
  "password": "4Gay74",
  "sex": "Female",
  "votes": [7411, 3399, 1396, 367],
  "tel": "13600000000"
}, {
  "id": "2020116",
  "name": "Ms. Forrest Botsford",
  "age": 4431,
  "username": "Larkin.Paris",
  "password": "1Alexie47",
  "sex": "Female",
  "votes": [9849],
  "tel": "13500000000"
}, {
  "id": "2020117",
  "name": "Miss Emmie Labadie",
  "age": 174,
  "username": "Aliza_Brakus",
  "password": "9Pasquale71",
  "sex": "Male",
  "votes": [2884, 8880, 7747],
  "tel": "13600000000"
}, {
  "id": "2020118",
  "name": "Miss Nasir Rosenbaum",
  "age": 4943,
  "username": "Lemuel.Kirlin",
  "password": "8Jamey28",
  "sex": "Male",
  "votes": [2946, 9617, 4804],
  "tel": "13600000000"
}, {
  "id": "2020119",
  "name": "Dr. Ardella Schuster",
  "age": 7301,
  "username": "Miller.Andrew",
  "password": "6Geoffrey06",
  "sex": "Male",
  "votes": [5514, 8603, 3355],
  "tel": "13500000000"
}, {
  "id": "2020120",
  "name": "Ms. Savanah Heaney",
  "age": 6960,
  "username": "Julianne.Ferry",
  "password": "8Mallie44",
  "sex": "Female",
  "votes": [4937, 1612, 8240, 9319, 5232],
  "tel": "13500000000"
}, {
  "id": "2020121",
  "name": "Mr. Wilhelmine Kub",
  "age": 4708,
  "username": "Sauer.Lisette",
  "password": "5Rosalyn35",
  "sex": "Male",
  "votes": [7405, 7578, 833],
  "tel": "13500000000"
}, {
  "id": "2020122",
  "name": "Dr. Carol Goldner",
  "age": 6323,
  "username": "Mitchel.Schroeder",
  "password": "7Frederik04",
  "sex": "Male",
  "votes": [1478, 6847, 9695, 1282],
  "tel": "13500000000"
}, {
  "id": "2020123",
  "name": "Dr. Caleigh Cremin",
  "age": 1218,
  "username": "Taya_Kovacek",
  "password": "0Abbey99",
  "sex": "Male",
  "votes": [417, 227, 4466],
  "tel": "13600000000"
}, {
  "id": "2020124",
  "name": "Mrs. Dillan Effertz",
  "age": 1010,
  "username": "Kadin.Schiller",
  "password": "2Karley62",
  "sex": "Female",
  "votes": [1988],
  "tel": "13500000000"
}, {
  "id": "2020125",
  "name": "Mrs. Julien Terry",
  "age": 7357,
  "username": "Dorthy.Fisher",
  "password": "7Madie91",
  "sex": "Female",
  "votes": [7333, 1279, 8956],
  "tel": "13500000000"
}, {
  "id": "2020126",
  "name": "Mrs. Briana Flatley",
  "age": 4425,
  "username": "Waters_Cale",
  "password": "4Aida33",
  "sex": "Female",
  "votes": [9112, 9395, 8769, 545, 7605],
  "tel": "13500000000"
}, {
  "id": "2020127",
  "name": "Miss Jordy Hayes",
  "age": 4824,
  "username": "Romaguera.Carol",
  "password": "0Christian74",
  "sex": "Male",
  "votes": [6665, 926, 4763, 5668, 2593],
  "tel": "13500000000"
}, {
  "id": "2020128",
  "name": "Mr. Gilda Roob",
  "age": 4280,
  "username": "Lenna.Sporer",
  "password": "3Sabryna32",
  "sex": "Male",
  "votes": [6000, 5781, 4168, 2462, 3195],
  "tel": "13600000000"
}, {
  "id": "2020129",
  "name": "Dr. London Konopelski",
  "age": 2081,
  "username": "Greg.DuBuque",
  "password": "9Emmitt53",
  "sex": "Female",
  "votes": [5308, 8243, 7966, 8334, 8567],
  "tel": "13500000000"
}, {
  "id": "2020130",
  "name": "Mrs. Gino Dickinson",
  "age": 1911,
  "username": "Lindgren.Jamar",
  "password": "4Amya08",
  "sex": "Female",
  "votes": [2493],
  "tel": "13500000000"
}, {
  "id": "2020131",
  "name": "Miss Federico Rosenbaum",
  "age": 5623,
  "username": "Jerrod_Rodriguez",
  "password": "9Judy19",
  "sex": "Female",
  "votes": [7433, 408],
  "tel": "13600000000"
}, {
  "id": "2020132",
  "name": "Miss Theresia Champlin",
  "age": 6667,
  "username": "Koss.Mikayla",
  "password": "0Verna05",
  "sex": "Male",
  "votes": [482],
  "tel": "13500000000"
}, {
  "id": "2020133",
  "name": "Ms. Mazie Marvin",
  "age": 552,
  "username": "Allan.Reinger",
  "password": "5Coleman24",
  "sex": "Male",
  "votes": [5038, 3334, 2755, 5265],
  "tel": "13500000000"
}, {
  "id": "2020134",
  "name": "Miss Jewell Kuhn",
  "age": 2393,
  "username": "Pfannerstill_Priscilla",
  "password": "9Brice08",
  "sex": "Female",
  "votes": [2769, 975, 3431, 3666, 7532],
  "tel": "13500000000"
}, {
  "id": "2020135",
  "name": "Dr. Cale Mraz",
  "age": 7060,
  "username": "Bechtelar.Marta",
  "password": "3Devante46",
  "sex": "Male",
  "votes": [5824, 3767, 5834],
  "tel": "13600000000"
}, {
  "id": "2020136",
  "name": "Miss Kirsten Rau",
  "age": 9396,
  "username": "Morar.Marlen",
  "password": "7Muhammad58",
  "sex": "Male",
  "votes": [7259, 9193],
  "tel": "13600000000"
}, {
  "id": "2020137",
  "name": "Ms. Eve Pfannerstill",
  "age": 7464,
  "username": "Nikolas_Stanton",
  "password": "3Jodie49",
  "sex": "Male",
  "votes": [9849, 8005],
  "tel": "13500000000"
}, {
  "id": "2020138",
  "name": "Ms. Cyril Koepp",
  "age": 2697,
  "username": "Feest_Jayne",
  "password": "7Winona42",
  "sex": "Female",
  "votes": [7396],
  "tel": "13500000000"
}, {
  "id": "2020139",
  "name": "Miss Santa Lehner",
  "age": 1024,
  "username": "Keara.Parisian",
  "password": "8Kelley16",
  "sex": "Male",
  "votes": [7145, 9161, 3409],
  "tel": "13600000000"
}, {
  "id": "2020140",
  "name": "Miss Eveline McClure",
  "age": 9681,
  "username": "Aufderhar_Isadore",
  "password": "8Cortney09",
  "sex": "Female",
  "votes": [4922, 208],
  "tel": "13500000000"
}, {
  "id": "2020141",
  "name": "Mrs. Miguel Jast",
  "age": 5359,
  "username": "Wiza.Rosalind",
  "password": "7Jaden09",
  "sex": "Female",
  "votes": [3640, 1069, 542, 8024, 7837],
  "tel": "13600000000"
}, {
  "id": "2020142",
  "name": "Mr. Sunny Kemmer",
  "age": 9586,
  "username": "Hane.Ahmed",
  "password": "6Colton69",
  "sex": "Male",
  "votes": [139, 9929],
  "tel": "13600000000"
}, {
  "id": "2020143",
  "name": "Ms. Laverna Buckridge",
  "age": 2235,
  "username": "Haven.Barrows",
  "password": "6Roger63",
  "sex": "Female",
  "votes": [7123],
  "tel": "13500000000"
}, {
  "id": "2020144",
  "name": "Mrs. Effie Pacocha",
  "age": 5673,
  "username": "Pearlie_Kunde",
  "password": "6Maeve98",
  "sex": "Female",
  "votes": [8739, 1901, 1454, 5347, 7616],
  "tel": "13500000000"
}, {
  "id": "2020145",
  "name": "Miss London Lockman",
  "age": 703,
  "username": "Mallie_Schumm",
  "password": "9Raul99",
  "sex": "Male",
  "votes": [5242, 6458, 9141],
  "tel": "13500000000"
}, {
  "id": "2020146",
  "name": "Miss Kaleb Beier",
  "age": 5706,
  "username": "Torphy.Matilde",
  "password": "1Burley13",
  "sex": "Female",
  "votes": [882, 2074, 5414],
  "tel": "13600000000"
}, {
  "id": "2020147",
  "name": "Mrs. Sid Larkin",
  "age": 3909,
  "username": "Harber_Lyric",
  "password": "8Zion27",
  "sex": "Female",
  "votes": [5361, 9216, 8825, 7297, 4147],
  "tel": "13500000000"
}, {
  "id": "2020148",
  "name": "Dr. Alfred Bergnaum",
  "age": 8406,
  "username": "Trinity.Johnston",
  "password": "0Tess56",
  "sex": "Female",
  "votes": [1088, 101],
  "tel": "13600000000"
}, {
  "id": "2020149",
  "name": "Miss Talon Hagenes",
  "age": 1505,
  "username": "Dicki.Marques",
  "password": "6Flavie21",
  "sex": "Male",
  "votes": [8761, 7929, 4036],
  "tel": "13600000000"
}]

export default DATA1;
