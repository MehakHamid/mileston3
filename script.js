var _a, _b, _c, _d, _e, _f;
// Get references to the HTML elements
var generateResumeBtn = document.getElementById("generate-resume");
var nameInput = document.getElementById("name");
var objectiveInput = document.getElementById("objective");
var emailInput = document.getElementById("email");
var addressInput = document.getElementById("address");
var dobInput = document.getElementById("dob");
var cnicInput = document.getElementById("cnic");
var profileImageInput = document.getElementById("profileImage");
var profileImageDataURL = null;
// Listen for image file input change
profileImageInput.addEventListener("change", function (event) {
    var _a;
    var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            profileImageDataURL = reader_1.result;
        };
        reader_1.readAsDataURL(file);
    }
});
// Function to get all input values within a container
var getInputValues = function (containerId) {
    var container = document.getElementById(containerId);
    if (!container)
        return [];
    var inputs = container.querySelectorAll("input[type='text'], textarea");
    return Array.from(inputs)
        .map(function (input) { return input.value; })
        .filter(function (val) { return val.trim() !== ""; });
};
// Function to add new input fields (Skills, Achievements, Languages, etc.)
var addInputField = function (containerId, placeholder) {
    var container = document.getElementById(containerId);
    if (container) {
        var newInput = document.createElement("input");
        newInput.type = "text";
        newInput.placeholder = placeholder;
        container.appendChild(newInput);
    }
};
// Event listeners for adding more fields
(_a = document
    .getElementById("add-skill")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return addInputField("skills", "Skill"); });
(_b = document
    .getElementById("add-achievement")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    return addInputField("achievements", "Achievement");
});
(_c = document
    .getElementById("add-language")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () { return addInputField("languages", "Language"); });
