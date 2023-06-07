let currentYearPosts = new Date().getFullYear();
let monthly_posts;
let myChartPosts = null;

document.getElementById('currentYearPosts').textContent = `${currentYearPosts}년`;

document.getElementById('prevYearPosts').addEventListener('click', () => {
  currentYearPosts--;
  drawChartPosts();
});

document.getElementById('nextYearPosts').addEventListener('click', () => {
  currentYearPosts++;
  drawChartPosts();
});

async function fetchPostCounts() {
  let response = await fetch('/tcat/get_monthly_post_counts/'); // Use the new API
  monthly_posts = await response.json();
  drawChartPosts();
}

function drawChartPosts() {
  let ctx = document.getElementById('myChartPosts').getContext('2d'); // Make sure to create this canvas in your HTML

  if (myChartPosts) {
    myChartPosts.destroy();
  }

  let postsOfYear = monthly_posts.filter(post => {
    return new Date(post.month).getFullYear() === currentYearPosts;
  });

  let labels = Array.from({length: 12}, (v, i) => `${i + 1}월`);

  let monthly_counts = labels.map(label => {
    let post = postsOfYear.find(post => {
      let date = new Date(post.month);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;

      return `${year}년 ${month}월` === `${currentYearPosts}년 ${label}`;
    });
    return post ? post.count : 0;
  });

  let data = {
    labels: labels,
    datasets: [{
      label: '월별 총 게시물 수',
      data: monthly_counts,
      backgroundColor: 'rgba(255, 154, 118, 0.2)',
      borderColor: 'rgba(255, 154, 118, 1)',
      borderWidth: 1
    }]
  };

  myChartPosts = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1  // 수정된 부분
          }
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

  document.getElementById('currentYearPosts').textContent = `${currentYearPosts}년`;
}

fetchPostCounts();