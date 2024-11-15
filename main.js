var DynamicResumeBuilder = /** @class */ (function () {
    function DynamicResumeBuilder() {
        this.form = document.getElementById('resumeForm');
        this.outputElement = document.getElementById('resumeOutput');
        this.templateSelector = document.getElementById('template');
        this.addEducationButton = document.getElementById('addEducation');
        this.addExperienceButton = document.getElementById('addExperience');
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.templateSelector.addEventListener('change', this.updateTemplate.bind(this));
        this.addEducationButton.addEventListener('click', this.addEducationField.bind(this));
        this.addExperienceButton.addEventListener('click', this.addExperienceField.bind(this));
    }
    DynamicResumeBuilder.prototype.handleSubmit = function (event) {
        event.preventDefault();
        var data = this.getFormData();
        this.renderResume(data);
    };
    DynamicResumeBuilder.prototype.getFormData = function () {
        var educationEntries = Array.from(document.querySelectorAll('.education-entry')).map(function (entry) { return ({
            degree: entry.querySelector('.degree').value,
            school: entry.querySelector('.school').value,
            graduationYear: entry.querySelector('.graduationYear').value
        }); });
        var experienceEntries = Array.from(document.querySelectorAll('.experience-entry')).map(function (entry) { return ({
            jobTitle: entry.querySelector('.jobTitle').value,
            company: entry.querySelector('.company').value,
            workDates: entry.querySelector('.workDates').value,
            jobDescription: entry.querySelector('.jobDescription').value
        }); });
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            education: educationEntries,
            experience: experienceEntries,
            skills: document.getElementById('skills').value,
        };
    };
    DynamicResumeBuilder.prototype.renderResume = function (data) {
        var personalInfo = document.getElementById('personalInfo');
        var educationInfo = document.getElementById('educationInfo');
        var workExperience = document.getElementById('workExperience');
        var skillsInfo = document.getElementById('skillsInfo');
        personalInfo.innerHTML = "\n            <h3>Personal Information</h3>\n            <p><strong>Name:</strong> ".concat(data.name, "</p>\n            <p><strong>Email:</strong> ").concat(data.email, "</p>\n            <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n            <p><strong>Address:</strong> ").concat(data.address, "</p>\n        ");
        educationInfo.innerHTML = "\n            <h3>Education</h3>\n            ".concat(data.education.map(function (edu) { return "\n                <div>\n                    <p><strong>Degree:</strong> ".concat(edu.degree, "</p>\n                    <p><strong>School/University:</strong> ").concat(edu.school, "</p>\n                    <p><strong>Graduation Year:</strong> ").concat(edu.graduationYear, "</p>\n                </div>\n            "); }).join(''), "\n        ");
        workExperience.innerHTML = "\n            <h3>Work Experience</h3>\n            ".concat(data.experience.map(function (exp) { return "\n                <div>\n                    <p><strong>Job Title:</strong> ".concat(exp.jobTitle, "</p>\n                    <p><strong>Company:</strong> ").concat(exp.company, "</p>\n                    <p><strong>Work Dates:</strong> ").concat(exp.workDates, "</p>\n                    <p><strong>Job Description:</strong> ").concat(exp.jobDescription, "</p>\n                </div>\n            "); }).join(''), "\n        ");
        skillsInfo.innerHTML = "\n            <h3>Skills</h3>\n            <p>".concat(data.skills.split(',').map(function (skill) { return skill.trim(); }).join(', '), "</p>\n        ");
    };
    DynamicResumeBuilder.prototype.updateTemplate = function () {
        var selectedTemplate = this.templateSelector.value;
        this.outputElement.className = "resume-output ".concat(selectedTemplate);
    };
    DynamicResumeBuilder.prototype.addEducationField = function () {
        var educationFields = document.getElementById('educationFields');
        var newField = document.createElement('div');
        newField.className = 'education-entry';
        newField.innerHTML = "\n            <input type=\"text\" class=\"degree\" placeholder=\"Degree\" required>\n            <input type=\"text\" class=\"school\" placeholder=\"School/University\" required>\n            <input type=\"text\" class=\"graduationYear\" placeholder=\"Graduation Year\" required>\n        ";
        educationFields.appendChild(newField);
    };
    DynamicResumeBuilder.prototype.addExperienceField = function () {
        var experienceFields = document.getElementById('experienceFields');
        var newField = document.createElement('div');
        newField.className = 'experience-entry';
        newField.innerHTML = "\n            <input type=\"text\" class=\"jobTitle\" placeholder=\"Job Title\" required>\n            <input type=\"text\" class=\"company\" placeholder=\"Company\" required>\n            <input type=\"text\" class=\"workDates\" placeholder=\"Work Dates\" required>\n            <textarea class=\"jobDescription\" placeholder=\"Job Description\" required></textarea>\n        ";
        experienceFields.appendChild(newField);
    };
    return DynamicResumeBuilder;
}());
// Initialize the DynamicResumeBuilder when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    new DynamicResumeBuilder();
});
