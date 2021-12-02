// --- Vars ---
const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');

let hboData = [], hboTitle = [], hboIMDB = [], hboYear = []
let startYear = 1990
let finalYear = 2020
let x = startYear
let years = [[], [], []]

// --- Main ---
main()

async function main() {

    // Load Json
    const httpResponse = await fetch('content.json');
    hboData = await httpResponse.json();
    console.log("loaded")

    // Load data
    for (let i = 0; i < hboData.length; i++) {

        hboTitle.push(hboData[i].title)
        hboIMDB.push(hboData[i].imdb_score)
        hboYear.push(hboData[i].year)

        // hboTitle = hboTitle.slice(0, 100)
        // hboIMDB = hboIMDB.slice(0, 100)
        // hboYear = hboYear.slice(0, 100)
    }

    // Setup years array
    while (x < finalYear + 1) {
        years[0].push(x)
        years[1].push(0)
        years[2].push(0)
        x++
    }


    // Populate years array
    for (let i = 0; i < hboIMDB.length; i++) {
        let index = years[0].indexOf(hboYear[i])
        years[1][index] += hboIMDB[i]
        years[2][index] += 1
    }

    // Divide into averages
    for (let i = 0; i < years[0].length; i++) {
        if (years[2][i] != 0) {
            years[1][i] = years[1][i] / years[2][i]
        }
    }

    // Build chart
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years[0],
            datasets: [{
                label: 'Average IMDB Rating',
                data: years[1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    // Build chart
    const myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: hboTitle,
            datasets: [{
                label: 'IMDB Rating',
                data: hboIMDB,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
