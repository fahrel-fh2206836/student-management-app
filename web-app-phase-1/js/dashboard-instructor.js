// Set localstorage.currentpage
localStorage.currentPage = "dashboard";

const user = JSON.parse(localStorage.getItem("loggedInUser"));
const registrations = JSON.parse(localStorage.registrations);
const sections = JSON.parse(localStorage.sections);
const courses = JSON.parse(localStorage.courses);
const users = JSON.parse(localStorage.users);
const semesters = JSON.parse(localStorage.semesters);
const currentSem = localStorage.currentSem;



const nameSpan = document.querySelector("#name");
const teachingList = document.querySelector(".course-card-list");
const Activeclass = document.querySelector("#Activeclass");
const totalStud = document.querySelector("#totalStud")
const numberOfClasses = document.querySelector("#Noclasses");
const instructorSections = sections.filter(section => section.instructorId === user.userId);



nameSpan.innerText = `${user.firstName} ${user.lastName}`;
Activeclass.innerHTML = `${countClasses()}`;
totalStud.innerHTML = `${countStudents()}`;
numberOfClasses.innerHTML = `${instructorSections.length}`;

function countClasses(){
    let count = 0;
    instructorSections.forEach( instSec => {
        let section = sections.find(s => instSec.sectionId === s.sectionId);
        if (section.sectionStatus === 'ONGOING') {
            count+=1;
        }
    })
    return count;
}

function countStudents(){
    let count=0;
    instructorSections.forEach( instSec => {
        let section = sections.find(s => instSec.sectionId === s.sectionId);
        if (section.sectionStatus === 'ONGOING') {
            count+=section.currentSeats;
        }
    })
    return count;
}
function renderActiveCourses(){
    let ongoingHTML = '';
    let notOngoingHTML = '';
    if(instructorSections.length === 0) {
        teachingList.innerHTML = `<div class="empty-section">
                                    <i class='bx bxs-error-circle'></i>
                                    <p>No Courses found.</p>
                                 </div>
                                `;
                                return;
    }
    instructorSections.forEach(instSec => {
        let section = sections.find(s => instSec.sectionId === s.sectionId); 
        let course = courses.find(c => c.id === section.courseId);
        const cardHTML = generateCourseListHTML(section, course)+'\n';
        if (section.sectionStatus === 'ONGOING') {
            ongoingHTML += cardHTML;
          } else if (section.sectionStatus === 'OPEN_REGISTRATION' || section.sectionStatus === 'COMPLETED') {
            notOngoingHTML += cardHTML;
          }
        })
        teachingList.innerHTML = `
            <h3>Ongoing Courses</h3>
            <div class="card-group">${ongoingHTML || `<div class="empty-section"><i class='bx bxs-error-circle'></i><p>No Ongoing Courses found.</p> </div>`}</div>
            
            <div class="pFcourses">
                <h3>Previous/Future Courses</h3>
                <div class="section-filters">
                    <div class="semester-filter">
                        <select id="semester-filter" name="semester">
                            <!-- Added thru js -->
                        </select>
                    </div>
                </div>
            </div>
            <div class="pFcard-group">${notOngoingHTML || `<div class="empty-section"><i class='bx bxs-error-circle'></i><p>No Previous/Future Courses found.</p> </div>`}</div>
        `;
}

renderActiveCourses();

function generateCourseListHTML(s, c) {
    return `
            <div class="course-card hover-underline" onclick="goToGradeAllocation('${s.sectionId}')">
                <div class="card-seats position-corner-top-left">
                    <i class='bx bxs-group'></i>
                    <p>${s.currentSeats}/${s.totalSeats}</p>
                </div>
                <div class="card-flag"><p>${c.courseCode}</p></div>
                <div class="card-course-name"><p>${c.courseName}</p></div>
                <div class="card-course-section-location"><p>Section ID: ${s.sectionId}</p><p>Class Location: ${s.location !== '' ? s.location : 'None'}</p></div>
                <hr>
                <div class="card-course-sem-schedule"><p><i class='bx bx-calendar'></i>${s.semester}</p><p><i class='bx bx-calendar-week'></i>${s.schedule.days !== '' ? s.schedule.days : 'None'}</p><p><i class='bx bx-time'></i>${s.schedule.time !== '' ? s.schedule.time : 'None'}</p></div>
            </div>`;
}

function goToGradeAllocation(sectionId) {
    const s = sections.find(s => s.sectionId === sectionId);
    localStorage.selectedCourse = JSON.stringify(s);
    console.log(s);
    
    window.location.href='grade-allocation.html';
}

function renderSemesterDropdown() {
    const semesterDropdown = document.querySelector('#semester-filter');
    semesterDropdown.innerHTML = convertSemesterOptionHTML();
}
function convertSemesterOptionHTML() {
    let relevantsemesters = semesters.filter(s => s !== currentSem);
    return `<option value="All" selected>All Semester</option>
            $.map(s => ${relevantsemesters.map(s => `<option value="${s}">${s}</option>`).join('\n')}`;
}

renderSemesterDropdown()

const pFcardGroup = document.querySelector(".pFcard-group");
const semFilter = document.querySelector("#semester-filter");
semFilter.addEventListener('change', handleFilter);

function handleFilter(e){
    let selectedSections;
    if(semFilter.value !== "All") {
        selectedSections = instructorSections.filter(s => s.semester === semFilter.value);
    }else{
        selectedSections = instructorSections.filter(s => s.sectionStatus !== "ONGOING");
    }
    
    pFcardGroup.innerHTML = '';
    if(selectedSections.length >= 1){
        selectedSections.forEach(section => {
            let course = courses.find(c => c.id === section.courseId);
            pFcardGroup.innerHTML += generateCourseListHTML(section,course);
        })
    }else{
        pFcardGroup.innerHTML = `<div class="empty-section"><i class='bx bxs-error-circle'></i><p>No Courses found.</p> </div>`;
    }
}