# Pantrix – Smart Cooking Assistant
SWE363 – Web Engineering and Development Project.  
This project focuses on building a fully interactive front-end web application.

---
##  Description

Pantrix is a smart web application that helps users decide what to cook based on the ingredients they already have at home. The system matches available ingredients with suitable recipes and ranks them using a Smart Match Score, highlighting the most relevant and practical options.

Users can filter results based on cooking time, meal categories, and dietary restrictions, while clearly seeing which ingredients are missing for each recipe. The platform aims to reduce food waste, save time, and simplify daily meal planning.

Registered users can save favorite recipes, manage their dietary preferences and allergies, and create meal plans. Guest users can browse and view recipes without requiring an account.

---

##  Features

* Search recipes based on available ingredients
* Filter recipes by:

    * Cooking time (e.g.15 / 30 minutes)
    * Food type (e.g., vegetarian, protein-based)
    * Dietary restrictions (e.g., no dairy, no nuts)
* View recipe details (ingredients, steps, servings)
* Highlight missing ingredients
* Save favorite recipes
* Create weekly meal plans
* Contact Us
* Share recipes via link
* Login & Signup system with role selection
* Guest browsing with restricted actions
* Admin Dashboard:

    * Manage users
    * Manage filters
    * Control search results limit
    * Moderate comments
    * Review user reports

---

##  Demo Accounts
### Admin

* Email: ``` admin@example.com  ```
* Password: ``` Admin#123 ```

### User

* Email: ``` demo@example.com  ```
* Password: ``` User#123 ```

---

##  Currently Supported Ingredients

At the current stage, Pantrix supports a predefined set of ingredients only, since the project is front-end only and does not yet include backend integration or AI-based recipe generation.

The ingredient matching is currently based on the static recipe data available in the system. Therefore, users will get results only when their entered ingredients match the ingredients already defined in the existing recipe dataset.

The currently supported ingredients are:

* chicken
* garlic
* pasta
* cream
* tomato
* cucumber
* olive oil
* feta
* dough
* mozzarella
* basil
* rosemary
* thyme
* shrimp
* butter
* lemon
* onion
* carrot
* potato
* celery
* vegetable broth
* lettuce
* salad dressing

---
##  Project Structure
```
src/
│
├── assets/
│   └── images/
│       └── Pantrix.png
│
├──data/
│   ├── auth.js
│   └── recipes.js
│
├── components/
│   ├── FilterPanel.jsx
│   ├── Navbar.jsx
│   ├── RecipeCard.jsx
│   ├── RecipeList.jsx
│   ├── RestrictedModal.jsx
│   ├── ScrollToTop.jsx
│   └── SearchBar.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Favorites.jsx
│   ├── Profile.jsx
│   ├── MealPlan.jsx
│   ├── ContactUs.jsx
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── AdminDashboard.jsx
│   ├── ManageUsers.jsx
│   ├── ManageFilters.jsx
│   ├── ManageComments.jsx
│   ├── ReviewReports.jsx
│   └── RecipeLimits.jsx
│
├── styles/
│   ├── components/
│   │   ├── FilterPanel.css
│   │   ├── Navbar.css
│   │   ├── RecipeCard.css
│   │   ├── RecipeList.css
│   │   ├── RestrictedModal.css
│   │   ├── SearchBar.css
|   |   └──Footer.css
│   │
│   ├── pages/
│   │   ├── AdminDashboard.css
│   │   ├── ContactUs.css
│   │   ├── favorites.css
│   │   ├── Home.css
│   │   ├── login.css
│   │   ├── ManageComments.css
│   │   ├── ManageFilters.css
│   │   ├── ManageUsers.css
│   │   ├── mealplan.css
│   │   ├── profile.css
│   │   ├── RecipeLimits.css
│   │   ├── ReviewReports.css
│   │   └── signup.css
│   │
│   └── theme.css
│
├── App.jsx
├── main.jsx
│
public/
│   └── favicon.png
│
index.html
package.json
package-lock.json
vite.config.js
README.md
```
---

##  Installation & Running

1. Clone the repository:
   ```
   git clone https://github.com/1Sara19/Pantrix.git
   cd Pantrix
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
---
