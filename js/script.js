document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    if (!header) return;
    const onScroll = () => {
        if (window.scrollY > 8) header.classList.add('sticky-shadow');
        else header.classList.remove('sticky-shadow');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('youtube-trailer');
    const closeButton = document.querySelector('.close-button');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    hamburgerMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    const movieData = {
        celebrities: [
    { name: 'Leonardo DiCaprio', image: 'https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_UY317_CR10,0,214,317_AL_.jpg' },
    { name: 'Tom Hanks', image: 'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_UY317_CR2,0,214,317_AL_.jpg' },
    { name: 'Scarlett Johansson', image: 'https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_UY317_CR23,0,214,317_AL_.jpg' },
    { name: 'Dwayne Johnson', image: 'images/Dwen Johson.webp' },
    { name: 'Robert Downey Jr.', image: 'https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_UY317_CR9,0,214,317_AL_.jpg' },
    { name: 'Brad Pitt', image: 'https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE5MDY0Nw@@._V1_UY317_CR1,0,214,317_AL_.jpg' },
    { name: 'Meryl Streep', image: 'images/Meryl.webp' },
    { name: 'Johnny Depp', image: 'https://m.media-amazon.com/images/M/MV5BMTM0ODU5Nzk2OV5BMl5BanBnXkFtZTcwMzI2ODgyNQ@@._V1_UY317_CR4,0,214,317_AL_.jpg' },
    { name: 'Angelina Jolie', image: 'images/Angelina.webp' },
    { name: 'Morgan Freeman', image: 'https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UY317_CR4,0,214,317_AL_.jpg' },
     ],
        trending: [
            { title: 'Inception', poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', trailer: 'https://www.youtube.com/embed/YoHD9XEInc0' },
            { title: 'The Dark Knight', poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', trailer: 'https://www.youtube.com/embed/EXeTwQWrcwY' },
            { title: 'Pulp Fiction', poster: 'images/pulp fiction 2.jpg', description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', trailer: 'https://www.youtube.com/embed/s7EdQ4FqbhY' },
            { title: 'The Shawshank Redemption', poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', trailer: 'https://www.youtube.com/embed/6hB3S9bIaco' },
            { title: 'The Godfather', poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', trailer: 'https://www.youtube.com/embed/sY1S34973zA' },
            { title: 'Forrest Gump', poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.', trailer: 'https://www.youtube.com/embed/bLvqoHBptjg' },
            { title: 'Fight Club', poster: 'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg', description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.', trailer: 'https://www.youtube.com/embed/SUXWAEX2jlg' },
            { title: 'The Matrix', poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', trailer: 'https://www.youtube.com/embed/vKQi3bBA1y8' },
            { title: 'Goodfellas', poster: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.', trailer: 'https://www.youtube.com/embed/2ilzidi_J8Q' },
            { title: 'The Lord of the Rings: The Fellowship of the Ring', poster: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg', description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.', trailer: 'https://www.youtube.com/embed/V75dMMIW2B4' }
        ],
        fanFavorites: [
            { title: 'Interstellar', poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\u0027s survival.', trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E' },
            { title: 'Parasite', poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg', description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', trailer: 'https://www.youtube.com/embed/5xH0HfJHsaY' },
            { title: 'Joker', poster: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg', description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.', trailer: 'https://www.youtube.com/embed/zAGVQLHvwOY' },
            { title: 'Avengers: Endgame', poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg', description: 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.', trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c' },
            { title: 'Spider-Man: No Way Home', poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg', description: 'With Spider-Man\u0027s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.', trailer: 'https://www.youtube.com/embed/JfVOs4VSpmA' },
            { title: 'The Prestige', poster: 'images/the prestige 2.jpg', description: 'After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.', trailer: 'https://www.youtube.com/embed/o4gHCgs_c2o' },
            { title: 'The Departed', poster: 'https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_SX300.jpg', description: 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.', trailer: 'https://www.youtube.com/embed/iojhsd_oG4w' },
            { title: 'Gladiator', poster: 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', trailer: 'https://www.youtube.com/embed/owK1qxDselE' },
            { title: 'Saving Private Ryan', poster: 'https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg', description: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.', trailer: 'https://www.youtube.com/embed/RYExstiQlLc' },
            { title: 'Braveheart', poster: 'https://m.media-amazon.com/images/M/MV5BMzkzMmU0YTYtOWM3My00YzBmLWI0YzctOGYyNTkwMWE5MTJkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', description: 'When his secret bride is executed for assaulting an English soldier who tried to rape her, William Wallace begins a revolt against King Edward I of England.', trailer: 'https://www.youtube.com/embed/1NJO0jxBtMo' }
        ],
        popularInterests: [
            { title: 'Dune', poster: 'images/wp15521623-dune-awakening-wallpapers.jpg', description: 'Feature adaptation of Frank Herbert\u0027s science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.', trailer: 'https://www.youtube.com/embed/n9xhJrPXop4' },
            { title: 'The Queen\u0027s Gambit', poster: 'https://upload.wikimedia.org/wikipedia/en/1/12/The_Queen%27s_Gambit_%28miniseries%29.png', description: 'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.', trailer: 'https://www.youtube.com/embed/oZn3qSgmLqI' },
            { title: 'Stranger Things', poster: 'images/wp1839578-stranger-things-wallpapers.jpg', description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.', trailer: 'https://www.youtube.com/embed/b9EkMc79ZSU' },
            { title: 'The Mandalorian', poster: 'https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SX300.jpg', description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.', trailer: 'https://www.youtube.com/embed/aOC8E8z_ifw' },
            { title: 'Black Mirror', poster: 'images/black-mirror-shut-up-and-dance-poster-3jcpn8fd7u16dz8d.jpg', description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\u0027s greatest innovations and darkest instincts collide.', trailer: 'https://www.youtube.com/embed/jDiYGjp5iFg' },
            { title: 'The Witcher', poster: 'images/wp4453982-the-witcher-2019-wallpapers.jpg', description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.', trailer: 'https://www.youtube.com/embed/ndl1W4ltcmg' },
            { title: 'Squid Game', poster: 'images/wp15064128-cool-squid-game-wallpapers.webp', description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\u0027s games. Inside, a tempting prize awaits with deadly high stakes. A survival game that has a whopping 45.6 billion-won prize at stake.', trailer: 'https://www.youtube.com/embed/oqxAJKy0ii4' },
            { title: 'Money Heist', poster: 'https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_SX300.jpg', description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.', trailer: 'https://www.youtube.com/embed/_InqQJRqGW4' },
            { title: 'Chernobyl', poster: 'images/wp11814760-chernobyl-series-wallpapers.jpg', description: 'In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world\u0027s worst man-made catastrophes.', trailer: 'https://www.youtube.com/embed/s9APLXM9Ei8' },
            { title: 'Breaking Bad', poster: 'images/breaking bad.jpg', description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\u0027s future.', trailer: 'https://www.youtube.com/embed/HhesaQXLuRY' }
        ],
        inTheaters: [
            { title: 'Dune: Part Two', poster: 'images/wp15521623-dune-awakening-wallpapers.jpg', description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', trailer: 'https://www.youtube.com/embed/U2Qp5pL3ovA' },
            { title: 'Avatar: The Way of Water', poster: 'images/avatar 2.jpg', description: 'Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\u0027vi race to protect their planet.', trailer: 'https://www.youtube.com/embed/d9MyW72ELq0' },
            { title: 'Oppenheimer', poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', trailer: 'https://www.youtube.com/embed/uYPbbksJxIg' },
            { title: 'Barbie', poster: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg', description: 'Barbie suffers a crisis that leads her to question her world and her existence.', trailer: 'https://www.youtube.com/embed/pBk4NYhWNMM' },
            { title: 'Mission: Impossible - Dead Reckoning Part One', poster: 'https://m.media-amazon.com/images/M/MV5BYzFiZjc1YzctMDY3Zi00NGE5LTlmNWEtN2Q3OWFjYjY1NGM2XkEyXkFqcGdeQXVyMTUyMTUzNjQ0._V1_SX300.jpg', description: 'Ethan Hunt and his IMF team must track down a dangerous weapon before it falls into the wrong hands.', trailer: 'https://www.youtube.com/embed/avz063tgE40' },
            { title: 'Guardians of the Galaxy Vol. 3', poster: 'images/wp12655943-guardians-of-the-galaxy-aesthetic-wallpapers.jpg', description: 'Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.', trailer: 'https://www.youtube.com/embed/u3V5KDHRQvk' },
            { title: 'John Wick: Chapter 4', poster: 'https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg', description: 'John Wick uncovers a path to defeating the High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.', trailer: 'https://www.youtube.com/embed/qEVUtrk8_B4' },
            { title: 'Creed III', poster: 'https://m.media-amazon.com/images/M/MV5BYWY1ZDY4MmQtYjhiYS00N2QwLTk1NzgtOWI2YzUwZThjNDYwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg', description: 'Adonis has been thriving in both his career and family life, but when a childhood friend and former boxing prodigy resurfaces, the face-off is more than just a fight.', trailer: 'https://www.youtube.com/embed/AHmCH7iB_IM' },
            { title: 'Fast X', poster: 'https://m.media-amazon.com/images/M/MV5BNzZmOTU1ZTEtYzVhNi00NzQxLWI5ZjAtNWNhNjEwY2E3YmZjXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg', description: 'Dom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes.', trailer: 'https://www.youtube.com/embed/32RAq6JzY-w' }
        ],
        boxOffice: [
            { title: 'Avatar: The Way of Water', poster: 'images/avatar 2.jpg', description: 'Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\u0027vi race to protect their planet.', trailer: 'https://www.youtube.com/embed/d9MyW72ELq0' },
            { title: 'Avengers: Endgame', poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg', description: 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.', trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c' },
            { title: 'Spider-Man: No Way Home', poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg', description: 'With Spider-Man\u0027s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing him to discover what it truly means to be Spider-Man.', trailer: 'https://www.youtube.com/embed/JfVOs4VSpmA' },
            { title: 'Top Gun: Maverick', poster: 'images/wp13017366-top-gun-phone-wallpapers.jpg', description: 'After more than thirty years of service as one of the Navy\u0027s top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.', trailer: 'https://www.youtube.com/embed/qSqVVswa420' },
            { title: 'Black Panther: Wakanda Forever', poster: 'https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg', description: 'The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T\u0027Challa.', trailer: 'https://www.youtube.com/embed/_Z3QKkl1WyM' },
            { title: 'Jurassic World Dominion', poster: 'images/wp12401783-jurassic-park-4k-wallpapers.jpg', description: 'Four years after the destruction of Isla Nublar, dinosaurs now live--and hunt--alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history\u0027s most fearsome creatures.', trailer: 'https://www.youtube.com/embed/fb5ELWi-k4s' },
            { title: 'Doctor Strange in the Multiverse of Madness', poster: 'images/wp11030986-marvel-doctor-strange-in-the-multiverse-of-madness-2022-wallpapers.jpg', description: 'Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the multiverse. They seek help from Wanda the Scarlet Witch, Wong and others.', trailer: 'https://www.youtube.com/embed/aWzlQ2N6qqg' },
            { title: 'Minions: The Rise of Gru', poster: 'images/minions 2.jpg', description: 'The untold story of one 12-year-old\u0027s dream to become the world\u0027s greatest supervillain.', trailer: 'https://www.youtube.com/embed/8gXYIJ_C-e4' },
            { title: 'The Super Mario Bros. Movie', poster: 'https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_SX300.jpg', description: 'The story of The Super Mario Bros. on their journey through the Mushroom Kingdom.', trailer: 'https://www.youtube.com/embed/TnGl01FkMMo' },
            { title: 'Thor: Love and Thunder', poster: 'images/wp11286055-thor-love-and-thunder-wallpapers.jpg', description: 'Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.', trailer: 'https://www.youtube.com/embed/Go8nTmfrQd8' }
        ]
    };

    function createMovieCard(movie) {
        return `
            <div class="swiper-slide">
                <div class="movie-card" data-trailer="${movie.trailer}" data-movie='${btoa(JSON.stringify(movie))}'>
                    <img src="${movie.poster}" alt="${movie.title}" class="movie-card-poster">
                    <div class="wishlist-icon">&#x2764;</div> <!-- Heart icon -->
                    <div class="movie-card-content">
                        <h3>${movie.title}</h3>
                        <p>${movie.description}</p>
                        <div class="movie-card-actions">
                            <a href="#" class="play-trailer-btn">Play Trailer</a>
                            <button type="button" class="ai-summary-btn" data-title="${movie.title}">AI Summary</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function createCelebrityCard(celebrity) {
        return `
            <div class="swiper-slide">
                <div class="celebrity-card">
                    <img src="${celebrity.image}" alt="${celebrity.name}">
                    <div class="celebrity-name">${celebrity.name}</div>
                </div>
            </div>
        `;
    }

    document.getElementById('celebrities-swiper').querySelector('.swiper-wrapper').innerHTML = movieData.celebrities.map(createCelebrityCard).join('');
    document.getElementById('trending-movies').innerHTML = movieData.trending.map(createMovieCard).join('');
    document.getElementById('fan-favorites-movies').innerHTML = movieData.fanFavorites.map(createMovieCard).join('');
    document.getElementById('popular-interests-movies').innerHTML = movieData.popularInterests.map(createMovieCard).join('');
    document.getElementById('in-theaters-movies').innerHTML = movieData.inTheaters.map(createMovieCard).join('');
    document.getElementById('box-office-movies').innerHTML = movieData.boxOffice.map(createMovieCard).join('');

    const allMovies = [...new Set([
        ...movieData.trending.map(m => m.title),
        ...movieData.fanFavorites.map(m => m.title),
        ...movieData.popularInterests.map(m => m.title),
        ...movieData.inTheaters.map(m => m.title),
        ...movieData.boxOffice.map(m => m.title)
    ])];
    console.log("All Movies for Suggestions:", allMovies);

    new Swiper('#celebrities-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '#celebrities-swiper .swiper-button-next',
            prevEl: '#celebrities-swiper .swiper-button-prev',
        },
    });

    new Swiper('#trending-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        loop: true,
        navigation: {
            nextEl: '#trending-swiper .swiper-button-next',
            prevEl: '#trending-swiper .swiper-button-prev',
        },
    });

    new Swiper('#fan-favorites-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        loop: true,
        navigation: {
            nextEl: '#fan-favorites-swiper .swiper-button-next',
            prevEl: '#fan-favorites-swiper .swiper-button-prev',
        },
    });

    new Swiper('#popular-interests-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        loop: true,
        navigation: {
            nextEl: '#popular-interests-swiper .swiper-button-next',
            prevEl: '#popular-interests-swiper .swiper-button-prev',
        },
    });

    new Swiper('#in-theaters-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        loop: true,
        navigation: {
            nextEl: '#in-theaters-swiper .swiper-button-next',
            prevEl: '#in-theaters-swiper .swiper-button-prev',
        },
    });

    new Swiper('#box-office-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        loop: true,
        navigation: {
            nextEl: '#box-office-swiper .swiper-button-next',
            prevEl: '#box-office-swiper .swiper-button-prev',
        },
    });

    // Search Suggestions
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.querySelector('.suggestions-container');
    const searchBar = document.querySelector('.search-bar');
    const searchBtn = document.getElementById('search-btn');

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        if (query.length === 0) {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
            return;
        }

        const filteredMovies = allMovies.filter(movie => movie.toLowerCase().includes(query));
        displaySuggestions(filteredMovies);
    });

    function displaySuggestions(suggestions) {
        if (suggestions.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        suggestionsContainer.innerHTML = '';
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = suggestion;
            suggestionsContainer.appendChild(suggestionItem);
        });
        suggestionsContainer.style.display = 'block';
    }

    suggestionsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('suggestion-item')) {
            searchInput.value = e.target.textContent;
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
            searchBtn.click();
        }
    });

    document.addEventListener('click', function (e) {
        if (searchBar && !searchBar.contains(e.target)) {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
        }
    });


    document.body.addEventListener('click', function (e) {
        // Handle play trailer button click
        if (e.target.classList.contains('play-trailer-btn')) {
            e.preventDefault();
            const movieCard = e.target.closest('.movie-card');
            const trailerUrl = movieCard.dataset.trailer;
            if (trailerUrl) {
                iframe.src = trailerUrl;
                modal.style.display = 'block';
            }
        }


    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
        iframe.src = '';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            iframe.src = '';
        }
    });

    // Movie Details Modal
    const detailsModal = document.getElementById('movie-details-modal');
    if (detailsModal) {
        const detailsModalBody = detailsModal.querySelector('.modal-body');
        const detailsCloseButton = detailsModal.querySelector('.close-button');

        function openDetailsModal(movieData) {
            const data = JSON.parse(atob(movieData));
            detailsModalBody.innerHTML = `
                <img src="${data.poster}" alt="${data.title}" class="modal-poster">
                <div class="modal-info">
                    <h2>${data.title}</h2>
                    <p>${data.description}</p>
                    ${data.trailer ? `<a href="#" class="play-trailer-btn" data-trailer="${data.trailer}">Watch Trailer</a>` : ''}
                </div>
            `;
            detailsModal.style.display = 'block';
        }

        function closeDetailsModal() {
            detailsModal.style.display = 'none';
            detailsModalBody.innerHTML = '';
        }

        detailsCloseButton.addEventListener('click', closeDetailsModal);
        window.addEventListener('click', function(event) {
            if (event.target == detailsModal) {
                closeDetailsModal();
            }
        });

        window.openDetailsModal = openDetailsModal;
    }

    // Custom navigation buttons functionality
    document.querySelectorAll('.custom-prev-btn').forEach(button => {
        button.addEventListener('click', function() {
            const swiperId = this.getAttribute('data-swiper');
            const swiperElement = document.getElementById(swiperId);
            if (swiperElement && swiperElement.swiper) {
                swiperElement.swiper.slidePrev();
            }
        });
    });

    document.querySelectorAll('.custom-next-btn').forEach(button => {
        button.addEventListener('click', function() {
            const swiperId = this.getAttribute('data-swiper');
            const swiperElement = document.getElementById(swiperId);
            if (swiperElement && swiperElement.swiper) {
                swiperElement.swiper.slideNext();
            }
        });
    });

(function () {
    const STORAGE_KEY = 'wishlist';

    function getWishlist() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    function saveWishlist(wishlist) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    }

    function toggleWishlist(movie, iconElement) {
        let wishlist = getWishlist();
        const movieIndex = wishlist.findIndex(item => item.title === movie.title);

        if (movieIndex > -1) {
            wishlist.splice(movieIndex, 1);
            iconElement.classList.remove('added-to-wishlist');
        } else {
            wishlist.push(movie);
            iconElement.classList.add('added-to-wishlist');
        }

        saveWishlist(wishlist);
    }

    function updateAllWishlistIcons() {
        const wishlist = getWishlist();
        document.querySelectorAll('.movie-card').forEach(card => {
            const movieData = card.dataset.movie;
            if (movieData) {
                const movie = JSON.parse(atob(movieData));
                const icon = card.querySelector('.wishlist-icon');
                if (wishlist.some(item => item.title === movie.title)) {
                    icon.classList.add('added-to-wishlist');
                } else {
                    icon.classList.remove('added-to-wishlist');
                }
            }
        });
    }

    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('wishlist-icon')) {
            e.stopPropagation();
            if (!document.querySelector('.username')) {
                alert('Please log in first.');
                return;
            }
            const movieCard = e.target.closest('.movie-card');
            const movie = JSON.parse(atob(movieCard.dataset.movie));
            toggleWishlist(movie, e.target);
        }
    });

    // Initial update on page load
    updateAllWishlistIcons();
})();

// Video Playlist functionality
const mainVideoPlayer = document.getElementById('main-video-player');
const videoList = document.getElementById('video-list');

document.body.addEventListener('click', function(e) {
    const listItem = e.target.closest('.video-list-item');
    if (listItem && videoList.contains(listItem)) {
        // Remove active class from all items
        videoList.querySelectorAll('.video-list-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to the clicked item
        listItem.classList.add('active');

        // Update the main video player
        const videoId = listItem.dataset.videoId;
        if (videoId) {
            mainVideoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
    }
});
});

document.addEventListener('DOMContentLoaded', function () {
    try {
        const links = document.querySelectorAll('nav ul li a');
        const current = (window.location.pathname.split('/').pop() || 'index.php').toLowerCase();

        links.forEach(a => {
            const hrefFile = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
            // match exact file or root -> index.php
            if (hrefFile && (hrefFile === current || (current === '' && (hrefFile === 'index.php' || hrefFile === '')))) {
                a.classList.add('active');
                a.setAttribute('aria-current', 'page');
            } else {
                a.classList.remove('active');
                a.removeAttribute('aria-current');
            }
        });
    } catch (e) { /* ignore */ }
});

document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.querySelector('.search-bar');
    if (!searchBar || searchBar.dataset.searchBound === '1') return;
    searchBar.dataset.searchBound = '1';

    const input = searchBar.querySelector('input');
    const button = searchBar.querySelector('button');

    function doSearch() {
        const q = (input && input.value || '').trim();
        if (!q) return;
        window.location.href = 'search.php?q=' + encodeURIComponent(q);
    }

    if (button) button.addEventListener('click', function (e) { e.preventDefault(); doSearch(); });
    if (input) input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); doSearch(); } });
});

document.addEventListener('click', async (e) => {
  const btn = e.target.closest && e.target.closest('.ai-summary-btn');
  if (!btn) return;
  const title = btn.dataset.title || btn.getAttribute('data-title') || 'this movie';
  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = 'Thinking...';

  try {
    const prompt = `Give a concise (2-3 sentence) spoiler-free summary and three bullet tags for the movie: ${title}`;
    const res = await fetch('api/mistral_proxy.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();

    // Handle errors from either the proxy or the Mistral AI API
    if (data.error) {
        let errorMessage = data.error.message || data.error;
        if (data.curl_error) {
            errorMessage += `\n\nDetails: ${data.curl_error}`;
        }
        alert(errorMessage);
    } else {
        // Handle success
        const aiText = data?.choices?.[0]?.message?.content || JSON.stringify(data);
        
        const modal = document.getElementById('ai-summary-modal');
        const modalText = document.getElementById('ai-summary-text');
        const closeButton = modal.querySelector('.ai-summary-close-button');
        const audioBtn = document.getElementById('ai-summary-audio-btn');

        modalText.textContent = aiText;
        modal.style.display = 'block';

        closeButton.onclick = function() {
            modal.style.display = 'none';
            speechSynthesis.cancel();
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                speechSynthesis.cancel();
            }
        }

        let isSpeaking = false;
        audioBtn.textContent = 'Play';

        audioBtn.onclick = function() {
            if (isSpeaking) {
                speechSynthesis.cancel();
                isSpeaking = false;
                audioBtn.textContent = 'Play';
            } else {
                const utterance = new SpeechSynthesisUtterance(aiText);
                utterance.onend = function() {
                    isSpeaking = false;
                    audioBtn.textContent = 'Play';
                };
                speechSynthesis.speak(utterance);
                isSpeaking = true;
                audioBtn.textContent = 'Stop';
            }
        };
    }

  } catch (err) {
    console.error(err);
    alert('AI request failed.');
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
});

document.addEventListener('DOMContentLoaded', function () {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi;
    }

    const generateResponse = (chatElement, userMessage) => {
        const API_URL = "api/mistral_proxy.php";
        const messageElement = chatElement.querySelector("p");

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: userMessage })
        }

        fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
            let responseText = "";
            if (data.choices && data.choices.length > 0) {
                responseText = data.choices[0].message.content;
            } else if (data.error) {
                responseText = data.error;
            }
            messageElement.textContent = responseText;
        }).catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }

    const handleChat = () => {
        const userMessage = chatInput.value.trim();
        if(!userMessage) return;

        chatInput.value = "";
        chatInput.style.height = `55px`;

        const outgoingChatLi = createChatLi(userMessage, "outgoing");
        chatbox.appendChild(outgoingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        
        setTimeout(() => {
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi, userMessage);
        }, 600);
    }

    chatInput.addEventListener("input", () => {
        chatInput.style.height = `55px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
});
