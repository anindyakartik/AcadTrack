document.addEventListener("DOMContentLoaded", function () {
    const assignments = [
        { title: "Math Assignment 1", course: "Mathematics", dueDate: "2025-02-20", status: "completed", marks: 20 },
        { title: "Physics Assignment", course: "Physics", dueDate: "2025-02-22", status: "pending", marks: 30 },
        { title: "AI Research Paper", course: "Artificial Intelligence", dueDate: "2025-02-25", status: "completed", marks: 50 },
        { title: "Data Structures Lab", course: "Computer Science", dueDate: "2025-02-28", status: "pending", marks: 40 }
    ];

    const assignmentContainer = document.getElementById("assignments-list");
    const statusFilter = document.getElementById("status-filter");

    // Ensure both elements exist before proceeding
    if (!assignmentContainer || !statusFilter) {
        console.error("Missing elements: assignments-list or status-filter");
        return;
    }

    function displayAssignments(filteredAssignments) {
        assignmentContainer.innerHTML = ""; // Clear previous assignments
        if (filteredAssignments.length === 0) {
            assignmentContainer.innerHTML = "<p class='no-assignments'>No assignments found.</p>";
            return;
        }

        filteredAssignments.forEach(assignment => {
            const assignmentCard = document.createElement("div");
            assignmentCard.classList.add("assignment-card");

            // Capitalizing the first letter of the status
            const formattedStatus = assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1);

            assignmentCard.innerHTML = `
                <h3>${assignment.title}</h3>
                <p><strong>📖 Course:</strong> ${assignment.course}</p>
                <p><strong>📅 Due Date:</strong> ${assignment.dueDate}</p>
                <p><strong>🎯 Status:</strong> <span class="status ${assignment.status}">${formattedStatus}</span></p>
                <p><strong>📊 Marks:</strong> ${assignment.marks}</p>
            `;

            assignmentContainer.appendChild(assignmentCard);
        });
    }

    function filterAssignments() {
        const selectedStatus = statusFilter.value;
        const filteredAssignments = selectedStatus === "all" ? assignments : assignments.filter(a => a.status === selectedStatus);
        displayAssignments(filteredAssignments);
    }

    // Add event listener to dropdown
    statusFilter.addEventListener("change", filterAssignments);

    // Initial Load
    displayAssignments(assignments);
});
