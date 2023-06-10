// 팔로우 비동기화
const form = document.querySelector('#follow-form')
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
form.addEventListener('submit', function (event) {
  event.preventDefault()
  const userId = event.target.dataset.userId
  axios({
    method : 'post',
    url : `/accounts/${userId}/follow/`,
    headers: {'X-CSRFToken': csrftoken},
  })

  .then((response) => {
    const isFollowed = response.data.is_followed
    const followBtn = document.querySelector('#follow-form > input[type=submit]')
    if (isFollowed === true) {
      followBtn.value = '언팔로우'
      followBtn.className = 'unfollow__btn'
    } else {
      followBtn.value = '팔로우'
      followBtn.className = 'follow__btn'
    }

    // 팔로우, 팔로잉 수 카운트 비동기
    const followingsCountTag = document.querySelector('#followings-count')
    const followersCountTag = document.querySelector('#followers-count')

    const followingsCountData = response.data.followings_count
    const followersCountData = response.data.followers_count

    followingsCountTag.textContent = followingsCountData
    followersCountTag.textContent = followersCountData

    // 팔로우 목록, 팔로잉 목록 비동기
    const followersListContainer = document.querySelector('#followersModal .modal-body');
    followersListContainer.innerHTML = ""; // Clear previous list

    const followersListData = response.data.followers;
    followersListData.forEach((follower) => {
      const followerLink = document.createElement('a');
      followerLink.classList.add('modal__username--text');
      followerLink.href = `/accounts/profile/${follower.username}`;
      followerLink.textContent = follower.username;
      
      const followerDiv = document.createElement('div');
      followerDiv.classList.add('modal__username');
      followerDiv.appendChild(followerLink);
      
      followersListContainer.appendChild(followerDiv);
    });

    const followingsListContainer = document.querySelector('#followingsModal .modal-body');
    followingsListContainer.innerHTML = ""; // Clear previous list

    const followingsListData = response.data.followings;
    followingsListData.forEach((following) => {
      const followingLink = document.createElement('a');
      followingLink.classList.add('modal__username--text');
      followingLink.href = `/accounts/profile/${following.username}`;
      followingLink.textContent = following.username;
      
      const followingDiv = document.createElement('div');
      followingDiv.classList.add('modal__username');
      followingDiv.appendChild(followingLink);
      
      followingsListContainer.appendChild(followingDiv);
    });
  })
})


// 맞팔 시 캘린더 버튼 표현
$(document).ready(function() {
  function updateFollowIcon(isFollowing) {
    const followIcon = $("#follow-icon");

    if (isFollowing) {
      followIcon.show();
    } else {
      followIcon.hide();
    }
  }

  function checkFollowStatus(userId) {
    $.ajax({
      url: `/accounts/${userId}/check_follow_status/`,
      type: "GET",
      dataType: "json",
      success: function(response) {
        const isFollowing = response.is_following;
        updateFollowIcon(isFollowing);
      },
      error: function(xhr, errmsg, err) {
        console.log(xhr.status + ": " + xhr.responseText);
      }
    });
  }

  // 주기적으로 팔로우 상태 확인 및 아이콘 업데이트
  const userId = $("#follow-form").data("userId");
  setInterval(function() {
    checkFollowStatus(userId);
  }, 1000); // 1초마다 확인

  // 페이지 로드 시 초기 팔로우 상태 확인 및 아이콘 업데이트
  checkFollowStatus(userId);
});


