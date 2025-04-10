const currPage = localStorage.currentPage;

function loadNavbar() {
    let navbar = document.querySelector("#navbar");
    navbar.innerHTML = navbarHTML();
    let menuList = document.querySelector("#menulist");
    let menuIcon = document.querySelector("#menu-icon");

    if(window.innerWidth > 1024) {
        menuList.classList.add("large-menulist");
    } else {
        menuList.classList.add("close-menulist");
    }
    
    window.addEventListener('resize', function(event) {
        if(this.window.innerWidth > 1024) {
            menuList.classList.remove("open-menulist");
            menuList.classList.remove("close-menulist");
            navbar.style.borderRadius = null;
            menuList.classList.add("large-menulist");
        } else {
            menuList.classList.remove("large-menulist");
            menuList.classList.add("close-menulist");
        }
        }, true);

    menuIcon.addEventListener('click', function(event) {
        if(!menuList.classList.contains("open-menulist")) {
            menuList.classList.add("open-menulist");
        }
        if(menuList.classList.contains("close-menulist")) {
            navbar.style.borderRadius = "0px";
            menuList.classList.remove("close-menulist");
        }else {
            navbar.style.borderRadius = null;
            menuList.classList.add("close-menulist");
        }
    })

}

function navbarHTML() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user.role === "Student") {
        return `<div id="nav-img-header">        
                    <a href="dashboard-student.html">
                        <img src="../assets/images/qu_logo_white.png" alt="" id="long-qu-logo">
                        <img src="../assets/images/qu_logo_white3.png" alt="" id="short-qu-logo">
                    </a>
                    <p id="nav-title">Course Management System</p>
                </div>
                    <ul id="menulist">
                        <div class="nav-index ${currPage === 'dashboard' ? 'active' : ''}">
                            <li><i class='bx bxs-home'></i> <a href="dashboard-student.html">Dashboard</a></li>
                        </div>
                        <div class="nav-index ${currPage === 'courses' ? 'active' : ''}">
                            <li><i class='bx bxs-book'></i> <a href="courses-students.html">Courses</a></li>
                        </div>
                        <div class="nav-index ${currPage === 'learningPath' ? 'active' : ''}">           
                            <li><i class='bx bxs-graduation'></i> <a href="learning-path.html">Learning Path</a></li>
                        </div>
                    ${logoutAndMenuHTML()}`;
                    
    } else if (user.role === "Instructor") {
        return `<div id="nav-img-header">        
                    <a href="dashboard-instructor.html">
                        <img src="../assets/images/qu_logo_white.png" alt="" id="long-qu-logo">
                        <img src="../assets/images/qu_logo_white3.png" alt="" id="short-qu-logo">
                    </a>
                    <p id="nav-title">Course Management System</p>
                </div>
                    <ul id="menulist">
                        <div class="nav-index ${currPage === 'dashboard' ? 'active' : ''}">
                            <li><i class='bx bxs-home'></i> <a href="dashboard-instructor.html">Dashboard</a></li>
                        </div>
                        <div class="nav-index">
                            <li><i class='bx bxs-cog'></i> <a href="#">Course Instructor Allocation</a></li>
                        </div>
                ${logoutAndMenuHTML()}`;
    }

    // If admin
    return `<div id="nav-img-header">        
                <a href="dashboard-admin.html">
                    <img src="../assets/images/qu_logo_white.png" alt="" id="long-qu-logo">
                    <img src="../assets/images/qu_logo_white3.png" alt="" id="short-qu-logo">
                </a>
                <p id="nav-title">Course Management System</p>
            </div>
                <ul id="menulist">
                    <div class="nav-index ${currPage === 'dashboard' ? 'active' : ''}">
                        <li><i class='bx bxs-home'></i> <a href="dashboard-admin.html">Dashboard</a></li>
                    </div>
                    <div class="nav-index ${currPage === 'addCourses' ? 'active' : ''}">
                        <li><i class='bx bxs-book-add'></i> <a href="add-courses.html">Add Course</a></li>
                    </div>
                    <div class="nav-index ${currPage === 'addSection' ? 'active' : ''}">
                        <li><i class='bx bxs-plus-circle'></i> <a href="add-section.html">Add Section</a></li>
                    </div>
                ${logoutAndMenuHTML()}`;
}

function logoutAndMenuHTML() {
    return `    <div class="nav-index">
                    <li><i class='bx bx-power-off'></i> <a onclick="openLogoutDialog()">Logout</a></li>
                </div>
            </ul>
            <div class="nav-index" id="menu-icon">
                <i class='bx bx-menu'></i>
            </div>`;
}

loadNavbar();