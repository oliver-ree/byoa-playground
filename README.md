# internal-design-prototypes

## Setup
1. Clone this repository
   - Create a Developer folder in your user directory and clone there:
      - Open Terminal (you can find it in Applications > Utilities)
      - Type: `mkdir -p ~/Developer`
      - Type: `cd ~/Developer`
      - Type: `git clone https://github.com/your-organization/internal-design-prototypes.git`
      - Press Enter

2. Install dependencies:
   - First, make sure you have Node.js installed. Download it from [nodejs.org](https://nodejs.org/)
   - Open Terminal
   - Navigate to the project folder: `cd ~/Developer/internal-design-prototypes`
   - Type the following and press Enter:
   ```
   yarn
   ```

## Running the project
1. Start the development server:
   - In Terminal or Command Prompt, make sure you're in the project folder
   - Type the following and press Enter:
   ```
   yarn start
   ```
   - Wait for the project to compile (this might take a minute)

2. Open your browser and navigate to `http://localhost:3000`
   - The page should automatically open in your default browser
   - If it doesn't, manually type `http://localhost:3000` in your browser's address bar

## Adding a new prototype
1. Create a new branch (think of it as creating a separate workspace):
   ```
   git checkout -b your-branch-name
   ```

2. Create a new folder under `/pages` and name it `your-prototype-name`

3. Save changes as you work, it's a way for you to snapshot progress and have clear checkpoint to go back to:
   ```
   git add .
   git commit -m "Description of your changes"
   ```

4. When ready to share your work, open a Pull Request (PR):
   ```
   git push -u origin your-branch-name
   ```

   Then:
   - Go to the repository on GitHub: https://github.com/eucalyptusvc/internal-design-prototypes
   - You should see a prompt to "Compare & pull request" for your recently pushed branch
   - Click on it and fill out the PR description with details about your prototype
   - Request reviews from team members if needed
   - Click "Create pull request"
