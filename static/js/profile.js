$(document).ready(function() {
  function updateFollowIcon(isFollowing) {
    const followIcon_back = $("#follow-icon-follow-back");
    const followIcon_no_back = $("#follow-icon-no-follow-back");

    if (isFollowing) {
      followIcon_back.show();
      followIcon_no_back.hide();
    } else {
      followIcon_back.hide();
      followIcon_no_back.show();
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

  // 페이지 로드 시 팔로우 상태 확인
  const userId = $("#follow-form").data("user-id");
  checkFollowStatus(userId);

  const profileUserId = $("#follow-form").data("profile-user-id");
  if (userId === profileUserId) {
    $("#follow-icon-follow-back, #follow-icon-no-follow-back").hide();
  }



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

      const userId = $("#follow-form").data("user-id");
      console.log(userId); // userId 값 확인

      checkFollowStatus(userId);

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
  });
});