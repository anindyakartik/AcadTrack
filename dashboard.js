document.addEventListener("DOMContentLoaded", function() {
    // Progress Bar Animation
    setTimeout(() => {
        document.querySelectorAll(".progress").forEach(bar => {
            bar.style.transition = "width 1s ease-in-out";
        });
    }, 500);

    // Chart.js Configuration
    const ctx = document.getElementById("performanceChart").getContext("2d");
    
    new Chart(ctx, {
        type: "line",  // Line chart for progress visualization
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],  // Example months
            datasets: [
                {
                    label: "Assignment Completion",
                    data: [20, 40, 60, 80, 100],  // Example progress percentages
                    borderColor: "#ffcc5c",
                    backgroundColor: "rgba(255, 204, 92, 0.2)",
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: "Exam Scores",
                    data: [60, 70, 85, 75, 90],  // Example scores
                    borderColor: "#ff6b6b",
                    backgroundColor: "rgba(255, 107, 107, 0.2)",
                    borderWidth: 2,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
