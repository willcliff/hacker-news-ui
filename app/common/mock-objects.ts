import { Item } from './models/item';

export let dummyItem1: Item = {
    by: 'resters',
    descendants: 51,
    id: 18403101,
    kids: [
        18403101,
        18403330,
        18402787,
        18402761,
        18403277,
        18403199,
        18403020,
        18403198,
        18402857,
        18403239,
        18402730,
        18402993,
        18403011,
        18403094,
        18402954
    ],
    score: 132,
    time: 1541626053,
    title: 'We\'re in a Golden Age for Amateur Radio',
    type: 'story',
    url: 'https://www.ke6mt.us/2018/05/hf-ham-radio-on-a-budget-qrp-labs-and-qrpguys/'
};

export let dummyItem2: Item = {
    by: 'syncsynchalt',
    descendants: 22,
    id: 18403330,
    kids: [
        18401441,
        18403291,
        18403073,
        18402756,
        18402020,
        18403323,
        18403279
    ],
    score: 268,
    time: 1541607945,
    title: 'The Illustrated TLS 1.3 Connection: Every Byte Explained',
    type: 'story',
    url: 'https://tls13.ulfheim.net/'
};

export let dummyTopItemsResponse: Array<number> = [
    18403101,
    18403330,
    18402787,
    18402761,
    18403277,
    18403199,
    18403020,
    18403198,
    18402857,
    18403239,
    18402730,
    18402993,
    18403011,
    18403094,
    18402954
];

export let dummyItemsArray: Array<Item> = [
    {
        by: 'resters',
        descendants: 51,
        id: 18403101,
        kids: [
            18403101,
            18403330,
            18402787,
            18402761,
            18403277,
            18403199,
            18403020,
            18403198,
            18402857,
            18403239,
            18402730,
            18402993,
            18403011,
            18403094,
            18402954
        ],
        score: 132,
        time: 1541626053,
        title: 'We\'re in a Golden Age for Amateur Radio',
        type: 'story',
        url: 'https://www.ke6mt.us/2018/05/hf-ham-radio-on-a-budget-qrp-labs-and-qrpguys/'
    },
    {
        by: 'syncsynchalt',
        descendants: 22,
        id: 18403330,
        kids: [
            18401441,
            18403291,
            18403073,
            18402756,
            18402020,
            18403323,
            18403279
        ],
        score: 268,
        time: 1541607945,
        title: 'The Illustrated TLS 1.3 Connection: Every Byte Explained',
        type: 'story',
        url: 'https://tls13.ulfheim.net/'
    }
];
