const ravello = new URL('../images/ravello.jpg', import.meta.url);
const barselona = new URL('../images/barselona.jpg', import.meta.url);
const crete = new URL('../images/crete.jpg', import.meta.url);
const moscow = new URL('../images/moscow.jpg', import.meta.url);
const talin = new URL('../images/talin.jpg', import.meta.url);
const tartu = new URL('../images/tartu.jpg', import.meta.url);

export const initialCards = [
    {
      name: 'Амальфи',
      link: ravello
    },
    {
      name: 'Барселона',
      link: barselona
    },
    {
      name: 'Крит',
      link: crete
    },
    {
      name: 'Москва',
      link: moscow
    },
    {
      name: 'Таллин',
      link: talin
    },
    {
      name: 'Тарту',
      link: tartu
    }
];