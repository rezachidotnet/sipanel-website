export type ClientLogo = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  sector?: string;
  alt: string;
};

export const clientLogos: ClientLogo[] = [
  {
    id: 'maru-petrochemical',
    name: 'Maru Petrochemical',
    src: '/clients/maru-petrochemical.png',
    width: 200,
    height: 200,
    sector: 'petrochemical',
    alt: 'Maru Petrochemical Company'
  },
  {
    id: 'jam-petrochemical',
    name: 'Jam Petrochemical',
    src: '/clients/jam-petrochemical.png',
    width: 200,
    height: 90,
    sector: 'petrochemical',
    alt: 'Jam Petrochemical Complex'
  },
  {
    id: 'tondguyan-petrochemical',
    name: 'Tondguyan Petrochemical',
    src: '/clients/tondguyan-petrochemical.png',
    width: 200,
    height: 200,
    sector: 'petrochemical',
    alt: 'Tondguyan Petrochemical Company'
  },
  {
    id: 'fanavaran',
    name: 'Fanavaran Petrochemical',
    src: '/clients/fanavaran.png',
    width: 200,
    height: 200,
    sector: 'petrochemical',
    alt: 'Fanavaran Petrochemical Company'
  },
  {
    id: 'parsgostar',
    name: 'Parsgostar',
    src: '/clients/parsgostar.png',
    width: 200,
    height: 134,
    sector: 'industrial',
    alt: 'Parsgostar Industrial Group'
  },
  {
    id: 'aryasasool',
    name: 'Arya Sasol',
    src: '/clients/aryasasool.png',
    width: 200,
    height: 200,
    sector: 'petrochemical',
    alt: 'Arya Sasol Polymer Company'
  },
  {
    id: 'pars-garma',
    name: 'Pars Garma',
    src: '/clients/pars-garma.jpg',
    width: 200,
    height: 200,
    sector: 'industrial',
    alt: 'Pars Garma Industrial Company'
  },
  {
    id: 'zamzam-motors',
    name: 'Zamzam Motors',
    src: '/clients/zamzam-motors.png',
    width: 200,
    height: 124,
    sector: 'automotive',
    alt: 'Zamzam Motors Group'
  },
  {
    id: 'hyperme',
    name: 'Hyperme',
    src: '/clients/hyperme.webp',
    width: 200,
    height: 74,
    sector: 'commercial',
    alt: 'Hyperme Commercial Complex'
  },
  {
    id: 'artesh',
    name: 'Army of the Islamic Republic',
    src: '/clients/artesh.jpg',
    width: 200,
    height: 113,
    sector: 'defense',
    alt: 'Army of the Islamic Republic of Iran'
  },
  {
    id: 'foroodgah-teh',
    name: 'Tehran Airport',
    src: '/clients/foroodgah-teh.png',
    width: 200,
    height: 134,
    sector: 'infrastructure',
    alt: 'Tehran Imam Khomeini Airport'
  },
  {
    id: 'shahre-foroodgahi',
    name: 'Airport City',
    src: '/clients/shahre-foroodgahi.webp',
    width: 200,
    height: 96,
    sector: 'infrastructure',
    alt: 'Airport City Development'
  },
  {
    id: 'samandehi-esfahan',
    name: 'Samandehi Isfahan',
    src: '/clients/samandehi-esfahan.png',
    width: 200,
    height: 200,
    sector: 'municipal',
    alt: 'Isfahan Urban Development Organization'
  },
  {
    id: 'mese-sarchecshme',
    name: 'Mes-e Sarcheshmeh',
    src: '/clients/mese-sarchecshme.png',
    width: 200,
    height: 82,
    sector: 'mining',
    alt: 'Sarcheshmeh Copper Complex'
  }
];
