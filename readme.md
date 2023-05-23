# Memo Test Game

This is a project for a memory test game. It includes an API built with Laravel, and a front-end built with Next.js.

The game allows users to play a game where they have to remember and match pairs of images.

## Getting Started

To get the project up and running, follow these steps:

1. Clone the repository to your local machine.
2. Make sure Docker is installed and running.
3. From the project's root directory, run `docker-compose up -d --build`. This will build the Docker containers and start the application.
4. After the server is running, run the database migrations to have some data:
   ```sh
   docker-compose exec backend bash -c "php artisan db:seed --class=DatabaseSeeder --force"
   ```

Your Memo Test Game server should now be up and running on `http://localhost:3000`

To run backend tests: `docker-compose up backend_tests`

## Future Improvements and Enhancements

Here are some potential improvements and enhancements that can be made:

1. User Authentication: Add an authentication form for users to sign in. Right now it has an user_id hardcoded on the sessions.

2. CRUD for Memo Test: Create a form for creating, reading, updating, and deleting new memo tests (including name and images).

3. Caching: Implement caching for the highestScore calculation on the backend. The cache should be recalculated when a session is finished.

4. Testing: Increase test coverage for the frontend.

5. Refactoring: In the GameSession component, refactor duplicate actions. There are some places where new actions are dispatched to the store and also mutations are triggered to update the server. The goal should be to make the server as the single source of truth or create Redux middlewares to sync both steps.

6. Mobile Styles: Improve the styles for mobile devices, particularly for the grid.

7. Score Calculation: Make the score calculation more granular to provide more precise feedback to users.

8. Storybook: Add a Storybook for interactive UI component development and testing.

9. Customization: Give users the ability to choose the amount of cards to play. Add real images and calculate grid size and number of columns based on the amount of images.

These are just a few ideas for ways to make the application better. Any feedback is welcome!
