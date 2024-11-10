// Define interfaces for structured data
interface EducationEntry {
  institute: string;
  subject: string;
  year: string;
}

interface ExperienceEntry {
  company: string;
  position: string;
  years: string;
  responsibilities: string[];
}

interface ProjectEntry {
  name: string;
  description: string;
}

// Get references to the HTML elements
const generateResumeBtn = document.getElementById("generate-resume") as HTMLButtonElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const objectiveInput = document.getElementById("objective") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const addressInput = document.getElementById("address") as HTMLInputElement;
const dobInput = document.getElementById("dob") as HTMLInputElement;
const cnicInput = document.getElementById("cnic") as HTMLInputElement;
const profileImageInput = document.getElementById("profileImage") as HTMLInputElement;


let profileImageDataURL: string | null = null;



// Listen for image file input change
profileImageInput.addEventListener("change", (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImageDataURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
});

// Function to get all input values within a container
const getInputValues = (containerId: string): string[] => {
  const container = document.getElementById(containerId);
  if (!container) return [];
  const inputs = container.querySelectorAll("input[type='text'], textarea");
  return Array.from(inputs).map(input => (input as HTMLInputElement).value).filter(val => val.trim() !== "");
};

// Function to add new input fields (Skills, Achievements, Languages, etc.)
const addInputField = (containerId: string, placeholder: string) => {
  const container = document.getElementById(containerId);
  if (container) {
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.placeholder = placeholder;
    container.appendChild(newInput);
  }
};

// Event listeners for adding more fields
document.getElementById("add-skill")?.addEventListener("click", () => addInputField("skills", "Skill"));
document.getElementById("add-achievement")?.addEventListener("click", () => addInputField("achievements", "Achievement"));
document.getElementById("add-language")?.addEventListener("click", () => addInputField("languages", "Language"));
document.getElementById("add-education")?.addEventListener("click", () => {
  const educationContainer = document.getElementById("education");
  if (educationContainer) {
    const instituteInput = document.createElement("input");
    instituteInput.type = "text";
    instituteInput.placeholder = "Institute Name";

    const subjectInput = document.createElement("input");
    subjectInput.type = "text";
    subjectInput.placeholder = "Subject";

    const yearInput = document.createElement("input");
    yearInput.type = "text";
    yearInput.placeholder = "Passing Year";

    educationContainer.appendChild(instituteInput);
    educationContainer.appendChild(subjectInput);
    educationContainer.appendChild(yearInput);
  }
});

document.getElementById("add-experience")?.addEventListener("click", () => {
  const experienceContainer = document.getElementById("experience");
  if (experienceContainer) {
    const companyInput = document.createElement("input");
    companyInput.type = "text";
    companyInput.placeholder = "Company Name";

    const positionInput = document.createElement("input");
    positionInput.type = "text";
    positionInput.placeholder = "Position";

    const yearsInput = document.createElement("input");
    yearsInput.type = "text";
    yearsInput.placeholder = "Years of Experience";

    const responsibilitiesTextarea = document.createElement("textarea");
    responsibilitiesTextarea.placeholder = "Responsibilities";

    experienceContainer.appendChild(companyInput);
    experienceContainer.appendChild(positionInput);
    experienceContainer.appendChild(yearsInput);
    experienceContainer.appendChild(responsibilitiesTextarea);
  }
});

document.getElementById("add-project")?.addEventListener("click", () => {
  const projectsContainer = document.getElementById("projects");
  if (projectsContainer) {
    const projectNameInput = document.createElement("input");
    projectNameInput.type = "text";
    projectNameInput.placeholder = "Project Name";

    const projectDescriptionTextarea = document.createElement("textarea");
    projectDescriptionTextarea.placeholder = "Project Description";

    projectsContainer.appendChild(projectNameInput);
    projectsContainer.appendChild(projectDescriptionTextarea);
  }
});

generateResumeBtn.addEventListener("click", generateResume);

