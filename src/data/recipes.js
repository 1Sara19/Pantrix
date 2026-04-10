const recipes = [
  {
    id: 1,
    title: "Creamy Garlic Chicken Pasta",
    cookTime: 25,
    servings: "2 servings",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    dietary: ["Dairy-Free"],
    tags: ["Comfort Food", "Quick"],
    ingredients: ["chicken", "garlic", "pasta", "cream"],
    instructions: [
      "Boil the pasta",
      "Cook chicken with garlic",
      "Add cream",
      "Mix and serve"
    ]
  },
  {
    id: 2,
    title: "Mediterranean Tomato Salad",
    cookTime: 10,
    servings: "2 servings",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    dietary: ["Vegetarian", "Gluten-Free"],
    tags: ["Healthy", "Light"],
    ingredients: ["tomato", "cucumber", "olive oil", "feta"],
    instructions: [
      "Chop vegetables",
      "Add olive oil",
      "Mix everything",
      "Serve fresh"
    ]
  },
  {
    id: 3,
    title: "Classic Margherita Pizza",
    cookTime: 45,
    servings: "4 servings",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    dietary: ["Vegetarian"],
    tags: ["Comfort Food"],
    ingredients: ["dough", "tomato", "mozzarella", "basil"],
    instructions: [
      "Prepare dough",
      "Add toppings",
      "Bake pizza",
      "Serve hot"
    ]
  },
  {
    id: 4,
    title: "Herb-Roasted Chicken Thighs",
    cookTime: 40,
    servings: "4 servings",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    dietary: [],
    tags: ["High Protein"],
    ingredients: ["chicken", "rosemary", "thyme", "garlic"],
    instructions: [
      "Season chicken",
      "Add herbs",
      "Roast in oven",
      "Serve hot"
    ]
  },
  {
    id: 5,
    title: "Garlic Butter Shrimp Scampi",
    cookTime: 20,
    servings: "2 servings",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    dietary: [],
    tags: ["Quick"],
    ingredients: ["shrimp", "garlic", "butter", "lemon"],
    instructions: [
      "Cook garlic in butter",
      "Add shrimp",
      "Add lemon",
      "Serve"
    ]
  },
  {
    id: 6,
    title: "Homemade Tomato Soup",
    cookTime: 35,
    difficulty: "Easy",
    servings: "3 servings",
    dietary: ["Vegan", "Gluten-Free"],
    tags: ["Healthy", "Warm"],
    ingredients: ["tomato", "onion", "garlic", "olive oil"],
    instructions: [
      "Cook onion and garlic",
      "Add tomatoes",
      "Blend soup",
      "Serve warm"
    ],
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
  },{
    id: 7,
    title: "Vegetable Soup",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
    cookTime: 30,
    servings: "4 servings",
    difficulty: "Easy",
    tags: ["Warm", "Healthy"],
    dietary: ["Vegan"],
    ingredients: [
      "carrot",
      "potato",
      "onion",
      "celery",
      "vegetable broth"
    ],
    instructions: [
      "Chop all vegetables.",
      "Bring broth to a boil.",
      "Add vegetables and simmer until soft.",
      "Serve hot."
    ]
  },{
    id: 8,
    title: "Chicken Salad",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80",
    cookTime: 15,
    servings: "2 servings",
    difficulty: "Medium",
    tags: ["Healthy", "Light"],
    dietary: ["Gluten-Free"],
    ingredients: [
      "chicken",
      "lettuce",
      "tomato",
      "cucumber",
      "salad dressing"
    ],
    instructions: [
      "Cook and slice the chicken.",
      "Wash and chop the vegetables.",
      "Combine everything in a bowl.",
      "Add dressing and toss before serving."
    ]
  }

];

export default recipes;
