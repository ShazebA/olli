<p align="center">
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="center" width="30%">
</p>
<p align="center"><h1 align="center">OLLI</h1></p>

<p align="center">
	<img src="https://img.shields.io/github/license/ShazebA/olli?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/ShazebA/olli?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/ShazebA/olli?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/ShazebA/olli?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

A React app for Ongoing Living and Learning Inc., made for SE3350 at The University of Western Ontario. 

---

##  Features

[ User Manual](https://drive.google.com/file/d/1stBbW0Ht04-8vgmPy-bm_gF0MAsTERta/view?usp=sharing)

---

##  Project Structure

```sh
└── olli/
    ├── app.yaml
    ├── olli
    │   ├── .gitignore
    │   ├── README.md
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   └── src
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── contact.routes.js
    │   └── index.js
    └── server
        ├── .env
        ├── config
        ├── routes
        ├── schemas
        └── server.js
```


###  Project Index
<details open>
	<summary><b><code>OLLI/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/ShazebA/olli/blob/master/package-lock.json'>package-lock.json</a></b></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/ShazebA/olli/blob/master/package.json'>package.json</a></b></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/ShazebA/olli/blob/master/app.yaml'>app.yaml</a></b></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- routes Submodule -->
		<summary><b>routes</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/ShazebA/olli/blob/master/routes/contact.routes.js'>contact.routes.js</a></b></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/ShazebA/olli/blob/master/routes/index.js'>index.js</a></b></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- server Submodule -->
		<summary><b>server</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/.env'>.env</a></b></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/server.js'>server.js</a></b></td>
			</tr>
			</table>
			<details>
				<summary><b>schemas</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/schemas/Message.js'>Message.js</a></b></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/schemas/Event.js'>Event.js</a></b></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/schemas/Clock.js'>Clock.js</a></b></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/schemas/UserNewsletter.js'>UserNewsletter.js</a></b></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/schemas/Feedback.js'>Feedback.js</a></b></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/schemas/Waiver.js'>Waiver.js</a></b></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/schemas/User.js'>User.js</a></b></td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>config</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/config/index.js'>index.js</a></b></td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>routes</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/routes/contact.routes.js'>contact.routes.js</a></b></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/routes/index.js'>index.js</a></b></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/routes/feedBackroutes.js'>feedBackroutes.js</a></b></td>
					</tr>
					</table>
					<details>
						<summary><b>middlewares</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/routes/middlewares/validate.js'>validate.js</a></b></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>controllers</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/server/routes/controllers/contact.controllers.js'>contact.controllers.js</a></b></td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- olli Submodule -->
		<summary><b>olli</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/package.json'>package.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/AccessibilityFooter.js'>AccessibilityFooter.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/TextSizeChanger.js'>TextSizeChanger.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/style.css'>style.css</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/FeedbackForm.js'>FeedbackForm.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/index.css'>index.css</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/App.css'>App.css</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/EventsPage.js'>EventsPage.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/TextSizeChanger.css'>TextSizeChanger.css</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/Gallery.js'>Gallery.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/Rating.js'>Rating.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/Login.js'>Login.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/App.test.js'>App.test.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/NewsletterSignup.js'>NewsletterSignup.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/ContactPage.css'>ContactPage.css</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/setupTests.js'>setupTests.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/LogoTitle.js'>LogoTitle.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/App.js'>App.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/reportWebVitals.js'>reportWebVitals.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/ContactPage.js'>ContactPage.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/index.js'>index.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/About.js'>About.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/Feedback.js'>Feedback.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/AccessibilityFooter.css'>AccessibilityFooter.css</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/HomePage.js'>HomePage.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/accessibility.js'>accessibility.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
					<details>
						<summary><b>chat</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/chat/Chat.js'>Chat.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/chat/Chat.css'>Chat.css</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>parent</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/parent/Waivers.js'>Waivers.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/parent/Clock.css'>Clock.css</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/parent/Clock.js'>Clock.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/parent/Waivers.css'>Waivers.css</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/parent/Parent.js'>Parent.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>admin</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/admin/FeedbackDisplay.css'>FeedbackDisplay.css</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/admin/FormBuilder.js'>FormBuilder.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/admin/FeedbackDisplay.js'>FeedbackDisplay.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/admin/DashboardHome.js'>DashboardHome.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/admin/Dashboard.css'>Dashboard.css</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/admin/Register.js'>Register.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/admin/FormBuilder.css'>FormBuilder.css</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/admin/ManageUser.js'>ManageUser.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/admin/Dashboard.js'>Dashboard.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/admin/NewsletterSubscribers.js'>NewsletterSubscribers.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/src/admin/ClockInfo.js'>ClockInfo.js</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>public</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/public/index.html'>index.html</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/public/manifest.json'>manifest.json</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/ShazebA/olli/blob/master/olli/public/robots.txt'>robots.txt</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with olli, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Npm
- **Container Runtime:** Docker


###  Installation

Install olli using one of the following methods:

**Build from source:**

1. Clone the olli repository:
```sh
❯ git clone https://github.com/ShazebA/olli
```

2. Navigate to the project directory:
```sh
❯ cd olli
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```


**Using `docker`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white" />](https://www.docker.com/)

```sh
❯ docker build -t ShazebA/olli .
```




###  Usage
Run olli using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```


**Using `docker`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white" />](https://www.docker.com/)

```sh
❯ docker run -it {image_name}
```


###  Testing
Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```


---
##  Project Roadmap

- [X] **`Task 1`**: <strike>Implement caretaker site.</strike>
- [X] **`Task 2`**: <strike>Implement dependant site.</strike>
- [X] **`Task 3`**: <strike>Implement admin site.</strike>

---

##  Contributing

- **💬 [Join the Discussions](https://github.com/ShazebA/olli/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/ShazebA/olli/issues)**: Submit bugs found or log feature requests for the `olli` project.
- **💡 [Submit Pull Requests](https://github.com/ShazebA/olli/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/ShazebA/olli
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/ShazebA/olli/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=ShazebA/olli">
   </a>
</p>
</details>

---

##  License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit/) License. 

---

##  Acknowledgments

- Elise Drouillad
- Cristian Troubitsin
- Delaney McLachlan

---