// script.ts
var _a, _b, _c, _d, _e, _f, _g;
// Helper function to add new input elements for multiple entries
function addInput(sectionId, placeholder) {
    var section = document.getElementById(sectionId);
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    input.classList.add("dynamic-input");
    section.appendChild(input);
}
// Add More buttons event listeners
(_a = document.getElementById("add-skill")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    addInput("skills", "Skill");
});
(_b = document.getElementById("add-achievement")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    addInput("achievements", "Achievement");
});
(_c = document.getElementById("add-language")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    addInput("languages", "Language");
});
(_d = document.getElementById("add-education")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    addEducationFields();
});
(_e = document.getElementById("add-experience")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
    addExperienceFields();
});
(_f = document.getElementById("add-project")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
    addProjectFields();
});
// Function to add education fields
function addEducationFields() {
    var section = document.getElementById("education");
    var instituteInput = document.createElement("input");
    instituteInput.type = "text";
    instituteInput.placeholder = "Institute Name";
    section.appendChild(instituteInput);
    var subjectInput = document.createElement("input");
    subjectInput.type = "text";
    subjectInput.placeholder = "Subject";
    section.appendChild(subjectInput);
    var yearInput = document.createElement("input");
    yearInput.type = "text";
    yearInput.placeholder = "Passing Year";
    section.appendChild(yearInput);
}
// Function to add experience fields
function addExperienceFields() {
    var section = document.getElementById("experience");
    var companyInput = document.createElement("input");
    companyInput.type = "text";
    companyInput.placeholder = "Company Name";
    section.appendChild(companyInput);
    var positionInput = document.createElement("input");
    positionInput.type = "text";
    positionInput.placeholder = "Position";
    section.appendChild(positionInput);
    var yearsInput = document.createElement("input");
    yearsInput.type = "text";
    yearsInput.placeholder = "Years of Experience";
    section.appendChild(yearsInput);
    var responsibilitiesInput = document.createElement("textarea");
    responsibilitiesInput.placeholder = "Responsibilities";
    section.appendChild(responsibilitiesInput);
}
// Function to add project fields
function addProjectFields() {
    var section = document.getElementById("projects");
    var projectNameInput = document.createElement("input");
    projectNameInput.type = "text";
    projectNameInput.placeholder = "Project Name";
    section.appendChild(projectNameInput);
    var projectDescInput = document.createElement("textarea");
    projectDescInput.placeholder = "Project Description";
    section.appendChild(projectDescInput);
}
// Generate Resume Button event listener
(_g = document.getElementById("generate-resume")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", generateResume);
function generateResume() {
    var name = document.getElementById("name").value;
    var objective = document.getElementById("objective").value;
    var personalInfo = getInputValues("personal-info");
    var skills = getInputValues("skills");
    var achievements = getInputValues("achievements");
    var languages = getInputValues("languages");
    var education = getSectionValues("education");
    var experience = getSectionValues("experience");
    var projects = getSectionValues("projects");
    var resumeSection = document.createElement("div");
    resumeSection.className = "generated-resume";
    // Add Name and Objective
    var nameElement = document.createElement("h2");
    nameElement.innerText = name;
    resumeSection.appendChild(nameElement);
    var objectiveElement = document.createElement("p");
    objectiveElement.innerText = "Objective: ".concat(objective);
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
    var outputContainer = document.getElementById("resume-output");
    outputContainer.innerHTML = ""; // Clear previous resume if any
    outputContainer.appendChild(resumeSection);
}
// Helper function to create sections in the resume output
function appendSection(container, title, items) {
    if (items.length > 0) {
        var sectionTitle = document.createElement("h3");
        sectionTitle.innerText = title;
        container.appendChild(sectionTitle);
        items.forEach(function (item) {
            var itemElement = document.createElement("p");
            itemElement.innerText = item;
            container.appendChild(itemElement);
        });
    }
}
// Helper function to get values from sections with simple input fields
function getInputValues(sectionId) {
    var section = document.getElementById(sectionId);
    var inputs = Array.from(section.querySelectorAll("input"));
    return inputs.map(function (input) { return input.value; }).filter(function (value) { return value.trim() !== ""; });
}
// Helper function to get values from sections with grouped inputs (Education, Experience, Projects)
function getSectionValues(sectionId) {
    var section = document.getElementById(sectionId);
    var groupedElements = Array.from(section.children);
    return groupedElements.map(function (el) { return el.value; }).filter(function (value) { return value.trim() !== ""; });
}
