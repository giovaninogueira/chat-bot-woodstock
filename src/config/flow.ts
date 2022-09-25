import { shows } from "./shows";

const backMenu = '*Para voltar para o menu digite "Menu"*';

const menu = {
    messages: [
        '*Sigas as instruções abaixo para podermos responder suas dúvidas*...\r\n\n',
        '[ *1* ] Para ver a nossa agenda de shows 🗓️\r\n',
        '[ *2* ] Visualizar os preços de comidas e bebidas 🍔\r\n',
        '[ *3* ] Localização do evento 📍\r\n',
        '[ *4* ] Informações mais detalhadas do festival 📍\r\n\n',
        backMenu
    ]
}

const site = {
    messages: [
        `Se você tiver mais alguma dúvida, entre no nosso site.`
    ],
    link: {
        url: 'https://www.woodstock.com/',
        message: ''
    }
}

const flow = {
    'newuser': {
        messages: ['🌸 *Olá! Eu sou sua atendente virtual e irei te acompanhar nessa jornada para o Woodstock* 🎵☮️!'],
        childrens: [
            menu,
            site,
            {
                messages: [
                    '_Make love do not make war!_* 🌸💗'
                ]
            }
        ]
    },
    '1': {
        messages: [
            '*Trinta e duas apresentações serão realizadas ao longo dos três dias do evento. 🎵*\r\n'
        ],
        childrens: shows
    },
    '2': {
        messages: [
            '*Abaixo está a nossa lista de comidas que estaremos!😊* \r\n\n',
            'Cachorro quente 🌭 - $ 1.00 \r\n',
            'Água 🥤 - $ 1.00 \r\n',
            'Granola 🌱- $ 0.65 \r\n',
            'Refrigerante 🥤- $ 0.70 \r\n'
        ],
        childrens: [
            {
                messages: [backMenu]
            }
        ]
    },
    '3': {
        messages: [
            'Essa é a localização do festival Woodstock'
        ],
        childrens: [
            {
                messages: [],
                location: {
                    lat: '41.701',
                    long: '-74.88',
                    name: 'Woodstock'
                }
            },
            {
                messages: [backMenu]
            }
        ]
    },
    '4': {
        messages: [
            '*🌸 O festival vai ocorrer nos dias 15, 16 e 17 de agosto de 1969 ☮️*'
        ],
        childrens: [
            {
                messages: [
                    '*Show de arte 🎨* \r\n\n',
                    'Serão exibidas pinturas e esculturas sobre ti, na grama, cercadas pelo Hudson vailey.*\r\n',
                    'Sejam artistas, artistas do gueto e artistas talentosos terão prazer em discutir seu trabalho, ou o espírito intocado do ambiente, ou qualquer outra coisa que possa estar em sua mente.\r\n',
                    '\n'
                ]
            },
            {
                messages: [
                    '*Bazar de artesanato 🏺* \r\n\n',
                    'Se você gosta de bugigangas criativas e velharias, vai adorar passear pelo nosso bazar.\r\n',
                    'Você verá criações criativas de cerâmica de couro, miçangas e prata, bem como mapas zoádicos, roupas de acampamento e sapatos desgastados.\r\n',
                    '\n'
                ]
            },
            {
                messages: [
                    '*Comidas 🍔* \r\n\n',
                    'Haverá cocas e cachorros-quentes e dezenas de curiosas combinações de comidas e frutas para experimentar.\r\n',
                    '\n'
                ]
            },
            {
                messages: [
                    '*Centenas de hectares para percorrer 😌 🌸*\r\n\n',
                    'Caminhe por três dias sem ver um arranha-céu ou um trânsito. Empinar pipa, sol você mesmo.\r\n',
                    'Cozinhe sua própria comida e respire ar puro.\r\n',
                    'Acampamento: água e banheiros serão fornecidos.\r\n',
                    'Barracas e equipamentos de camping estarão disponíveis na loja do acampamento.\r\n',
                    '\n'
                ]
            },
            {
                messages: [
                    '*A música começa às 16h de sexta e às 13h de sábado e domingo ☮️🎵*\r\n\n',
                    'Vai durar 12 horas contínuas, exceto por algumas pausas curtas para permitir que os artistas recuperem o fôlego.\r\n',
                    '\n'
                ]
            },
            {
                messages: [],
                image: {
                    file: 'poster.jpeg',
                    name: 'poster_woodstock.jpeg',
                    message: 'Nosso poster oficial! ☮️'
                }
            },
            {
                messages: [backMenu]
            }
        ]
    },
    'default': {
        messages: [
            'Desculpa, não entendi sua mensagem...\r\n',
        ],
        childrens: [menu]
    },
    'menu': {
        messages: [],
        childrens: [menu]
    },
    '1969': {
        messages: ['*Escolha o cantor que você gostaria de ouvir...*'],
        buttons: {
            title: 'Cantor(a)',
            options: [
                'Jimi Hendrix',
                'Jefferson Airplane',
                'Ten Years After'
            ],
            description: 'Cantor(a) do festival'
        },
        childrens: []
    },
    'jimi hendrix': {
        messages: [],
        audio: {
            file: 'hey_joe.mp3'
        },
        childrens: [menu]
    },
    'jefferson airplane': {
        messages: [menu],
        audio: {
            file: 'somebody_to_love.mp3'
        },
        childrens: [menu]
    },
    'ten years after': {
        messages: [],
        audio: {
            file: 'love_to_change_the_world.mp3'
        },
        childrens: [menu]
    }
};

export { flow, backMenu }