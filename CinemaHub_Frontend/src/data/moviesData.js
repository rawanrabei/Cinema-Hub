const moviesData = [
  {
    id: 1,
    title: "Shadow Operative",
    tagline: "Trust no one. Survive the night.",
    genres: ["Action", "Thriller"],
    rating: 4.6,
    duration: "2h 18m",
    language: "English",
    director: "Ava Hartman",
    description:
      "An undercover agent races against time to prevent a global catastrophe. Shadow Operative blends high-octane action with a twisting conspiracy that keeps you guessing.",
    backgroundImg: "/moveis/m1.jpg",
    posterImg: "/moveis/m1.jpg",
    thumbnail: "/moveis/m1.jpg",
  },

  // 2
  {
    id: 2,
    title: "The Haunting",
    tagline: "Whispers echo through the walls.",
    genres: ["Horror", "Mystery"],
    rating: 3.8,
    duration: "1h 55m",
    language: "English",
    director: "James Wan Jr.",
    description:
      "A family moves into a mansion with a dark past only to discover they are not alone. Atmospheric scares and a chilling mystery unfold room by room.",
    backgroundImg: "/moveis/m2.jpg",
    posterImg: "/moveis/m2.jpg",
    thumbnail: "/moveis/m2.jpg",
  },

  // 3
  {
    id: 3,
    title: "Laugh Out Loud",
    tagline: "Life gets better with friends.",
    genres: ["Drama"],
    rating: 4.2,
    duration: "1h 42m",
    language: "English",
    director: "Daniel Cooper",
    description:
      "Three childhood friends reunite for a road trip that spirals into hilarious chaos and heartfelt confessions.",
    backgroundImg: "/moveis/m3.jpg",
    posterImg: "/moveis/m3.jpg",
    thumbnail: "/moveis/m3.jpg",
  },

  // 4
  {
    id: 4,
    title: "CROWN",
    tagline: "Some promises last forever.",
    genres: ["Romance", "Drama"],
    rating: 4.7,
    duration: "2h 5m",
    language: "Spanish",
    director: "Lucia Romero",
    description:
      "A photographer and a marine biologist fall in love on an island but must fight the tides of time and distance to stay together.",
    backgroundImg: "/moveis/m4.jpg",
    posterImg: "/moveis/m4.jpg",
    thumbnail: "/moveis/m4.jpg",
  },

  // 5
  {
    id: 5,
    title: "BEAKY BLINDERS",
    tagline: "The future is hacked.",
    genres: ["Sci‑Fi", "Action"],
    rating: 4.1,
    duration: "2h 10m",
    language: "English",
    director: "Kira Nguyen",
    description:
      "In a world run by AI, a hacker discovers a secret that could change humanity's future forever.",
    backgroundImg: "/moveis/m5.jpg",
    posterImg: "/moveis/m5.jpg",
    thumbnail: "/moveis/m5.jpg",
  },

  // 6
  {
    id: 6,
    title: "Frozen Secrets",
    tagline: "What lies beneath the ice?",
    genres: ["Thriller", "Mystery"],
    rating: 3.9,
    duration: "1h 48m",
    language: "English",
    director: "Sofia Kim",
    description:
      "An expedition in the Arctic uncovers a hidden truth that changes everything they know about the past.",
    backgroundImg: "/moveis/m6.jpg",
    posterImg: "/moveis/m6.jpg",
    thumbnail: "/moveis/m6.jpg",
  },

  // 7
  {
    id: 7,
    title: "Neon Nights",
    tagline: "City lights hide dark secrets.",
    genres: ["Drama", "Thriller"],
    rating: 4.3,
    duration: "2h 2m",
    language: "English",
    director: "Maya Lin",
    description:
      "A detective navigates the dangerous nightlife of a neon-lit city to solve a murder mystery.",
    backgroundImg: "/moveis/m7.jpg",
    posterImg: "/moveis/m7.jpg",
    thumbnail: "/moveis/m7.jpg",
  },

  // 8
  {
    id: 8,
    title: "Galactic Wars",
    tagline: "Beyond the stars, a war awaits.",
    genres: ["Sci‑Fi", "Action"],
    rating: 4.5,
    duration: "2h 20m",
    language: "English",
    director: "Orion Pax",
    description:
      "Interstellar conflict erupts as rival factions fight for control of a powerful alien technology.",
    backgroundImg: "/moveis/m8.jpg",
    posterImg: "/moveis/m8.jpg",
    thumbnail: "/moveis/m8.jpg",
  },

  // 9
  {
    id: 9,
    title: "Hidden Agenda",
    tagline: "Nothing is as it seems.",
    genres: ["Thriller", "Mystery"],
    rating: 4.0,
    duration: "1h 50m",
    language: "English",
    director: "Harvey Gold",
    description:
      "A journalist uncovers a secret conspiracy that could topple the government.",
    backgroundImg: "/moveis/m9.jpg",
    posterImg: "/moveis/m9.jpg",
    thumbnail: "/moveis/m9.jpg",
  },

  // 10
  {
    id: 10,
    title: "Desert Storm",
    tagline: "Survive the heat, fight the enemy.",
    genres: ["Action", "Drama"],
    rating: 4.2,
    duration: "2h 5m",
    language: "English",
    director: "Omar Al-Fayed",
    description:
      "A group of soldiers navigate political intrigue and dangerous terrain in a desert war zone.",
    backgroundImg: "/moveis/m10.jpg",
    posterImg: "/moveis/m10.jpg",
    thumbnail: "/moveis/m10.jpg",
  },

  // 11
  {
    id: 11,
    title: "City of Shadows",
    tagline: "Every alley hides a secret.",
    genres: ["Mystery", "Thriller"],
    rating: 4.3,
    duration: "2h 0m",
    language: "English",
    director: "Ethan Black",
    description:
      "A detective navigates the underworld of a sprawling city to solve a series of murders.",
    backgroundImg: "/moveis/m30.jpg",
    posterImg: "/moveis/m30.jpg",
    thumbnail: "/moveis/m30.jpg",
  },

  // 12
  {
    id: 12,
    title: "Romance in Paris",
    tagline: "Love blooms in the city of lights.",
    genres: ["Romance", "Drama"],
    rating: 4.6,
    duration: "1h 55m",
    language: "French",
    director: "Claire Dupont",
    description:
      "Two strangers meet in Paris and discover love in unexpected places.",
    backgroundImg: "/moveis/m12.jpg",
    posterImg: "/moveis/m12.jpg",
    thumbnail: "/moveis/m12.jpg",
  },

  // 13
  {
    id: 13,
    title: "Quantum Legacy",
    tagline: "Time is the greatest weapon.",
    genres: ["Sci‑Fi", "Thriller"],
    rating: 4.4,
    duration: "2h 12m",
    language: "English",
    director: "Viktor Rossi",
    description:
      "A physicist discovers a way to travel through time — but soon realizes that every action has unpredictable consequences.",
    backgroundImg: "/moveis/m13.jpg",
    posterImg: "/moveis/m13.jpg",
    thumbnail: "/moveis/m13.jpg",
  },

  // 14
  {
    id: 14,
    title: "Midnight Escape",
    tagline: "One night. One chance. Run.",
    genres: ["Action", "Thriller"],
    rating: 4.0,
    duration: "1h 58m",
    language: "English",
    director: "Dana Pierce",
    description:
      "After witnessing a crime, a woman races through the city at night to escape danger — but the night has its own plans.",
    backgroundImg: "/moveis/m14.jpg",
    posterImg: "/moveis/m14.jpg",
    thumbnail: "/moveis/m14.jpg",
  },

  // 15
  {
    id: 15,
    title: "Silent Echo",
    tagline: "When silence speaks, fear listens.",
    genres: ["Horror", "Mystery"],
    rating: 3.7,
    duration: "1h 47m",
    language: "English",
    director: "Marceline Grey",
    description:
      "A writer retreats to a secluded cabin to finish her book — but soon discovers she is being haunted by voices from the past.",
    backgroundImg: "/moveis/m15.jpg",
    posterImg: "/moveis/m15.jpg",
    thumbnail: "/moveis/m15.jpg",
  },

  // 16
  {
    id: 16,
    title: "The Last Melody",
    tagline: "Music never dies.",
    genres: ["Drama"],
    rating: 4.8,
    duration: "2h 3m",
    language: "English",
    director: "Isabel Marino",
    description:
      "A once famous musician returns to the stage to reclaim her legacy — but ghosts of her past threaten to silence her forever.",
    backgroundImg: "/moveis/m16.jpg",
    posterImg: "/moveis/m16.jpg",
    thumbnail: "/moveis/m16.jpg",
  },

  // 17
  {
    id: 17,
    title: "Ocean’s Call",
    tagline: "The sea holds many secrets.",
    genres: ["Adventure", "Drama"],
    rating: 4.4,
    duration: "2h 7m",
    language: "English",
    director: "Marina Costa",
    description:
      "After a shipwreck, survivors must overcome nature and their own demons to find rescue across a vast ocean.",
    backgroundImg: "/moveis/m17.jpg",
    posterImg: "/moveis/m17.jpg",
    thumbnail: "/moveis/m17.jpg",
  },

  // 18
  {
    id: 18,
    title: "Broken Chains",
    tagline: "Freedom comes at a cost.",
    genres: ["Drama", "Action"],
    rating: 4.1,
    duration: "2h 15m",
    language: "English",
    director: "Victor Storm",
    description:
      "An ex-con tries to rebuild his life while being drawn back into the underworld that destroyed him.",
    backgroundImg: "/moveis/m18.jpg",
    posterImg: "/moveis/m18.jpg",
    thumbnail: "/moveis/m18.jpg",
  },

  // 19
  {
    id: 19,
    title: "THE IDEA OF YOU",
    tagline: "A love story written in stone.",
    genres: ["Romance", "Drama"],
    rating: 4.5,
    duration: "1h 50m",
    language: "Italian",
    director: "Giulia Romano",
    description:
      "Two souls from different worlds meet in Verona and find love — but fate may have other plans.",
    backgroundImg: "/moveis/m19.jpg",
    posterImg: "/moveis/m19.jpg",
    thumbnail: "/moveis/m19.jpg",
  },

  // 20
  {
    id: 20,
    title: "Urban Legends",
    tagline: "Some stories never die.",
    genres: ["Horror", "Mystery"],
    rating: 3.9,
    duration: "2h 0m",
    language: "English",
    director: "Zoe Carter",
    description:
      "A group of friends decide to investigate urban legends — only to realize some legends should stay forgotten.",
    backgroundImg: "/moveis/m20.jpg",
    posterImg: "/moveis/m20.jpg",
    thumbnail: "/moveis/m20.jpg",
  },

  // 21
  {
    id: 21,
    title: "Chasing Tomorrow",
    tagline: "Dreams don’t wait.",
    genres: ["Drama"],
    rating: 4.4,
    duration: "2h 4m",
    language: "English",
    director: "Robert Fields",
    description:
      "A young athlete fights against all odds to make it to the championships and prove the world wrong.",
    backgroundImg: "/moveis/m21.jpg",
    posterImg: "/moveis/m21.jpg",
    thumbnail: "/moveis/m21.jpg",
  },

  // 22
  {
    id: 22,
    title: "Echoes of War",
    tagline: "History never forgets.",
    genres: ["Drama"],
    rating: 4.2,
    duration: "2h 18m",
    language: "English",
    director: "James Harden",
    description:
      "Soldiers from different backgrounds unite to survive the horrors of war and fight for a cause bigger than themselves.",
    backgroundImg: "/moveis/m27.jpg",
    posterImg: "/moveis/m27.jpg",
    thumbnail: "/moveis/m27.jpg",
  },

  // 23
  {
    id: 23,
    title: "ALADDIN",
    tagline: "Adventure begins where fear ends.",
    genres: ["Adventure"],
    rating: 4.7,
    duration: "2h 25m",
    language: "English",
    director: "Elena Novak",
    description:
      "A band of explorers ventures beyond known lands in search of a mythical realm that could change mankind forever.",
    backgroundImg: "/moveis/m23.jpg",
    posterImg: "/moveis/m23.jpg",
    thumbnail: "/moveis/m23.jpg",
  },

  // 24
  {
    id: 24,
    title: "Final Horizon",
    tagline: "End of one journey. Start of another.",
    genres: ["Drama", "Sci‑Fi"],
    rating: 4.5,
    duration: "2h 30m",
    language: "English",
    director: "Nora Blake",
    description:
      "After humanity colonizes Mars, a lone astronaut discovers secrets that could determine the fate of both planets.",
    backgroundImg: "/moveis/m29.jpg",
    posterImg: "/moveis/m29.jpg",
    thumbnail: "/moveis/m29.jpg",
  },
];

export default moviesData;
