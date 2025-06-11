<<<<<<< HEAD
<h1 align="center">Mad Lib!</h1>

A fun, interactive MadLib game where users fill in prompts to create silly stories.

## Features
- Randomized story templates loaded from JSON
- Dynamic input fields with progress tracking
- Responsive UI with hover effects and smooth transitions
- Generates and displays a unique story based on user inputs

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Data**: JSON file (`story-templates.json`) for story templates
- **Deployment**: Static web app, no backend required

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/madlib-web-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd madlib-web-app
   ```
3. Open `index.html` in a browser or serve it with a local server (e.g., `npx serve`).

## Usage
1. Click "Start Game" to begin.
2. Fill in each prompt and click "Next" or press Enter.
3. After completing all prompts, view your generated story.

## File Structure
- `index.html`: Main HTML file
- `style.css`: Styles for the app
- `script.js`: Game logic and DOM manipulation
- `story-templates.json`: Story templates with prompts and placeholders

## Example `story-templates.json`
```json
[
  {
    "story": "Once upon a time, a {1} went to {2}.",
    "inputPrompts": [
      { "id": 1, "prompt": "Enter a character" },
      { "id": 2, "prompt": "Enter a place" }
    ]
  }
]
```

## Contributing
1. Fork the repo.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
MIT License

=======
# mad-lib
>>>>>>> 65b956d (Initial commit)
