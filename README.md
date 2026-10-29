# NEXORA-Ecommerce-Website
NEXORA is a responsive e-commerce web application built with React. It provides a shopping interface for browsing products and a simple admin area for managing product information.
Features
**Customer Features**
- Browse products on the home and products pages.
- View product details, including image, description, price, rating, availability, and status.
- Add products to the cart.
- Add products to the wishlist.
- Proceed to the checkout page.
- Navigate between pages using React Router.
- Responsive interface for different screen sizes.
**Admin Features**
- View the admin dashboard and product statistics.
- Add new products.
- Edit existing product information.
- Manage product details such as name, description, category, price, old price, quantity, image URL, rating, and status.
- Set a product as Active or Inactive.
- Validate required form fields before saving.
- Store product data using JSON Server.
**Technologies Used**
- React – UI components and application interface
- Vite – Development server and build tooling
- JavaScript – Application logic
- React Router – Client-side routing
- HTML5 and CSS3 – Page structure and styling
- JSON Server – Mock REST API for product data
- localStorage – Used for selected client-side data where implemented
Application Pages
**The project includes the following routes:**
Route	Purpose
/	Home page
/products	Product listing
/product/:id	Product details
/cart	Shopping cart
/checkout	Checkout page
/wishlist	Wishlist
/login	Login page
/admin	Admin dashboard
/add-product	Add or edit a product


**Run these commands from the project directory:**
- npm run dev — starts the Vite development server.
- npm run build — creates a production build.
- npm run preview — previews the production build locally.
**Notes**
- JSON Server is a mock REST API for development; it is not a production database.
- Run JSON Server and the Vite development server in separate terminals.
- Do not commit private credentials, API keys, or environment secrets to GitHub.
- Update the clone URL and project structure in this README after creating the GitHub repository.
  
**Future Improvements**
- Add a production backend and database.
- Add robust authentication and authorization.
- Improve checkout and order management.
- Add automated tests and deployment.