(_d = document.getElementById("add-education")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    var educationContainer = document.getElementById("education");
    if (educationContainer) {
        var instituteInput = document.createElement("input");
        instituteInput.type = "text";
        instituteInput.placeholder = "Institute Name";
        var subjectInput = document.createElement("input");
        subjectInput.type = "text";
        subjectInput.placeholder = "Subject";
        var yearInput = document.createElement("input");
        yearInput.type = "text";
        yearInput.placeholder = "Passing Year";
        educationContainer.appendChild(instituteInput);
        educationContainer.appendChild(subjectInput);
        educationContainer.appendChild(yearInput);
    }
});
(_e = document.getElementById("add-experience")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
    var experienceContainer = document.getElementById("experience");
    if (experienceContainer) {
        var companyInput = document.createElement("input");
        companyInput.type = "text";
        companyInput.placeholder = "Company Name";
        var positionInput = document.createElement("input");
        positionInput.type = "text";
        positionInput.placeholder = "Position";
        var yearsInput = document.createElement("input");
        yearsInput.type = "text";
        yearsInput.placeholder = "Years of Experience";
        var responsibilitiesTextarea = document.createElement("textarea");
        responsibilitiesTextarea.placeholder = "Responsibilities";
        experienceContainer.appendChild(companyInput);
        experienceContainer.appendChild(positionInput);
        experienceContainer.appendChild(yearsInput);
        experienceContainer.appendChild(responsibilitiesTextarea);
    }
});
(_f = document.getElementById("add-project")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
    var projectsContainer = document.getElementById("projects");
    if (projectsContainer) {
        var projectNameInput = document.createElement("input");
        projectNameInput.type = "text";
        projectNameInput.placeholder = "Project Name";
        var projectDescriptionTextarea = document.createElement("textarea");
        projectDescriptionTextarea.placeholder = "Project Description";
        projectsContainer.appendChild(projectNameInput);
        projectsContainer.appendChild(projectDescriptionTextarea);
    }
});
generateResumeBtn.addEventListener("click", generateResume);
function generateResume() {
    // Gather all input data
    var name = nameInput.value.trim();
    var objective = objectiveInput.value.trim();
    var email = emailInput.value.trim();
    var address = addressInput.value.trim();
    var dob = dobInput.value.trim();
    var cnic = cnicInput.value.trim();
    // Gather Skills, Achievements, Languages
    var skills = getInputValues("skills");
    var achievements = getInputValues("achievements");
    var languages = getInputValues("languages");
    // Gather Education
    var educationInputs = document.querySelectorAll("#education input[type='text']");
    var education = [];
    for (var i = 0; i < educationInputs.length; i += 3) {
        var institute = educationInputs[i].value.trim();
        var subject = educationInputs[i + 1].value.trim();
        var year = educationInputs[i + 2].value.trim();
        if (institute && subject && year) {
            education.push({ institute: institute, subject: subject, year: year });
        }
    }
    // Gather Experience
    var experienceInputs = document.querySelectorAll("#experience input[type='text']");
    var experienceTextarea = document.querySelector("#experience textarea");
    var responsibilities = experienceTextarea.value
        .split("\n")
        .map(function (resp) { return resp.trim(); })
        .filter(function (resp) { return resp !== ""; });
    var experience = [];
    for (var i = 0; i < experienceInputs.length; i += 3) {
        var company = experienceInputs[i].value.trim();
        var position = experienceInputs[i + 1].value.trim();
        var years = experienceInputs[i + 2].value.trim();
        if (company && position && years) {
            experience.push({ company: company, position: position, years: years, responsibilities: responsibilities });
        }
    }
    // Gather Projects
    var projectsInputs = document.querySelectorAll("#projects input[type='text']");
    var projectsTextarea = document.querySelector("#projects textarea");
    var projects = [];
    for (var i = 0; i < projectsInputs.length; i += 2) {
        var name_1 = projectsInputs[i].value.trim();
        var description = projectsTextarea.value.trim();
        if (name_1 && description) {
            projects.push({ name: name_1, description: description });
        }
    }
    // Generate Resume HTML
    var resumeHtml = "\n    <!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>Profile Page</title>\n      <link rel=\"stylesheet\" href=\"./dynamic.css\">\n    </head>\n    <body>\n      <div class=\"container\">\n        <div class=\"profile\">\n          <!-- Left Column -->\n          <aside class=\"sidebar\">\n            <div class=\"profile-image\" style=\"display: flex;justify-content: center; align-items: center; width: 200px; height: 200;\">\n            <img src=\"".concat(profileImageDataURL !== null && profileImageDataURL !== void 0 ? profileImageDataURL : "./programmer.jpg", "\" alt=\"Profile photo\"  width=\"150\" height=\"150\" class=\"avatar\">\n          </div>\n            <h1 class=\"name\">").concat(name.toUpperCase(), "</h1>\n            <section class=\"section\">\n              <h2>ABOUT ME</h2>\n              <p class=\"aboutMe\">").concat(objective, "</p>\n            </section>\n\n            <section class=\"section\">\n              <h2>SKILLS</h2>\n              <ul>\n                ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "\n              </ul>\n            </section>\n\n            <section class=\"section\">\n              <h2>CONTACT</h2>\n              <p>Email: ").concat(email, "</p>\n              <p>Address: ").concat(address, "</p>\n              <p>DOB: ").concat(dob, "</p>\n              <p>CNIC: ").concat(cnic, "</p>\n            </section>\n          </aside>\n\n          <!-- Right Column -->\n          <main class=\"main-content\">\n            <section>\n              <h2>EDUCATION</h2>\n              ").concat(education
        .map(function (edu) { return "\n                <div class=\"education\">\n                  <p>".concat(edu.year, " | ").concat(edu.institute, "</p>\n                  <h3>").concat(edu.subject, "</h3>\n                </div>\n              "); })
        .join(""), "\n            </section>\n\n            <section>\n              <h2>WORK EXPERIENCE</h2>\n              ").concat(experience
        .map(function (exp) { return "\n                <div class=\"job\">\n                  <h3>".concat(exp.company, "</h3>\n                  <p>Position: ").concat(exp.position, "</p>\n                  <p>Years of Experience: ").concat(exp.years, "</p>\n                  <ul>\n                    ").concat(exp.responsibilities
        .map(function (resp) { return "<li>".concat(resp, "</li>"); })
        .join(""), "\n                  </ul>\n                </div>\n              "); })
        .join(""), "\n            </section>\n\n            <section>\n              <h2>PROJECTS</h2>\n              ").concat(projects
        .map(function (proj) { return "\n                <div class=\"project\">\n                  <h3>".concat(proj.name, "</h3>\n                  <p>").concat(proj.description, "</p>\n                </div>\n              "); })
        .join(""), "\n            </section>\n\n            <section>\n              <h2>ACHIEVEMENTS</h2>\n              <ul>\n                ").concat(achievements.map(function (ach) { return "<li>".concat(ach, "</li>"); }).join(""), "\n              </ul>\n            </section>\n\n            <section>\n              <h2>LANGUAGES</h2>\n              <ul>\n                ").concat(languages.map(function (lang) { return "<li>".concat(lang, "</li>"); }).join(""), "\n              </ul>\n            </section>\n          </main>\n        </div>\n      </div>\n    </body>\n    </html>\n  ");
    // Open the generated resume in a new window
    var newWindow = window.open();
    if (newWindow) {
        newWindow.document.write(resumeHtml);
        newWindow.document.close();
    }
    else {
        alert("Unable to open the resume in a new window.");
    }
}
