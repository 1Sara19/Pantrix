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

##  Usage Instructions & Examples

### As a Guest

* Browse recipes
* Search using ingredients
* View recipe details
* Cannot save favorites or create meal plans

Example 1:  
Guest enters: "tomato, pasta"  
System shows matching recipes with scores  
Guest views recipe details

Example 2:  
Guest clicks "Save to Favorites"  
System shows "Login Required"

---

### As a User

* Sign up / log in
* Search recipes using available ingredients
* Apply filters (time, type, dietary)
* Save favorite recipes
* Set dietary preferences and allergies
* Create weekly meal plan
* Share recipes

Example 1:  
User enters: "chicken, rice"  
System returns recipes with match scores  
User saves a recipe to Favorites

Example 2:  
User selects filter: "Vegetarian" + "30 minutes"  
System displays only matching recipes

Example 3:  
User opens Meal Plan  
Adds a recipe to Monday dinner  
Clicks "Save Weekly Plan"

---
### As an Admin

* Access Admin Dashboard
* Manage users
* Manage filters and categories
* Set search results limit
* Moderate comments (hide/delete)
* Review and resolve user reports


Example 1:  
Admin sets search result limit to 10 recipes  
All users now see max 10 results per search

Example 2:  
Admin hides an inappropriate comment  
Comment becomes invisible to users

Example 3:  
Admin reviews a report from Contact Us  
Marks it as "Resolved"

---

##  Team Members & Contributions

* Sarah Alsaadan — Admin Dashboard

    * Admin dashboard
    * Manage users
    * Manage filters
    * Search results limit
    * Manage comments
    * Review reports

* Ghalaa Alshahrani  — Auth & Access Control

    * Login, Sign Up
    * Role selection
    * Guest restriction modals
    * Documentation (README)

* Reema Alqahtani  — Recipes & Search

    * Home page
    * Ingredient-based search
    * Filters
    * Recipe results & cards
    * Share recipe feature

* Shatha Albaraiki — User Features

    * Favorites page
    * Profile page
    * Meal planning page
    * Contact Us page

---

##  Tools & Technologies Used

- React.js — Main front-end framework
- JavaScript — All application logic
- CSS — Custom styling for all pages and components
- Node.js & npm — Required runtime for React
- Git & GitHub — Version control and team collaboration
---