function generateResume() {
  // Gather all input data
  const name = nameInput.value.trim();
  const objective = objectiveInput.value.trim();
  const email = emailInput.value.trim();
  const address = addressInput.value.trim();
  const dob = dobInput.value.trim();
  const cnic = cnicInput.value.trim();

  // Gather Skills, Achievements, Languages
  const skills = getInputValues("skills");
  const achievements = getInputValues("achievements");
  const languages = getInputValues("languages");

  // Gather Education
  const educationInputs = document.querySelectorAll("#education input[type='text']");
  const education: EducationEntry[] = [];
  for (let i = 0; i < educationInputs.length; i += 3) {
    const institute = (educationInputs[i] as HTMLInputElement).value.trim();
    const subject = (educationInputs[i + 1] as HTMLInputElement).value.trim();
    const year = (educationInputs[i + 2] as HTMLInputElement).value.trim();
    if (institute && subject && year) {
      education.push({ institute, subject, year });
    }
  }

  // Gather Experience
  const experienceInputs = document.querySelectorAll("#experience input[type='text']");
  const experienceTextarea = document.querySelector("#experience textarea") as HTMLTextAreaElement;
  const responsibilities = experienceTextarea.value.split('\n').map(resp => resp.trim()).filter(resp => resp !== "");

  const experience: ExperienceEntry[] = [];
  for (let i = 0; i < experienceInputs.length; i += 3) {
    const company = (experienceInputs[i] as HTMLInputElement).value.trim();
    const position = (experienceInputs[i + 1] as HTMLInputElement).value.trim();
    const years = (experienceInputs[i + 2] as HTMLInputElement).value.trim();
    if (company && position && years) {
      experience.push({ company, position, years, responsibilities });
    }
  }

  // Gather Projects
  const projectsInputs = document.querySelectorAll("#projects input[type='text']");
  const projectsTextarea = document.querySelector("#projects textarea") as HTMLTextAreaElement;
  const projects: ProjectEntry[] = [];
  for (let i = 0; i < projectsInputs.length; i += 2) {
    const name = (projectsInputs[i] as HTMLInputElement).value.trim();
    const description = (projectsTextarea.value).trim();
    if (name && description) {
      projects.push({ name, description });
    }
  }

  // Generate Resume HTML
  const resumeHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Profile Page</title>
      <link rel="stylesheet" href="./dynamic.css">
    </head>
    <body>
      <div class="container">
        <div class="profile">
          <!-- Left Column -->
          <aside class="sidebar">
            <div class="profile-image" style="display: flex;justify-content: center; align-items: center; width: 200px; height: 200;">
            <img src="${profileImageDataURL ?? './programmer.jpg'}" alt="Profile photo"  width="150" height="150" class="avatar">
          </div>
            <h1 class="name">${name.toUpperCase()}</h1>
            <section class="section">
              <h2>ABOUT ME</h2>
              <p>${objective}</p>
            </section>

            <section class="section">
              <h2>SKILLS</h2>
              <ul>
                ${skills.map(skill => `<li>${skill}</li>`).join('')}
              </ul>
            </section>

            <section class="section">
              <h2>CONTACT</h2>
              <p>Email: ${email}</p>
              <p>Address: ${address}</p>
              <p>DOB: ${dob}</p>
              <p>CNIC: ${cnic}</p>
            </section>
          </aside>

          <!-- Right Column -->
          <main class="main-content">
            <section>
              <h2>EDUCATION</h2>
              ${education.map(edu => `
                <div class="education">
                  <p>${edu.year} | ${edu.institute}</p>
                  <h3>${edu.subject}</h3>
                </div>
              `).join('')}
            </section>

            <section>
              <h2>WORK EXPERIENCE</h2>
              ${experience.map(exp => `
                <div class="job">
                  <h3>${exp.company}</h3>
                  <p>Position: ${exp.position}</p>
                  <p>Years of Experience: ${exp.years}</p>
                  <ul>
                    ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </section>

            <section>
              <h2>PROJECTS</h2>
              ${projects.map(proj => `
                <div class="project">
                  <h3>${proj.name}</h3>
                  <p>${proj.description}</p>
                </div>
              `).join('')}
            </section>

            <section>
              <h2>ACHIEVEMENTS</h2>
              <ul>
                ${achievements.map(ach => `<li>${ach}</li>`).join('')}
              </ul>
            </section>

            <section>
              <h2>LANGUAGES</h2>
              <ul>
                ${languages.map(lang => `<li>${lang}</li>`).join('')}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </body>
    </html>
  `;

  // Open the generated resume in a new window
  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.write(resumeHtml);
    newWindow.document.close();
  } else {
    alert("Unable to open the resume in a new window.");
  }
}
