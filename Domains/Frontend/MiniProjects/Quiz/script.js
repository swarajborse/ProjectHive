// Quiz Data by Category and Difficulty
const quizData = {
    general: {
        easy: [
            { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
            { question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 },
            { question: "What color is the sky on a clear day?", options: ["Green", "Blue", "Red", "Yellow"], correct: 1 },
            { question: "How many days are in a week?", options: ["5", "6", "7", "8"], correct: 2 },
            { question: "What is the opposite of hot?", options: ["Warm", "Cold", "Cool", "Freezing"], correct: 1 },
            { question: "Which animal is known as man's best friend?", options: ["Cat", "Dog", "Bird", "Fish"], correct: 1 },
            { question: "What do bees make?", options: ["Milk", "Honey", "Butter", "Cheese"], correct: 1 },
            { question: "How many legs does a spider have?", options: ["6", "8", "10", "12"], correct: 1 },
            { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 },
            { question: "What is H2O?", options: ["Air", "Water", "Fire", "Earth"], correct: 1 }
        ],
        medium: [
            { question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "Liechtenstein", "Malta"], correct: 1 },
            { question: "In which year did World War II end?", options: ["1943", "1944", "1945", "1946"], correct: 2 },
            { question: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Rupee"], correct: 2 },
            { question: "Who painted the Mona Lisa?", options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"], correct: 1 },
            { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correct: 0 },
            { question: "How many bones are in the human body?", options: ["186", "206", "226", "246"], correct: 1 },
            { question: "What is the largest planet in our solar system?", options: ["Saturn", "Neptune", "Jupiter", "Uranus"], correct: 2 },
            { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1 },
            { question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2 },
            { question: "What year did the Titanic sink?", options: ["1910", "1911", "1912", "1913"], correct: 2 }
        ],
        hard: [
            { question: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2 },
            { question: "Who was the first person to step on the moon?", options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], correct: 1 },
            { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correct: 2 },
            { question: "In which year did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], correct: 2 },
            { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
            { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo"], correct: 1 },
            { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
            { question: "How many elements are in the periodic table?", options: ["108", "118", "128", "138"], correct: 1 },
            { question: "What is the largest desert in the world?", options: ["Sahara", "Arabian", "Antarctic", "Gobi"], correct: 2 },
            { question: "Who painted 'The Starry Night'?", options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dali"], correct: 1 }
        ]
    },
    science: {
        easy: [
            { question: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
            { question: "What gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
            { question: "How many hearts does an octopus have?", options: ["1", "2", "3", "4"], correct: 2 },
            { question: "What is the center of an atom called?", options: ["Electron", "Proton", "Neutron", "Nucleus"], correct: 3 },
            { question: "What is the boiling point of water?", options: ["50°C", "75°C", "100°C", "125°C"], correct: 2 },
            { question: "What force keeps us on the ground?", options: ["Magnetism", "Gravity", "Friction", "Inertia"], correct: 1 },
            { question: "What is the largest organ in the human body?", options: ["Heart", "Brain", "Liver", "Skin"], correct: 3 },
            { question: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], correct: 1 },
            { question: "What is the symbol for water?", options: ["H2O", "CO2", "O2", "NaCl"], correct: 0 },
            { question: "What animal can regrow its tail?", options: ["Cat", "Dog", "Lizard", "Bird"], correct: 2 }
        ],
        medium: [
            { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"], correct: 2 },
            { question: "What is the study of earthquakes called?", options: ["Seismology", "Meteorology", "Geology", "Astronomy"], correct: 0 },
            { question: "What is the chemical formula for salt?", options: ["NaCl", "KCl", "CaCl2", "MgCl2"], correct: 0 },
            { question: "How long does light from the Sun take to reach Earth?", options: ["8 minutes", "12 minutes", "16 minutes", "20 minutes"], correct: 0 },
            { question: "What is the smallest unit of life?", options: ["Atom", "Molecule", "Cell", "Tissue"], correct: 2 },
            { question: "What type of blood cells fight infection?", options: ["Red", "White", "Platelets", "Plasma"], correct: 1 },
            { question: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], correct: 2 },
            { question: "What is the study of living organisms called?", options: ["Chemistry", "Physics", "Biology", "Geology"], correct: 2 },
            { question: "How many teeth does an adult human have?", options: ["28", "30", "32", "34"], correct: 2 },
            { question: "What is the speed of sound?", options: ["243 m/s", "343 m/s", "443 m/s", "543 m/s"], correct: 1 }
        ],
        hard: [
            { question: "What is Avogadro's number?", options: ["6.022 × 10²³", "3.14 × 10²³", "9.81 × 10²³", "1.60 × 10²³"], correct: 0 },
            { question: "What is the Heisenberg Uncertainty Principle about?", options: ["Energy", "Position and momentum", "Time", "Mass"], correct: 1 },
            { question: "What is the half-life of Carbon-14?", options: ["5,730 years", "10,000 years", "1,000 years", "50,000 years"], correct: 0 },
            { question: "What particle has no electric charge?", options: ["Proton", "Electron", "Neutron", "Positron"], correct: 2 },
            { question: "What is the pH of pure water?", options: ["5", "6", "7", "8"], correct: 2 },
            { question: "What is the lightest element?", options: ["Helium", "Hydrogen", "Lithium", "Beryllium"], correct: 1 },
            { question: "What is absolute zero in Celsius?", options: ["-273.15°C", "-100°C", "-200°C", "-300°C"], correct: 0 },
            { question: "What is the formula for photosynthesis?", options: ["6CO2 + 6H2O → C6H12O6 + 6O2", "C6H12O6 → 6CO2 + 6H2O", "2H2 + O2 → 2H2O", "N2 + 3H2 → 2NH3"], correct: 0 },
            { question: "What is quantum entanglement?", options: ["Particle decay", "Correlated particles", "Wave function", "Energy transfer"], correct: 1 },
            { question: "How many chromosomes do humans have?", options: ["23", "46", "48", "92"], correct: 1 }
        ]
    },
    history: {
        easy: [
            { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correct: 1 },
            { question: "In which year did Columbus discover America?", options: ["1492", "1500", "1600", "1700"], correct: 0 },
            { question: "What ancient wonder was in Egypt?", options: ["Colosseum", "Pyramids", "Great Wall", "Taj Mahal"], correct: 1 },
            { question: "Who built the Ark in the Bible?", options: ["Moses", "Noah", "Abraham", "David"], correct: 1 },
            { question: "What city was the first atomic bomb dropped on?", options: ["Tokyo", "Nagasaki", "Hiroshima", "Kyoto"], correct: 2 },
            { question: "Who was known as the Iron Lady?", options: ["Queen Elizabeth", "Margaret Thatcher", "Angela Merkel", "Indira Gandhi"], correct: 1 },
            { question: "What year did World War I start?", options: ["1912", "1914", "1916", "1918"], correct: 1 },
            { question: "Who was the ancient Greek god of war?", options: ["Zeus", "Poseidon", "Ares", "Apollo"], correct: 2 },
            { question: "What empire was ruled by Julius Caesar?", options: ["Greek", "Roman", "Persian", "Egyptian"], correct: 1 },
            { question: "Where did the Olympic Games originate?", options: ["Rome", "Egypt", "Greece", "Persia"], correct: 2 }
        ],
        medium: [
            { question: "Who wrote the Communist Manifesto?", options: ["Lenin", "Stalin", "Marx and Engels", "Mao"], correct: 2 },
            { question: "What year did the French Revolution begin?", options: ["1789", "1799", "1809", "1819"], correct: 0 },
            { question: "Who was the last Pharaoh of Egypt?", options: ["Tutankhamun", "Ramses II", "Cleopatra", "Nefertiti"], correct: 2 },
            { question: "What was the ancient trade route between East and West?", options: ["Spice Route", "Silk Road", "Tea Trail", "Gold Path"], correct: 1 },
            { question: "Who led India to independence?", options: ["Nehru", "Gandhi", "Patel", "Jinnah"], correct: 1 },
            { question: "What year did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], correct: 2 },
            { question: "Who was the first Roman Emperor?", options: ["Julius Caesar", "Augustus", "Nero", "Caligula"], correct: 1 },
            { question: "What was the Cold War between?", options: ["UK & France", "USA & USSR", "China & Japan", "Germany & Italy"], correct: 1 },
            { question: "Who discovered penicillin?", options: ["Marie Curie", "Louis Pasteur", "Alexander Fleming", "Jonas Salk"], correct: 2 },
            { question: "What year was the United Nations founded?", options: ["1943", "1944", "1945", "1946"], correct: 2 }
        ],
        hard: [
            { question: "What treaty ended World War I?", options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Vienna", "Treaty of Rome"], correct: 1 },
            { question: "Who was the first Emperor of China?", options: ["Qin Shi Huang", "Han Wudi", "Tang Taizong", "Ming Yongle"], correct: 0 },
            { question: "When was the Magna Carta signed?", options: ["1215", "1315", "1415", "1515"], correct: 0 },
            { question: "What ancient civilization built Machu Picchu?", options: ["Aztec", "Maya", "Inca", "Olmec"], correct: 2 },
            { question: "Who was the leader during the Russian Revolution?", options: ["Stalin", "Lenin", "Trotsky", "Kerensky"], correct: 1 },
            { question: "What year did the Ottoman Empire fall?", options: ["1918", "1920", "1922", "1924"], correct: 2 },
            { question: "Who was the first woman to win a Nobel Prize?", options: ["Rosalind Franklin", "Marie Curie", "Dorothy Hodgkin", "Ada Lovelace"], correct: 1 },
            { question: "What was the capital of the Byzantine Empire?", options: ["Rome", "Athens", "Constantinople", "Alexandria"], correct: 2 },
            { question: "When did the Battle of Hastings occur?", options: ["1066", "1166", "1266", "1366"], correct: 0 },
            { question: "Who united the Mongol tribes?", options: ["Kublai Khan", "Genghis Khan", "Timur", "Attila"], correct: 1 }
        ]
    },
    technology: {
        easy: [
            { question: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Unit"], correct: 1 },
            { question: "What does WWW stand for?", options: ["World Wide Web", "World Web Wide", "Web World Wide", "Wide World Web"], correct: 0 },
            { question: "Which company created the iPhone?", options: ["Samsung", "Apple", "Google", "Microsoft"], correct: 1 },
            { question: "What does USB stand for?", options: ["Universal Serial Bus", "United Serial Bus", "Universal System Bus", "United System Bus"], correct: 0 },
            { question: "What is the most popular search engine?", options: ["Bing", "Yahoo", "Google", "DuckDuckGo"], correct: 2 },
            { question: "Who founded Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"], correct: 1 },
            { question: "What does 'Wi-Fi' stand for?", options: ["Wireless Fidelity", "Wide Fidelity", "Wireless Function", "Wide Function"], correct: 0 },
            { question: "What is the name of Amazon's voice assistant?", options: ["Siri", "Alexa", "Cortana", "Google"], correct: 1 },
            { question: "Which language is used for web pages?", options: ["Python", "Java", "HTML", "C++"], correct: 2 },
            { question: "What does PDF stand for?", options: ["Portable Document Format", "Public Document Format", "Personal Document Format", "Private Document Format"], correct: 0 }
        ],
        medium: [
            { question: "What year was Facebook launched?", options: ["2002", "2003", "2004", "2005"], correct: 2 },
            { question: "What does RAM stand for?", options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Real Access Memory"], correct: 0 },
            { question: "Who is known as the father of computers?", options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"], correct: 1 },
            { question: "What programming language is known for AI?", options: ["JavaScript", "Python", "Ruby", "Swift"], correct: 1 },
            { question: "What does VPN stand for?", options: ["Virtual Private Network", "Visual Private Network", "Virtual Public Network", "Visual Public Network"], correct: 0 },
            { question: "What is the main programming language for Android?", options: ["Swift", "Python", "Kotlin", "Ruby"], correct: 2 },
            { question: "What does GPU stand for?", options: ["Graphics Processing Unit", "General Processing Unit", "Graphics Performance Unit", "General Performance Unit"], correct: 0 },
            { question: "Which company developed Java?", options: ["Microsoft", "Apple", "Sun Microsystems", "IBM"], correct: 2 },
            { question: "What is the binary system based on?", options: ["0 and 1", "1 and 2", "0 and 2", "1 and 3"], correct: 0 },
            { question: "What does API stand for?", options: ["Application Programming Interface", "Applied Programming Interface", "Application Program Interface", "Applied Program Interface"], correct: 0 }
        ],
        hard: [
            { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1 },
            { question: "Who created Linux?", options: ["Bill Gates", "Linus Torvalds", "Steve Jobs", "Dennis Ritchie"], correct: 1 },
            { question: "What does SOLID stand for in programming?", options: ["Software Object Language Interface Design", "Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion", "System Oriented Linear Interface Development", "Structured Object Level Interface Design"], correct: 1 },
            { question: "What year was Python first released?", options: ["1989", "1991", "1993", "1995"], correct: 1 },
            { question: "What is the CAP theorem in distributed systems?", options: ["Consistency, Availability, Partition tolerance", "Cache, Access, Performance", "Control, Access, Permission", "Connection, Authentication, Protocol"], correct: 0 },
            { question: "Who invented the World Wide Web?", options: ["Steve Jobs", "Bill Gates", "Tim Berners-Lee", "Mark Zuckerberg"], correct: 2 },
            { question: "What does REST API stand for?", options: ["Representational State Transfer", "Real Estate State Transfer", "Remote State Transfer", "Resource State Transfer"], correct: 0 },
            { question: "What is the maximum size of an IPv4 address?", options: ["16 bits", "32 bits", "64 bits", "128 bits"], correct: 1 },
            { question: "What programming paradigm does Haskell use?", options: ["Object-oriented", "Procedural", "Functional", "Logical"], correct: 2 },
            { question: "What does CRUD stand for in databases?", options: ["Create, Read, Update, Delete", "Copy, Read, Update, Delete", "Create, Remove, Update, Delete", "Copy, Remove, Update, Delete"], correct: 0 }
        ]
    },
    sports: {
        easy: [
            { question: "How many players in a soccer team?", options: ["9", "10", "11", "12"], correct: 2 },
            { question: "What sport is the Super Bowl for?", options: ["Basketball", "Baseball", "American Football", "Soccer"], correct: 2 },
            { question: "How many points is a basketball free throw?", options: ["1", "2", "3", "4"], correct: 0 },
            { question: "What color are the goal posts in football?", options: ["White", "Yellow", "Red", "Blue"], correct: 1 },
            { question: "How many holes in a standard golf course?", options: ["9", "12", "18", "24"], correct: 2 },
            { question: "What sport uses a shuttlecock?", options: ["Tennis", "Badminton", "Squash", "Table Tennis"], correct: 1 },
            { question: "How many players in a basketball team on court?", options: ["4", "5", "6", "7"], correct: 1 },
            { question: "What is the highest score in gymnastics?", options: ["9", "10", "11", "12"], correct: 1 },
            { question: "What sport is Wimbledon famous for?", options: ["Soccer", "Cricket", "Tennis", "Golf"], correct: 2 },
            { question: "How many rings on the Olympic flag?", options: ["3", "4", "5", "6"], correct: 2 }
        ],
        medium: [
            { question: "Who has won the most FIFA World Cups?", options: ["Germany", "Argentina", "Brazil", "Italy"], correct: 2 },
            { question: "What is the distance of a marathon?", options: ["26.2 miles", "30 miles", "20 miles", "25 miles"], correct: 0 },
            { question: "In which sport would you perform a 'slam dunk'?", options: ["Volleyball", "Basketball", "Tennis", "Badminton"], correct: 1 },
            { question: "What is the national sport of Japan?", options: ["Judo", "Karate", "Sumo Wrestling", "Kendo"], correct: 2 },
            { question: "How many Grand Slam tournaments are there in tennis?", options: ["2", "3", "4", "5"], correct: 2 },
            { question: "What does NBA stand for?", options: ["National Basketball Association", "North Basketball Alliance", "National Ball Association", "North Ball Alliance"], correct: 0 },
            { question: "In cricket, what is a 'century'?", options: ["100 runs", "100 wickets", "100 balls", "100 overs"], correct: 0 },
            { question: "How long is an Olympic swimming pool?", options: ["25 meters", "50 meters", "75 meters", "100 meters"], correct: 1 },
            { question: "What is the term for scoring three goals in soccer?", options: ["Triple", "Trio", "Hat-trick", "Three-score"], correct: 2 },
            { question: "Which country hosted the 2016 Olympics?", options: ["China", "UK", "Brazil", "Russia"], correct: 2 }
        ],
        hard: [
            { question: "Who holds the record for most Olympic gold medals?", options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Mark Spitz"], correct: 1 },
            { question: "What is the only sport to be played on the moon?", options: ["Baseball", "Golf", "Soccer", "Frisbee"], correct: 1 },
            { question: "In which year was the first modern Olympic Games held?", options: ["1892", "1896", "1900", "1904"], correct: 1 },
            { question: "What is the diameter of a basketball hoop?", options: ["16 inches", "18 inches", "20 inches", "22 inches"], correct: 1 },
            { question: "Who is the only athlete to play in both Super Bowl and World Series?", options: ["Bo Jackson", "Deion Sanders", "Brian Jordan", "Danny Ainge"], correct: 1 },
            { question: "What is the oldest tennis tournament in the world?", options: ["US Open", "French Open", "Wimbledon", "Australian Open"], correct: 2 },
            { question: "How many dimples does an average golf ball have?", options: ["256", "300", "336", "400"], correct: 2 },
            { question: "What is the regulation height of a basketball hoop?", options: ["9 feet", "10 feet", "11 feet", "12 feet"], correct: 1 },
            { question: "In which sport is the Davis Cup contested?", options: ["Golf", "Soccer", "Tennis", "Cricket"], correct: 2 },
            { question: "What is the fastest serve recorded in tennis?", options: ["153 mph", "163 mph", "173 mph", "183 mph"], correct: 1 }
        ]
    },
    entertainment: {
        easy: [
            { question: "Who played Iron Man in the Marvel movies?", options: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"], correct: 1 },
            { question: "What is the name of Harry Potter's owl?", options: ["Hedwig", "Errol", "Pigwidgeon", "Scabbers"], correct: 0 },
            { question: "Which movie features the song 'Let It Go'?", options: ["Moana", "Frozen", "Tangled", "Brave"], correct: 1 },
            { question: "Who is known as the King of Pop?", options: ["Elvis Presley", "Michael Jackson", "Prince", "Madonna"], correct: 1 },
            { question: "What is Superman's weakness?", options: ["Water", "Fire", "Kryptonite", "Gold"], correct: 2 },
            { question: "In which movie do we see a 'DeLorean' car?", options: ["Back to the Future", "Star Wars", "Blade Runner", "The Matrix"], correct: 0 },
            { question: "Who directed Jurassic Park?", options: ["James Cameron", "Steven Spielberg", "George Lucas", "Peter Jackson"], correct: 1 },
            { question: "What is the name of the toy cowboy in Toy Story?", options: ["Buzz", "Woody", "Rex", "Hamm"], correct: 1 },
            { question: "Which streaming service has 'Stranger Things'?", options: ["Hulu", "Disney+", "Netflix", "Amazon Prime"], correct: 2 },
            { question: "Who sang 'Thriller'?", options: ["Prince", "Michael Jackson", "Madonna", "Whitney Houston"], correct: 1 }
        ],
        medium: [
            { question: "What year was the first Star Wars movie released?", options: ["1975", "1977", "1979", "1981"], correct: 1 },
            { question: "Who played Jack in Titanic?", options: ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Johnny Depp"], correct: 2 },
            { question: "What is the highest-grossing film of all time?", options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars"], correct: 1 },
            { question: "Who composed the music for Star Wars?", options: ["Hans Zimmer", "John Williams", "Howard Shore", "Danny Elfman"], correct: 1 },
            { question: "What is the name of the coffee shop in Friends?", options: ["Central Perk", "Java Joe's", "Coffee Corner", "The Daily Grind"], correct: 0 },
            { question: "Which band sang 'Bohemian Rhapsody'?", options: ["The Beatles", "Queen", "Led Zeppelin", "Pink Floyd"], correct: 1 },
            { question: "Who won the Oscar for Best Actor in 2020?", options: ["Brad Pitt", "Joaquin Phoenix", "Leonardo DiCaprio", "Adam Driver"], correct: 1 },
            { question: "What is the name of Jon Snow's direwolf?", options: ["Summer", "Grey Wind", "Ghost", "Nymeria"], correct: 2 },
            { question: "Who directed The Godfather?", options: ["Martin Scorsese", "Francis Ford Coppola", "Steven Spielberg", "Quentin Tarantino"], correct: 1 },
            { question: "Which Disney princess has a chameleon as a sidekick?", options: ["Ariel", "Rapunzel", "Jasmine", "Moana"], correct: 1 }
        ],
        hard: [
            { question: "What was the first Pixar movie?", options: ["Finding Nemo", "Toy Story", "A Bug's Life", "Monsters Inc."], correct: 1 },
            { question: "Who is the only person to win an Oscar for acting, writing, and directing?", options: ["Clint Eastwood", "Woody Allen", "Warren Beatty", "Orson Welles"], correct: 2 },
            { question: "What is the longest-running Broadway show?", options: ["The Lion King", "The Phantom of the Opera", "Chicago", "Les Misérables"], correct: 1 },
            { question: "Which movie won the first Best Picture Oscar?", options: ["Wings", "Sunrise", "The Jazz Singer", "Seventh Heaven"], correct: 0 },
            { question: "Who was the youngest person to win an Oscar?", options: ["Tatum O'Neal", "Anna Paquin", "Shirley Temple", "Quvenzhané Wallis"], correct: 0 },
            { question: "What was Alfred Hitchcock's first color film?", options: ["Psycho", "Rope", "Vertigo", "The Birds"], correct: 1 },
            { question: "Which film holds the record for most Oscar wins?", options: ["Titanic", "Ben-Hur", "Lord of the Rings: Return of the King", "All tied at 11"], correct: 3 },
            { question: "Who composed the score for Inception?", options: ["John Williams", "Hans Zimmer", "Howard Shore", "Alexandre Desplat"], correct: 1 },
            { question: "What was the first feature-length animated movie?", options: ["Pinocchio", "Fantasia", "Snow White", "Sleeping Beauty"], correct: 2 },
            { question: "Which actor has been in the most movies?", options: ["Samuel L. Jackson", "Christopher Lee", "Eric Roberts", "Danny Trejo"], correct: 2 }
        ]
    }
};

// Game State
let currentCategory = '';
let currentDifficulty = 'easy';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let selectedAnswer = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadLeaderboard();
    setupDifficultyButtons();
});

// Setup difficulty buttons
function setupDifficultyButtons() {
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDifficulty = btn.dataset.difficulty;
        });
    });
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const themeBtn = document.querySelector('.theme-toggle');
    themeBtn.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
}

// Start quiz
function startQuiz(category) {
    currentCategory = category;
    currentQuestions = shuffleArray([...quizData[category][currentDifficulty]]);
    currentQuestionIndex = 0;
    score = 0;
    
    showScreen('quizScreen');
    updateScore();
    showQuestion();
}

// Show question
function showQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
        return;
    }

    const question = currentQuestions[currentQuestionIndex];
    selectedAnswer = null;
    
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    document.getElementById('questionText').textContent = question.question;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Create options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Reset next button
    document.getElementById('nextBtn').disabled = true;
    
    // Start timer
    startTimer();
}

// Select answer
function selectAnswer(index) {
    if (selectedAnswer !== null) return; // Already answered
    
    selectedAnswer = index;
    const question = currentQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Stop timer
    clearInterval(timer);
    
    // Disable all options
    options.forEach(opt => opt.classList.add('disabled'));
    
    // Show correct/incorrect
    options[index].classList.add(index === question.correct ? 'correct' : 'incorrect');
    
    if (index === question.correct) {
        score++;
        updateScore();
    } else {
        // Also highlight correct answer
        options[question.correct].classList.add('correct');
    }
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

// Start timer
function startTimer() {
    // Set time based on difficulty
    timeLeft = currentDifficulty === 'easy' ? 30 : currentDifficulty === 'medium' ? 20 : 15;
    
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 5) {
            document.querySelector('.timer').classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Auto select wrong answer (timeout)
            const question = currentQuestions[currentQuestionIndex];
            const wrongIndex = question.correct === 0 ? 1 : 0;
            selectAnswer(wrongIndex);
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    document.getElementById('timerDisplay').textContent = timeLeft;
    
    if (timeLeft <= 5) {
        document.querySelector('.timer').classList.add('warning');
    } else {
        document.querySelector('.timer').classList.remove('warning');
    }
}

// Update score
function updateScore() {
    document.getElementById('scoreDisplay').textContent = score;
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

// Show results
function showResults() {
    const totalQuestions = currentQuestions.length;
    const correctAnswers = score;
    const wrongAnswers = totalQuestions - score;
    const accuracy = Math.round((score / totalQuestions) * 100);
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('wrongAnswers').textContent = wrongAnswers;
    document.getElementById('accuracy').textContent = accuracy + '%';
    document.getElementById('categoryDisplay').textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    document.getElementById('difficultyDisplay').textContent = currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1);
    
    // Set icon and message based on performance
    let icon = '🎉';
    let message = 'Great job!';
    
    if (accuracy >= 90) {
        icon = '🏆';
        message = 'Outstanding! You\'re a quiz master!';
    } else if (accuracy >= 70) {
        icon = '🎉';
        message = 'Great job! Keep it up!';
    } else if (accuracy >= 50) {
        icon = '👍';
        message = 'Good effort! Practice makes perfect!';
    } else {
        icon = '📚';
        message = 'Keep learning! You\'ll do better next time!';
    }
    
    document.getElementById('resultsIcon').textContent = icon;
    document.getElementById('resultsMessage').textContent = message;
    
    // Save to leaderboard
    saveToLeaderboard(score, totalQuestions, currentCategory, currentDifficulty);
    
    // Show full leaderboard
    displayLeaderboard('leaderboardFull', true);
    
    showScreen('resultsScreen');
}

// Save to leaderboard
function saveToLeaderboard(score, total, category, difficulty) {
    let leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
    
    const entry = {
        score: score,
        total: total,
        category: category,
        difficulty: difficulty,
        percentage: Math.round((score / total) * 100),
        date: new Date().toISOString()
    };
    
    leaderboard.push(entry);
    
    // Sort by percentage, then by score
    leaderboard.sort((a, b) => {
        if (b.percentage === a.percentage) {
            return b.score - a.score;
        }
        return b.percentage - a.percentage;
    });
    
    // Keep only top 10
    leaderboard = leaderboard.slice(0, 10);
    
    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
}

// Load and display leaderboard
function loadLeaderboard() {
    displayLeaderboard('leaderboardPreview', false);
}

function displayLeaderboard(elementId, showFull) {
    const container = document.getElementById(elementId);
    let leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
    
    if (leaderboard.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    const limit = showFull ? leaderboard.length : Math.min(5, leaderboard.length);
    leaderboard = leaderboard.slice(0, limit);
    
    let html = '<h3>🏆 Leaderboard</h3>';
    
    leaderboard.forEach((entry, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        const rankEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
        
        html += `
            <div class="leaderboard-item">
                <div class="rank ${rankClass}">${rankEmoji}</div>
                <div class="player-info">
                    <div class="player-name">${entry.category.charAt(0).toUpperCase() + entry.category.slice(1)}</div>
                    <div class="player-category">${entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1)} • ${new Date(entry.date).toLocaleDateString()}</div>
                </div>
                <div class="player-score">${entry.score}/${entry.total} (${entry.percentage}%)</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Restart quiz
function restartQuiz() {
    startQuiz(currentCategory);
}

// Go home
function goHome() {
    showScreen('startScreen');
    loadLeaderboard();
}

// Share score
function shareScore() {
    const score = document.getElementById('finalScore').textContent;
    const total = document.getElementById('totalQuestions').textContent;
    const accuracy = document.getElementById('accuracy').textContent;
    const category = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    
    const text = `🎯 I scored ${score}/${total} (${accuracy}) on ${category} quiz! Can you beat my score? #QuizMaster`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Quiz Master Score',
            text: text
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            alert('Score copied to clipboard! Share it on social media!');
        });
    }
}

// Show screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}