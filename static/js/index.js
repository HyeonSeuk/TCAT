let currentYearExpenses = new Date().getFullYear();
let monthly_expenses;
let myChartExpenses = null;

document.getElementById('currentYearExpenses').textContent = `${currentYearExpenses}년`;

document.getElementById('prevYearExpenses').addEventListener('click', () => {
  currentYearExpenses--;
  drawChartExpenses();
});

document.getElementById('nextYearExpenses').addEventListener('click', () => {
  currentYearExpenses++;
  drawChartExpenses();
});

async function fetchExpenses() {
  let response = await fetch('/tcat/get_monthly_expenses/');
  monthly_expenses = await response.json();
  drawChartExpenses();
}

function drawChartExpenses() {
  let ctx = document.getElementById('myChartExpenses').getContext('2d');

  if (myChartExpenses) {
    myChartExpenses.destroy();
  }

  let expensesOfYear = monthly_expenses.filter(expense => {
    return new Date(expense.month).getFullYear() === currentYearExpenses;
  });

  let labels = Array.from({length: 12}, (v, i) => `${i + 1}월`);

  let monthly_totals = labels.map(label => {
    let expense = expensesOfYear.find(expense => {
      let date = new Date(expense.month);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;

      return `${year}년 ${month}월` === `${currentYearExpenses}년 ${label}`;
    });
    return expense ? expense.total : 0;
  });

  let data = {
    labels: labels,
    datasets: [{
      label: '월별 총 사용액',
      data: monthly_totals,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  myChartExpenses = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        datalabels: {
          display: true,
          align: 'end',
          anchor: 'end',
          color: '#000000',
          formatter: function(value, context) {
            return value;
          }
        }
      }
    }
  });

  document.getElementById('currentYearExpenses').textContent = `${currentYearExpenses}년`;
}

fetchExpenses();
