// script.ts

// Helper function to add new input elements for multiple entries
function addInput(sectionId: string, placeholder: string) {
  const section = document.getElementById(sectionId) as HTMLElement;
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.classList.add("dynamic-input");
  section.appendChild(input);
}

// Add More buttons event listeners
document.getElementById("add-skill")?.addEventListener("click", () => {
  addInput("skills", "Skill");
});

document.getElementById("add-achievement")?.addEventListener("click", () => {
  addInput("achievements", "Achievement");
});

document.getElementById("add-language")?.addEventListener("click", () => {
  addInput("languages", "Language");
});

document.getElementById("add-education")?.addEventListener("click", () => {
  addEducationFields();
});

document.getElementById("add-experience")?.addEventListener("click", () => {
  addExperienceFields();
});

document.getElementById("add-project")?.addEventListener("click", () => {
  addProjectFields();
});

// Function to add education fields
function addEducationFields() {
  const section = document.getElementById("education") as HTMLElement;
  const instituteInput = document.createElement("input");
  instituteInput.type = "text";
  instituteInput.placeholder = "Institute Name";
  section.appendChild(instituteInput);

  const subjectInput = document.createElement("input");
  subjectInput.type = "text";
  subjectInput.placeholder = "Subject";
  section.appendChild(subjectInput);

  const yearInput = document.createElement("input");
  yearInput.type = "text";
  yearInput.placeholder = "Passing Year";
  section.appendChild(yearInput);
}

// Function to add experience fields
function addExperienceFields() {
  const section = document.getElementById("experience") as HTMLElement;
  const companyInput = document.createElement("input");
  companyInput.type = "text";
  companyInput.placeholder = "Company Name";
  section.appendChild(companyInput);

  const positionInput = document.createElement("input");
  positionInput.type = "text";
  positionInput.placeholder = "Position";
  section.appendChild(positionInput);

  const yearsInput = document.createElement("input");
  yearsInput.type = "text";
  yearsInput.placeholder = "Years of Experience";
  section.appendChild(yearsInput);

  const responsibilitiesInput = document.createElement("textarea");
  responsibilitiesInput.placeholder = "Responsibilities";
  section.appendChild(responsibilitiesInput);
}

// Function to add project fields
function addProjectFields() {
  const section = document.getElementById("projects") as HTMLElement;
  const projectNameInput = document.createElement("input");
  projectNameInput.type = "text";
  projectNameInput.placeholder = "Project Name";
  section.appendChild(projectNameInput);

  const projectDescInput = document.createElement("textarea");
  projectDescInput.placeholder = "Project Description";
  section.appendChild(projectDescInput);
}

// Generate Resume Button event listener
document.getElementById("generate-resume")?.addEventListener("click", generateResume);

function generateResume() {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const objective = (document.getElementById("objective") as HTMLInputElement).value;
  
  const personalInfo = getInputValues("personal-info");
  const skills = getInputValues("skills");
  const achievements = getInputValues("achievements");
  const languages = getInputValues("languages");
  const education = getSectionValues("education");
  const experience = getSectionValues("experience");
  const projects = getSectionValues("projects");

  const resumeSection = document.createElement("div");
  resumeSection.className = "generated-resume";
  
  // Add Name and Objective
  const nameElement = document.createElement("h2");
  nameElement.innerText = name;
  resumeSection.appendChild(nameElement);
  
  const objectiveElement = document.createElement("p");
  objectiveElement.innerText = `Objective: ${objective}`;
  resumeSection.appendChild(objectiveElement);
  
  // Add sections to display each part of the resume
  appendSection(resumeSection, "Personal Info", personalInfo);
  appendSection(resumeSection, "Skills", skills);
  appendSection(resumeSection, "Achievements", achievements);
  appendSection(resumeSection, "Languages", languages);
  appendSection(resumeSection, "Education", education);
  appendSection(resumeSection, "Experience", experience);
  appendSection(resumeSection, "Projects", projects);
  
  // Append the generated resume to the document body or a specific container
  const outputContainer = document.getElementById("resume-output");
  outputContainer!.innerHTML = ""; // Clear previous resume if any
  outputContainer!.appendChild(resumeSection);
}

// Helper function to create sections in the resume output
function appendSection(container: HTMLElement, title: string, items: string[]) {
  if (items.length > 0) {
    const sectionTitle = document.createElement("h3");
    sectionTitle.innerText = title;
    container.appendChild(sectionTitle);
    
    items.forEach(item => {
      const itemElement = document.createElement("p");
      itemElement.innerText = item;
      container.appendChild(itemElement);
    });
  }
}

// Helper function to get values from sections with simple input fields
function getInputValues(sectionId: string): string[] {
  const section = document.getElementById(sectionId) as HTMLElement;
  const inputs = Array.from(section.querySelectorAll("input"));
  return inputs.map(input => (input as HTMLInputElement).value).filter(value => value.trim() !== "");
}

// Helper function to get values from sections with grouped inputs (Education, Experience, Projects)
function getSectionValues(sectionId: string): string[] {
  const section = document.getElementById(sectionId) as HTMLElement;
  const groupedElements = Array.from(section.children);
  return groupedElements.map(el => (el as HTMLInputElement | HTMLTextAreaElement).value).filter(value => value.trim() !== "");
}
