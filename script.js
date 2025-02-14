// Load Home Page Content
function loadHome() {
    document.getElementById("main-content").innerHTML = `
        <section class="welcome-section">
            <h2>Welcome to AcadTrack</h2>
            <p>Track your assignments, exams, and academic progress with ease.</p>
        </section>
    `;
}

// Load Dashboard Content
function loadDashboard() {
    document.getElementById("main-content").innerHTML = `
        <section class="dashboard">
            <h2 class="dashboard-title">Dashboard Overview</h2>
            <div class="dashboard-container">
                <div class="card">
                    <h3>Assignments</h3>
                    <p>5 pending</p>
                    <div class="progress-bar"><div class="progress" style="width: 50%;"></div></div>
                </div>
                <div class="card">
                    <h3>Exams</h3>
                    <p>Next exam: Feb 25</p>
                    <div class="progress-bar"><div class="progress" style="width: 30%;"></div></div>
                </div>
                <div class="card">
                    <h3>Overall Progress</h3>
                    <p>75% completed</p>
                    <div class="progress-bar"><div class="progress" style="width: 75%;"></div></div>
                </div>
            </div>
        </section>
    `;
}
