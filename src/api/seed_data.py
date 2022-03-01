from api.shared.encrypte_pass import encryp_pass

data = {
    "User":[
        {
            "username": "rlence",
            "password":  encryp_pass("12345678"),
            "email": 'lenceriegegscardo@gmail.com',
            "biography": "Teacher",
            "img_url": 'https://res.cloudinary.com/andrxsaf/image/upload/v1646173755/5335553_eo0y3c.jpg'
        },
        {
            "username": "andresaf",
            "password": encryp_pass("1234567"),
            "email": "andresaf@gmail.com",
            "email": 'lenceriegegscardo@gmail.com',
            "biography": "Level 37 PRO GAMER.",
            "img_url": 'https://res.cloudinary.com/andrxsaf/image/upload/v1646173737/1fc5e2e5a5ba8d1701af1ce06a3581fc_hnhnu1.jpg'
        },
        {
            "username": "andres",
            "password":  encryp_pass("123456"),
            "email": 'andres@gmail.com',
            "biography": "Zelda Lover.",
            "img_url": 'https://res.cloudinary.com/andrxsaf/image/upload/v1646173726/14f0831e5f4a80eae38d2a460508ebdd_osywbz.jpg'
        },
        {
            "username": "camiloo",
            "password":  encryp_pass("123456"),
            "email": 'camilo@gmail.com',
            "biography": "Student.",
            "img_url": 'https://res.cloudinary.com/andrxsaf/image/upload/v1646173723/anime-avatar-profile-picture-thypix-55-700x700_figcye.jpg'
        },
        {
            "username": "otracuenta",
            "password":  encryp_pass("123456"),
            "email": 'otracuenta@gmail.com',
            "biography": "This is just another description.",
            "img_url": 'https://res.cloudinary.com/andrxsaf/image/upload/v1646173716/gyaru-anime-character-yl_j5c7q2.jpg'
        }
    ],
    "Post":[
        {
            "img_url": "https://res.cloudinary.com/andrxsaf/image/upload/v1646106472/l3w4hbb5sjmb9dipijs0.jpg",
            "description": "Love riding in this pokémon, a lovely experience.",
            "game": "Pokemon Legends Arceus",
            "console": "Switch",
            "tag1": "#Dialga",
            "tag2": "#Rider",
            "tag3": "#Legends",
            "tag4": "#Awesome",
            "tag5": "#5Stars",
            "user_id": 1
        },
        {
            "img_url": "https://res.cloudinary.com/andrxsaf/image/upload/v1646160780/legend-zelda-breath-wild-nuevas-imagenes_1_tfbwqp.jpg",
            "description": "Been playing this game for DAYS and I enjoy every second of it.",
            "game": "The Legend of Zelda",
            "console": "Switch",
            "tag1": "#Zelda",
            "tag2": "#Link",
            "tag3": "#Triforce",
            "tag4": "",
            "tag5": "",
            "user_id": 2
        },
        {
            "img_url": "https://res.cloudinary.com/andrxsaf/image/upload/v1646160773/horizon-2-forbidden-west-embargo-14-febrero-2609225_fq4nix.jpg",
            "description": "",
            "game": "Horizon Forbidden West",
            "console": "PS5",
            "tag1": "#NewGame",
            "tag2": "#Horizon",
            "tag3": "#Amazing",
            "tag4": "#f4f",
            "tag5": "",
            "user_id": 3
        },
        {
            "img_url": "",
            "description": "do anyone know where can I find this last moon in the dessert zone??? I'm really stuck in this part :(( Game over hehe :(",
            "game": "Super Mario Odyssey",
            "console": "Switch",
            "tag1": "#GameOver",
            "tag2": "",
            "tag3": "",
            "tag4": "",
            "tag5": "",
            "user_id": 4
        },
        {
            "img_url": "https://res.cloudinary.com/andrxsaf/image/upload/v1646160762/pokxmon_legends_arceus_podrxa_ser_en_realidad_un_videojuego_lineal.jpg_976912859_uh29nm.jpg",
            "description": "",
            "game": "Pokemon Legends",
            "console": "Switch",
            "tag1": "#Gang",
            "tag2": "#Enjoy",
            "tag3": "#Chill",
            "tag4": "",
            "tag5": "",
            "user_id": 5
        },
        {
            "img_url": "https://res.cloudinary.com/andrxsaf/image/upload/v1646161003/1580968638_718742_1580977415_noticia_normal_mcda8p.jpg",
            "description": "PATA PATA PATA PON!!",
            "game": "Patapon",
            "console": "PSP",
            "tag1": "#Patapon",
            "tag2": "#Music",
            "tag3": "#Fun",
            "tag4": "",
            "tag5": "",
            "user_id": 1
        },
        {
            "img_url": "https://res.cloudinary.com/andrxsaf/image/upload/v1646161007/final-fantasy-vii-remake-demo_9qr4_o2rfav.jpg",
            "description": "This is pretty iconic, BEST CINEMATIC EVER!!!!!",
            "game": "Final Fantasy VII",
            "console": "PS4",
            "tag1": "#Smash",
            "tag2": "#FinalBoss",
            "tag3": "",
            "tag4": "",
            "tag5": "",
            "user_id": 2
        }
    ]
}